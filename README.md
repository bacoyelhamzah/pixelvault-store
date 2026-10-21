# PixelVault — Digital Game Store

Template website toko game digital dengan tema dark gaming, aksen neon cyan/ungu, dan layout responsif.

## Fitur
- Landing page dan katalog produk digital
- Filter kategori: Game PC, Game Konsol, Voucher
- Pencarian produk dan pengurutan harga
- Keranjang belanja dengan tambah/kurang jumlah dan total otomatis
- Desain responsif untuk desktop dan ponsel
- Tanpa framework atau proses build

## Cara menjalankan
1. Ekstrak file ZIP.
2. Buka `index.html` di browser, atau gunakan ekstensi Live Server di VS Code.
3. Ubah daftar produk, harga, dan deskripsi di `script.js`.
4. Ubah warna, font, dan layout di `style.css`.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `pixelvault-store`.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu tekan **Save**.
6. Tunggu proses deploy. GitHub akan menampilkan URL website di halaman Pages.

## Penting sebelum digunakan untuk transaksi nyata
Ini adalah template frontend/demo. Keranjang dan checkout belum terhubung ke pembayaran, inventori, akun pengguna, atau sistem pengiriman kode digital. Ganti produk contoh dengan produk yang memang Anda miliki dan pastikan hak distribusinya. Untuk transaksi nyata, integrasikan backend yang aman dan payment gateway resmi. Jangan menyimpan secret/API key di JavaScript sisi browser.

## Struktur
```text
pixelvault-store/
├── index.html
├── style.css
├── script.js
└── README.md
```
