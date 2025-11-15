const mongoose = require('mongoose');

// Matikan buffering. Ini akan membuat error lebih cepat dan jelas.
mongoose.set('bufferCommands', false); 

const connectDB = async () => {
  // Tambahkan console.log ini untuk debugging
  console.log("Mencoba menyambung ke database...");
  console.log("String Koneksi yang Digunakan:", process.env.DATABASE_URL); // <-- Cek apakah ini 'undefined' di log!

  if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: DATABASE_URL environment variable tidak ditemukan.");
    process.exit(1); // Keluar dari aplikasi
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Opsi-opsi ini mungkin tidak diperlukan di Mongoose 8+,
      // tapi tidak ada salahnya
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Ini HANYA akan berjalan jika koneksi SUKSES
    console.log(`MongoDB Terhubung: ${conn.connection.host}`);

  } catch (err) {
    // Ini akan berjalan jika koneksi GAGAL
    console.error("KONEKSI DATABASE GAGAL:", err.message);
    process.exit(1); // Keluar dari aplikasi (sangat penting!)
  }
};

module.exports = connectDB;