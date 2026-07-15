# Dokumen Analisis Kebutuhan
## Aplikasi POS (Point of Sale) — Produk SaaS untuk UMKM Multi-Jenis Usaha

---

## 1. Latar Belakang & Tujuan

Membangun aplikasi POS berbasis SaaS yang dapat digunakan oleh berbagai jenis usaha UMKM skala satu outlet (retail, F&B, jasa), dengan model langganan (subscription). Fokus MVP adalah mendukung operasional dasar toko: penjualan, stok, dan laporan — dengan struktur data yang cukup fleksibel untuk menampung kebutuhan jenis usaha yang berbeda tanpa perlu membangun ulang sistem.

---

## 2. Target Pengguna

| Segmen | Deskripsi |
|---|---|
| Pemilik UMKM | Butuh sistem murah, mudah dipakai, tanpa training rumit |
| Kasir/karyawan toko | Butuh alur transaksi cepat, minim klik, tahan salah input |
| Jenis usaha | Retail (toko kelontong, fashion, dll), F&B (cafe/resto kecil), Jasa (salon, laundry, bengkel) |

---

## 3. Aktor & Hak Akses (Role)

### 3.1 Owner / Admin
- Kelola produk & kategori
- Kelola karyawan & hak akses
- Lihat semua laporan (penjualan, stok, keuangan)
- Atur pengaturan toko (pajak, diskon, metode bayar, preset jenis usaha)
- Kelola langganan (billing SaaS)

### 3.2 Kasir
- Melakukan transaksi penjualan
- Melihat produk & stok
- Cetak/kirim struk
- (Tidak bisa) edit harga, hapus produk, lihat laporan keuangan penuh

*(Opsional fase lanjut: role Manager — gabungan akses kasir + laporan tanpa akses billing)*

---

## 4. User Stories (MVP)

### Autentikasi & Setup
- Sebagai **owner**, saya ingin mendaftar akun toko baru, agar bisa mulai memakai sistem.
- Sebagai **owner**, saya ingin memilih preset jenis usaha (Retail/F&B/Jasa) saat onboarding, agar fitur yang muncul sesuai kebutuhan saya.
- Sebagai **owner**, saya ingin menambahkan akun kasir, agar karyawan bisa login dengan akses terbatas.

### Manajemen Produk
- Sebagai **owner**, saya ingin menambah/edit/hapus produk (nama, harga, kategori, foto), agar katalog selalu update.
- Sebagai **owner**, saya ingin menandai produk mana yang butuh tracking stok dan mana yang tidak (misal: jasa potong rambut tidak butuh stok), agar sistem tetap relevan untuk usaha saya.
- Sebagai **owner**, saya ingin mengelompokkan produk ke kategori, agar kasir mudah mencari saat transaksi.

### Transaksi Penjualan
- Sebagai **kasir**, saya ingin menambahkan produk ke keranjang dan menghitung total otomatis (termasuk pajak/diskon), agar transaksi cepat dan akurat.
- Sebagai **kasir**, saya ingin memilih metode pembayaran (tunai, QRIS, kartu), agar sesuai preferensi pelanggan.
- Sebagai **kasir**, saya ingin mencetak atau mengirim struk digital, agar pelanggan punya bukti transaksi.
- Sebagai **kasir**, saya ingin membatalkan/mengedit transaksi sebelum selesai, agar bisa memperbaiki kesalahan input.

### Stok/Inventori
- Sebagai **owner**, saya ingin stok berkurang otomatis saat produk terjual, agar data stok selalu akurat.
- Sebagai **owner**, saya ingin mendapat notifikasi saat stok produk menipis, agar bisa restock tepat waktu.
- Sebagai **owner**, saya ingin mencatat stok masuk (restock), agar data inventori tetap sinkron.

### Laporan
- Sebagai **owner**, saya ingin melihat laporan penjualan harian/mingguan/bulanan, agar bisa memantau performa toko.
- Sebagai **owner**, saya ingin melihat produk terlaris, agar bisa mengambil keputusan bisnis.

### SaaS / Billing
- Sebagai **owner**, saya ingin mencoba aplikasi gratis (trial) sebelum berlangganan, agar bisa menilai kecocokan produk.
- Sebagai **owner**, saya ingin memilih paket langganan dan membayar online, agar bisa terus memakai layanan.
- Sebagai **sistem**, data setiap toko (tenant) harus terisolasi dari toko lain, agar keamanan & privasi data terjaga.

---

## 5. Ruang Lingkup MVP (In-Scope vs Out-of-Scope)

### ✅ In-Scope (MVP)
- Autentikasi & manajemen role (owner, kasir)
- Onboarding dengan preset jenis usaha
- CRUD produk & kategori
- Transaksi penjualan + cetak struk
- Manajemen stok dasar (kurang otomatis, restock manual, alert stok minim)
- Laporan penjualan dasar
- Multi-tenant (isolasi data per toko)
- Subscription & billing sederhana (1–2 paket harga)

### ❌ Out-of-Scope (Fase Berikutnya)
- Multi-outlet/cabang
- Manajemen meja & split bill (spesifik F&B)
- Integrasi payment gateway lengkap (mulai dari manual/QRIS statis dulu)
- Program loyalitas pelanggan
- Aplikasi mobile native (mulai dari web-responsive dulu)
- Integrasi akuntansi/pajak otomatis
- Multi-bahasa & multi-mata uang

---

