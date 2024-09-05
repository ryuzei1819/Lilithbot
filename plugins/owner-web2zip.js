const axios = require('axios');
const archiver = require('archiver');
const cheerio = require('cheerio');
const { URL } = require('url');
const path = require('path');
const fs = require('fs');

// Helper function to fetch a resource
async function fetchResource(url, baseURL) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer', baseURL, headers: { 'User-Agent': 'Mozilla/5.0' } });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch resource: ${url}`, error);
    return null;
  }
}

// Helper function to fetch the HTML content of a webpage
async function fetchHTML(url) {
  try {
    const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch HTML: ${url}`, error);
    return null;
  }
}

// Function to create a ZIP file containing all resources of a webpage
async function web2zip(websiteUrl) {
  const html = await fetchHTML(websiteUrl);
  if (!html) {
    console.error('Failed to fetch the website HTML.');
    return null;
  }

  const $ = cheerio.load(html);
  const archive = archiver('zip', { zlib: { level: 9 } });

  // Create a write stream to a temporary file
  const zipFilePath = 'website.zip';
  const output = fs.createWriteStream(zipFilePath);
  
  return new Promise((resolve, reject) => {
    archive.pipe(output);

    // Add HTML to ZIP
    archive.append(html, { name: 'index.html' });

    const resources = [];

    // Collect resources
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src) resources.push(new URL(src, websiteUrl).href);
    });

    $('link[rel="stylesheet"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href) resources.push(new URL(href, websiteUrl).href);
    });

    $('script[src]').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src) resources.push(new URL(src, websiteUrl).href);
    });

    // Fetch resources and add them to the ZIP
    (async function addResources() {
      for (const resourceUrl of resources) {
        const resourceData = await fetchResource(resourceUrl, websiteUrl);
        if (resourceData) {
          const resourcePath = new URL(resourceUrl).pathname;
          const fileName = path.basename(resourcePath);
          const fileDir = path.dirname(resourcePath).substring(1); // Remove leading slash

          archive.append(resourceData, { name: path.join(fileDir, fileName) });
        }
      }

      // Finalize the archive
      archive.finalize();
    })();

    // Resolve or reject the promise based on the stream's completion
    output.on('close', () => {
      console.log(`Website sources have been zipped into: ${zipFilePath}`);
      resolve(zipFilePath);
    });

    output.on('error', (err) => {
      reject(err);
    });
  });
}

// Handler for the bot command
let handler = async (m, { conn, text }) => {
  const websiteUrl = text.trim();
  if (!websiteUrl) {
    return conn.sendMessage(m.key.remoteJid, { text: 'Please enter a valid website URL.' });
  }

  const zipFilePath = await web2zip(websiteUrl);
  if (zipFilePath) {
    const zipBuffer = fs.readFileSync(zipFilePath);
    await conn.sendMessage(m.key.remoteJid, { document: zipBuffer, mimetype: 'application/zip', fileName: 'website.zip' }, { quoted: m });
    fs.unlinkSync(zipFilePath); // Clean up the zip file after sending
  } else {
    conn.sendMessage(m.key.remoteJid, { text: 'Failed to fetch the website or create the ZIP file.' });
  }
};

handler.help = handler.command = ['web2zip'];
handler.tags = ['owner'];
handler.owner = true
module.exports = handler;