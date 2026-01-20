# Code With Umam - Kasir API (Part 1)

API untuk aplikasi kasir (Point of Sale) sederhana menggunakan Node.js dan Express.

## Fitur

- ✅ CRUD Produk (Products)
- ✅ Transaksi Penjualan (Transactions)
- ✅ RESTful API
- ✅ In-memory storage (untuk pembelajaran)

## Teknologi yang Digunakan

- Node.js
- Express.js
- CORS
- dotenv

## Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/pandusatrianura/code-with-umam-kasir-api.git
cd code-with-umam-kasir-api
```

2. Install dependencies:
```bash
npm install
```

3. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

4. Jalankan aplikasi:
```bash
# Development mode (dengan nodemon)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Root
- `GET /` - Informasi API

### Products

#### Get All Products
```
GET /api/products
```

Response:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Nasi Goreng",
      "price": 15000,
      "stock": 100,
      "category": "Makanan",
      "description": "Nasi goreng spesial dengan telur"
    }
  ]
}
```

#### Get Product by ID
```
GET /api/products/:id
```

#### Create New Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Kopi",
  "price": 10000,
  "stock": 50,
  "category": "Minuman",
  "description": "Kopi hitam panas"
}
```

#### Update Product
```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Kopi Premium",
  "price": 15000,
  "stock": 40
}
```

#### Delete Product
```
DELETE /api/products/:id
```

### Transactions

#### Get All Transactions
```
GET /api/transactions
```

#### Get Transaction by ID
```
GET /api/transactions/:id
```

#### Create New Transaction
```
POST /api/transactions
Content-Type: application/json

{
  "customerName": "John Doe",
  "paymentMethod": "Cash",
  "items": [
    {
      "productId": 1,
      "productName": "Nasi Goreng",
      "quantity": 2,
      "price": 15000
    },
    {
      "productId": 2,
      "productName": "Es Teh",
      "quantity": 1,
      "price": 5000
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "id": 1,
    "customerName": "John Doe",
    "items": [...],
    "totalAmount": 35000,
    "paymentMethod": "Cash",
    "status": "Completed",
    "transactionDate": "2026-01-20T13:29:09.920Z"
  }
}
```

## Testing dengan cURL

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mie Goreng",
    "price": 12000,
    "stock": 75,
    "category": "Makanan",
    "description": "Mie goreng pedas"
  }'
```

### Create Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "paymentMethod": "Cash",
    "items": [
      {
        "productId": 1,
        "productName": "Nasi Goreng",
        "quantity": 1,
        "price": 15000
      }
    ]
  }'
```

## Struktur Proyek

```
code-with-umam-kasir-api/
├── src/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── transactionController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── transactionRoutes.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Catatan

- Aplikasi ini menggunakan in-memory storage, sehingga data akan hilang ketika server di-restart
- Untuk production, disarankan menggunakan database seperti MongoDB, MySQL, atau PostgreSQL
- Part 2 akan membahas integrasi dengan database

## License

ISC