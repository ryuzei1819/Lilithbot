/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fs = require('fs');
let path = require('path');
let storePath = path.join(__dirname, '../src/store.json');

let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
  try {
    let storeData = {};
    
    // Baca data dari file store.json jika ada
    if (fs.existsSync(storePath)) {
      let rawData = fs.readFileSync(storePath);
      if (rawData.length > 0) {
        storeData = JSON.parse(rawData);
      } else {
        // Inisialisasi data jika file kosong
        storeData = { groups: {} };
      }
    } else {
      // Inisialisasi data jika file tidak ada
      storeData = { groups: {} };
    }

    let groupId = m.chat;

    // Pastikan data grup tersedia
    if (!storeData.groups[groupId]) {
      storeData.groups[groupId] = {
        catalog: [],
        items: []
      };
    }

    switch (command) {
      case "store":
        let caption = "";
        for (let catalog of storeData.groups[groupId].catalog) {
          caption += `📂 *${catalog.name.toUpperCase()}*\n`;
          if (catalog.items.length > 0) {
            for (let item of catalog.items) {
              caption += `  📄 ${item.name} - Rp${item.price}\n`;
            }
          } else {
            caption += "  Tidak ada item\n";
          }
          caption += "\n";
        }
        conn.reply(m.chat, caption, m);
        break;

      case "listcatalog":
        if (storeData.groups[groupId].catalog.length === 0) {
          conn.reply(m.chat, "*[ ! ] Tidak ada katalog tersedia di grup ini*", m);
          return;
        }
        let catalogList = "📚 *Daftar Katalog:*\n";
        storeData.groups[groupId].catalog.forEach(catalog => {
          catalogList += `• ${catalog.name}\n`;
          if (catalog.items.length > 0) {
            catalogList += "  📄 *Items:*\n";
            catalog.items.forEach(item => {
              catalogList += `    • ${item.name} - Rp${item.price}\n`;
            });
          } else {
            catalogList += "  Tidak ada item\n";
          }
          catalogList += "\n";
        });
        conn.reply(m.chat, catalogList, m);
        break;

      case "addcatalog":
        if (!isOwner) return dfail("owner", m, conn);
        if (!text) return conn.reply(m.chat, `*• Contoh :* ${usedPrefix + command} *[nama katalog]*`, m);
        let newCatalogName = text.toLowerCase().trim();
        
        // Validasi apakah nama katalog sudah ada
        let existingCatalog = storeData.groups[groupId].catalog.find(c => c.name.toLowerCase() === newCatalogName);
        if (existingCatalog) {
          return conn.reply(m.chat, "*[ ! ] Katalog dengan nama tersebut sudah ada. Gunakan nama katalog lain.*", m);
        }

        // Tambahkan katalog baru ke dalam data
        let newCatalog = { name: newCatalogName, items: [] };
        storeData.groups[groupId].catalog.push(newCatalog);
        fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2)); // Simpan perubahan ke file store.json
        conn.reply(m.chat, "*[ ✓ ] Katalog baru berhasil ditambahkan*", m);
        break;

      case "delcatalog":
        if (!isOwner) return dfail("owner", m, conn);
        if (!text) return conn.reply(m.chat, `*• Contoh :* ${usedPrefix + command} *[nama katalog]*`, m);
        let catalogNameToDelete = text.toLowerCase().trim();
        
        // Cari index katalog yang akan dihapus
        let indexCatalogToDelete = storeData.groups[groupId].catalog.findIndex(c => c.name.toLowerCase() === catalogNameToDelete);
        if (indexCatalogToDelete !== -1) {
          storeData.groups[groupId].catalog.splice(indexCatalogToDelete, 1);
          fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2)); // Simpan perubahan ke file store.json
          conn.reply(m.chat, "*[ ✓ ] Katalog berhasil dihapus*", m);
        } else {
          conn.reply(m.chat, "*[ ! ] Katalog tidak ditemukan*", m);
        }
        break;

      case "additem":
        if (!isOwner) return dfail("owner", m, conn);
        if (!text)
          return conn.reply(m.chat, `*• Contoh :* ${usedPrefix + command} *[nama item | harga | nama katalog]*`, m);
        let [itemName, itemPrice, itemCatalogName] = text.split("|").map(v => v.trim());
        if (!(itemName && itemPrice && itemCatalogName))
          return conn.reply(m.chat, `*• Contoh :* ${usedPrefix + command} *[nama item | harga | nama katalog]*`, m);

        // Validasi apakah nama katalog sudah ada
        let targetCatalog = storeData.groups[groupId].catalog.find(c => c.name.toLowerCase() === itemCatalogName.toLowerCase());
        if (!targetCatalog) {
          return conn.reply(m.chat, "*[ ! ] Katalog tidak ditemukan*", m);
        }

        // Validasi apakah item sudah ada dalam katalog tersebut
        let existingItem = targetCatalog.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
        if (existingItem) {
          return conn.reply(m.chat, "*[ ! ] Item dengan nama tersebut sudah ada dalam katalog ini. Gunakan nama item lain.*", m);
        }

        // Tambahkan item baru ke dalam katalog
        if (isNaN(parseInt(itemPrice))) {
          return conn.reply(m.chat, "*[ ! ] Harga harus angka*", m);
        }
        if (parseInt(itemPrice) < 0) {
          return conn.reply(m.chat, "*[ ! ] Harga tidak boleh kurang dari 0*", m);
        }
        
        targetCatalog.items.push({ name: itemName, price: parseInt(itemPrice) });
        fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2)); // Simpan perubahan ke file store.json
        conn.reply(m.chat, "*[ ✓ ] Item baru berhasil ditambahkan ke katalog*", m);
        break;

      case "delitem":
        if (!isOwner) return dfail("owner", m, conn);
        if (!text)
          return conn.reply(m.chat, `*• Contoh :* ${usedPrefix + command} *[nama item | nama katalog]*`, m);
        let [itemToDelete, catalogName] = text.split("|").map(v => v.trim());

        // Cari katalog yang sesuai
        let targetCatalogForDelete = storeData.groups[groupId].catalog.find(c => c.name.toLowerCase() === catalogName.toLowerCase());
        if (!targetCatalogForDelete) {
          return conn.reply(m.chat, "*[ ! ] Katalog tidak ditemukan*", m);
        }

        // Cari index item yang akan dihapus
        let indexItemToDelete = targetCatalogForDelete.items.findIndex(i => i.name.toLowerCase() === itemToDelete.toLowerCase());
        if (indexItemToDelete !== -1) {
          targetCatalogForDelete.items.splice(indexItemToDelete, 1);
          fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2)); // Simpan perubahan ke file store.json
          conn.reply(m.chat, "*[ ✓ ] Item berhasil dihapus dari katalog*", m);
        } else {
          conn.reply(m.chat, "*[ ! ] Item tidak ditemukan dalam katalog*", m);
        }
        break;
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "*[ ! ] Terjadi kesalahan dalam memproses permintaan*", m);
  }
};

handler.help = [
  "listcatalog",
  "addcatalog",
  "delcatalog",
  "additem",
  "delitem",
];
handler.tags = ["store"];
handler.group = true;
handler.command = ["store", "listcatalog", "addcatalog", "delcatalog", "additem", "delitem"];

module.exports = handler;