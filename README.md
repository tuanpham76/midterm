# Midterm Assignment - Full-Stack Web App

## Yêu cầu
Xây dựng một web app full-stack gồm:
- **Frontend**: React (port 5173)
- **Backend**: Node.js + Express (port 5000)
- **Giao tiếp**: REST API
- **Dữ liệu**: File JSON (không dùng database)

## Cấu trúc Project
```
midterm/
├── README.md          ← Hướng dẫn chi tiết
├── package.json       ← Scripts để chạy project
├── backend/           ← Node.js + Express server
│   ├── server.js      ← API server
│   ├── products.json  ← Data storage
│   └── package.json
└── frontend/          ← React application
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   └── ...
    └── package.json
```

## Cách chạy (Dễ nhất)

### 1. Cài đặt tất cả dependencies
```bash
npm run install:all
```

### 2. Chạy cả backend và frontend cùng lúc
```bash
npm run dev
```

### 3. Truy cập
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Cách chạy riêng lẻ (nếu cần)

### Backend only
```bash
npm run dev:backend
# hoặc
cd backend && npm start
```

### Frontend only
```bash
npm run dev:frontend
# hoặc
cd frontend && npm run dev
```

## API Endpoints

### Products
- `GET /products` - Lấy tất cả sản phẩm
- `GET /products/:id` - Lấy sản phẩm theo ID
- `POST /products` - Thêm sản phẩm mới
- `PUT /products/:id` - Cập nhật sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm

### Query Parameters
- `?category=<category>` - Lọc theo danh mục (VD: `?category=Phone`)
- `?search=<keyword>` - Tìm kiếm theo tên (VD: `?search=iphone`)

## Tính năng Frontend
- ✅ Hiển thị danh sách sản phẩm dạng card
- ✅ Thêm sản phẩm mới (modal form)
- ✅ Sửa sản phẩm (modal form)
- ✅ Xóa sản phẩm (có confirmation)
- ✅ Lọc theo danh mục
- ✅ Tìm kiếm theo tên
- ✅ UI/UX hiện đại, responsive
- ✅ Loading states và error handling

## Tech Stack
- **Backend**: Node.js, Express, CORS, JSON file storage
- **Frontend**: React, Vite, Axios, Modern CSS
- **Dev Tools**: Concurrently (chạy multiple servers)

## Test API (có thể dùng curl hoặc Postman)

```bash
# Lấy tất cả sản phẩm
curl http://localhost:5000/products

# Lọc theo category
curl "http://localhost:5000/products?category=Phone"

# Tìm kiếm
curl "http://localhost:5000/products?search=iphone"

# Lấy sản phẩm theo ID
curl http://localhost:5000/products/1

# Thêm sản phẩm mới
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","category":"Test","price":100,"image":"test.jpg","stock":5}'
```

## Điểm mạnh của Project
- ✅ Hoàn thành đầy đủ yêu cầu midterm
- ✅ Code clean và well-structured
- ✅ Error handling tốt
- ✅ UI/UX hiện đại
- ✅ Responsive design
- ✅ Easy setup với scripts
- ✅ Documentation đầy đủ</content>
<parameter name="filePath">c:\Users\tuanh\OneDrive\Lab3574\Documents\GitHub\midterm\README.md