## 6. Rancangan Data (ERD Sederhana)

```
Tenant (Toko)
 ├── id, nama_toko, jenis_usaha, paket_langganan, status_langganan

User
 ├── id, tenant_id, nama, email, password, role (owner/kasir)

Kategori
 ├── id, tenant_id, nama

Produk
 ├── id, tenant_id, kategori_id, nama, harga, foto,
 │   punya_stok (bool), stok_saat_ini, stok_minimum

Transaksi
 ├── id, tenant_id, kasir_id, tanggal, total, diskon, pajak, metode_bayar, status

Transaksi_Item
 ├── id, transaksi_id, produk_id, qty, harga_saat_transaksi, subtotal

Riwayat_Stok
 ├── id, produk_id, jenis (masuk/keluar), qty, tanggal, keterangan
```

Relasi kunci:
- 1 Tenant → banyak User, Produk, Transaksi (isolasi data via `tenant_id`)
- 1 Transaksi → banyak Transaksi_Item
- 1 Produk → banyak Riwayat_Stok (jika `punya_stok = true`)

---

## 7. Alur Utama (Flow) Transaksi Penjualan

1. Kasir login → pilih menu "Transaksi Baru"
2. Kasir cari/pilih produk → masuk ke keranjang
3. Sistem hitung subtotal, pajak, diskon → tampilkan total
4. Kasir pilih metode pembayaran → input jumlah bayar (jika tunai)
5. Sistem simpan transaksi + kurangi stok produk terkait
6. Sistem cetak/kirim struk
7. Transaksi selesai, keranjang kosong kembali

---

## 8. Non-Functional Requirements

| Aspek | Kebutuhan |
|---|---|
| Performa | Transaksi harus tersimpan < 2 detik dalam kondisi normal |
| Keamanan | Data antar tenant terisolasi penuh; password ter-hash |
| Ketersediaan | Idealnya bisa tetap mencatat transaksi walau koneksi internet putus sementara (offline-first jadi pertimbangan lanjut) |
| Skalabilitas | Struktur database siap untuk multi-outlet di masa depan (walau belum diaktifkan di MVP) |
| Usability | Alur transaksi kasir maksimal 3–4 klik dari pilih produk sampai selesai |

---

## 9. Keputusan Teknis & Bisnis (Terjawab)

| # | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Tech stack | **React Native**, prioritas rilis **web dulu** (kemungkinan React Native Web atau web app terpisah yang nanti di-port ke RN), dengan pertimbangan skalabilitas ke mobile Android/iOS di masa depan |
| 2 | Timeline MVP | **2 bulan** |
| 3 | Mode offline | **Online-only di MVP.** Device target adalah **mobile Android** (bukan PC) demi menekan biaya modal UMKM — ini keputusan device, terpisah dari kebutuhan offline. Offline-first **ditunda ke fase berikutnya** karena kompleksitas (local storage + sync) tidak realistis dikerjakan dalam 2 bulan bersamaan dengan fitur inti |
| 4 | Model harga | **Flat rate** per bulan/tahun (paket tunggal atau tiering sederhana, misal Basic/Pro) |
| 5 | Payment gateway | **Midtrans** (untuk billing langganan, dan berpotensi juga untuk QRIS pembayaran transaksi toko) |

### Implikasi Keputusan terhadap Scope
- Karena device utama adalah **mobile Android**, UI/UX harus dirancang **mobile-first**, bukan adaptasi dari desain desktop.
- Karena **online-only**, aplikasi butuh indikator jelas saat tidak ada koneksi (misal: banner "Tidak ada koneksi, transaksi tidak bisa disimpan") — ini requirement kecil tapi penting untuk UX.
- Karena target **React Native** tapi rilis **web dulu**, pertimbangkan pakai **React Native Web** dari awal (satu codebase untuk web & mobile) agar tidak perlu membangun ulang UI saat migrasi ke mobile nanti — ini akan menghemat waktu development jangka panjang.
- Integrasi **Midtrans** sebaiknya dirancang modular sejak awal (billing subscription terpisah dari payment transaksi toko), karena keduanya punya flow API yang berbeda di Midtrans.

### Rekomendasi Breakdown 2 Bulan (8 Minggu)

| Minggu | Fokus |
|---|---|
| 1 | Setup project, database schema, autentikasi & multi-tenant |
| 2 | Onboarding (pilih jenis usaha), manajemen produk & kategori |
| 3–4 | Modul transaksi penjualan (core POS flow) + cetak/kirim struk |
| 5 | Modul stok (kurang otomatis, restock, alert minim) |
| 6 | Laporan penjualan dasar + dashboard owner |
| 7 | Integrasi Midtrans (billing langganan) + halaman pricing/trial |
| 8 | Testing, bug fixing, onboarding 2–3 UMKM asli untuk uji coba nyata |

> Catatan: dengan timeline seketat ini, sangat disarankan untuk **tidak** menambah fitur di luar scope MVP (lihat bagian 5) sebelum minggu ke-8 selesai dan tervalidasi oleh pengguna nyata.

---

## 10. Langkah Selanjutnya

- [ ] Validasi dokumen ini dengan calon pengguna (wawancara 3–5 pemilik UMKM)
- [ ] Finalisasi tech stack
- [ ] Buat wireframe/mockup layar utama (login, POS/kasir, produk, laporan)
- [ ] Susun database schema detail dari ERD di atas
- [ ] Breakdown MVP menjadi sprint/milestone development
