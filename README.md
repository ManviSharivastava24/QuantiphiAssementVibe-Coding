
# E-Commerce Product Multi-Filter Sidebar (MERN)

A full-stack product catalog with a live-updating multi-filter sidebar
(category, price range, minimum rating) and server-side sorting.
**All filtering, sorting, and validation logic runs on the Node/Express
server** — the React frontend only collects state and calls the API.

```
ecommerce-filter-app/
├── backend/
│   ├── config/db.js               # MongoDB connection
│   ├── models/Product.js          # Mongoose schema
│   ├── controllers/productController.js  # combinatorial filter/sort logic
│   ├── routes/productRoutes.js
│   ├── seed/seedData.js           # 20 dummy products
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/productApi.js      # axios client
    │   ├── context/FilterContext.jsx
    │   ├── hooks/useProducts.js   # fetch-on-change hook
    │   ├── components/            # Sidebar, filters, grid, card, etc.
    │   ├── pages/Home.jsx
    │   ├── App.jsx / main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── package.json
```

## 1. Prerequisites

- Node.js 18+
- A running MongoDB instance (local `mongod`, or a free MongoDB Atlas cluster)

## 2. Backend setup

```bash
cd ecommerce-filter-app/backend
npm install
cp .env.example .env
# edit .env if your Mongo URI differs from the default

# seed the database with 20 sample products
npm run seed

# start the API (http://localhost:5000)
npm run dev
```

## 3. Frontend setup

Open a second terminal:

```bash
cd ecommerce-filter-app/frontend
npm install
cp .env.example .env
# edit VITE_API_BASE_URL if your backend runs elsewhere

npm run dev
# visit http://localhost:5173
```

## 4. API Reference

### `GET /api/products`

| Query param  | Type                        | Example                        |
|--------------|------------------------------|---------------------------------|
| `categories` | comma-separated string       | `Electronics,Footwear`          |
| `minPrice`   | number                       | `20`                             |
| `maxPrice`   | number                       | `200`                            |
| `minRating`  | number 1-5                   | `4`                               |
| `sortBy`     | `price_low_high` \| `top_rated` | `top_rated`                  |

Response:
```json
{
  "success": true,
  "count": 6,
  "appliedFilters": { "...": "..." },
  "data": [ { "_id": "...", "name": "...", "price": 49.99, "category": "Apparel", "rating": 4, "thumbnail": "..." } ]
}
```

Leaving all params off returns the full 20-item catalog (default sort:
newest first). Invalid/out-of-range values are safely dropped rather than
causing a 500 error.

### `GET /api/products/categories`
Returns the list of valid category names, so the frontend never hardcodes
them independently of the backend's enum.

## 5. How the "instant filtering" works

`FilterContext` holds the current filter/sort selection. Every checkbox,
radio button, or dropdown change updates that context. `useProducts`
watches the context with a `useEffect` (debounced 300ms) and re-calls
`GET /api/products` with the new query params — no submit button required.
A request-id guard in the hook discards any out-of-order/stale responses.

## 6. Notes on the price slider

The UI ships with a dual `<input type="range">` overlay **and** paired
number inputs, so users can drag or type exact values — satisfying the
"avoid heavy external libraries" constraint while still being fully usable
on both desktop and mobile.
