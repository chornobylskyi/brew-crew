# BrewCrew API

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Install dependencies
```bash
npm install
```

### 2. Run the application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start running at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint            | Description                 |
|:-------|:--------------------|:----------------------------|
| `GET`  | `/api/health`       | Verify the service is alive |
| `GET`  | `/api/products`     | Get all products            |
| `GET`  | `/api/products/:id` | Get product by ID           |
| `POST` | `/api/products`     | Create a product            |
