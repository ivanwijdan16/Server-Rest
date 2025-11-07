# Panduan Deploy ke Vercel

## Persiapan Sebelum Deploy

### 1. Install Vercel CLI (Opsional)
```bash
npm install -g vercel
```

### 2. Siapkan Database PostgreSQL untuk Production
Anda memerlukan database PostgreSQL yang dapat diakses secara online. Beberapa pilihan gratis:
- **Supabase** (https://supabase.com) - Recommended
- **Neon** (https://neon.tech)
- **ElephantSQL** (https://www.elephantsql.com)
- **Railway** (https://railway.app)

Setelah membuat database, Anda akan mendapatkan **DATABASE_URL** dengan format:
```
postgresql://username:password@host:port/database
```

## Cara Deploy ke Vercel

### Metode 1: Deploy via Website Vercel (Paling Mudah)

1. **Buka Vercel Dashboard**
   - Kunjungi https://vercel.com
   - Login atau Sign Up menggunakan akun GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik tombol "Add New..." → "Project"
   - Pilih repository GitHub Anda yang berisi project ini
   - Jika belum di-push ke GitHub, push dulu project ini ke GitHub

3. **Configure Project**
   - Framework Preset: pilih "Other"
   - Root Directory: biarkan default (root)
   - Build Command: biarkan kosong
   - Output Directory: biarkan kosong
   - Install Command: `npm install`

4. **Set Environment Variables**
   Klik "Environment Variables" dan tambahkan:
   ```
   NODE_ENV = production
   DATABASE_URL = postgresql://username:password@host:port/database
   JWT_SECRET = your_secret_key_here
   ```
   
   **PENTING:** Ganti nilai-nilai di atas dengan kredensial database Anda yang sebenarnya!

5. **Deploy**
   - Klik tombol "Deploy"
   - Tunggu proses deploy selesai (biasanya 1-2 menit)
   - Setelah selesai, Anda akan mendapat URL project (misalnya: https://your-project.vercel.app)

### Metode 2: Deploy via CLI

1. **Login ke Vercel**
   ```bash
   vercel login
   ```

2. **Deploy Project**
   ```bash
   vercel
   ```
   
3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   vercel env add NODE_ENV
   ```

4. **Deploy ke Production**
   ```bash
   vercel --prod
   ```

## Setelah Deploy

### 1. Jalankan Migrations (Jika Diperlukan)
Untuk menjalankan migrations di database production:
- Anda perlu menjalankan migrations secara manual dari komputer lokal Anda
- Set environment variable terlebih dahulu:
  ```bash
  # Windows PowerShell
  $env:DATABASE_URL="postgresql://username:password@host:port/database"
  $env:NODE_ENV="production"
  
  # Linux/Mac
  export DATABASE_URL="postgresql://username:password@host:port/database"
  export NODE_ENV="production"
  ```
- Kemudian jalankan:
  ```bash
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
  ```

### 2. Test API
Buka URL Vercel Anda dan test endpoint:
```
https://your-project.vercel.app/
```

Anda seharusnya melihat response:
```json
{
  "message": "Welcome to Book Store API"
}
```

### 3. Test Endpoint Lainnya
Test endpoint API Anda sesuai dengan routes yang ada di project.

## Troubleshooting

### Error: "Internal Server Error"
- Cek logs di Vercel Dashboard → Project → Deployments → klik deployment terakhir → "Functions" tab
- Pastikan semua environment variables sudah diset dengan benar

### Error: Database Connection
- Pastikan DATABASE_URL format-nya benar
- Pastikan database PostgreSQL Anda dapat diakses dari internet (tidak localhost)
- Cek apakah database sudah memiliki tables (jalankan migrations)

### Error: "Module not found"
- Pastikan semua dependencies ada di package.json
- Redeploy dengan: `vercel --prod --force`

## Update/Redeploy

Setiap kali Anda push ke GitHub (branch main/master), Vercel akan otomatis deploy ulang.

Atau deploy manual via CLI:
```bash
vercel --prod
```

## Catatan Penting

1. **Vercel menggunakan serverless functions**, jadi aplikasi tidak berjalan 24/7 seperti server tradisional
2. **Cold Start**: Request pertama mungkin lebih lambat karena function perlu "bangun" terlebih dahulu
3. **Database Connection Pooling**: Untuk production dengan traffic tinggi, pertimbangkan menggunakan connection pooler seperti PgBouncer
4. **Environment Variables**: JANGAN commit file .env ke Git! Gunakan Vercel Environment Variables
5. **Database**: Pastikan database production Anda memiliki backup yang baik

## Link Berguna

- Vercel Docs: https://vercel.com/docs
- Sequelize Production Best Practices: https://sequelize.org/docs/v6/other-topics/migrations/
- Supabase (Free PostgreSQL): https://supabase.com


