# Customer Order Tracking Portal — OnceUponMe

OnceUponMe is a premium customer order tracking portal for personalized children's books. Parents can track their order, review a digital proof of their child's custom book page-by-page, leave feedback, and approve it for printing — all from a warm, storybook-inspired interface.

## 🚀 Features

- **Intuitive Dashboard:** Clean overview of all orders with dynamic summary counts
- **Detailed Order Tracking:** Visual step-by-step progress: Order Placed → Customization → In Production → Quality Check → Shipped → Delivered
- **📖 Book Review & Edit Mode:** Full-page modal to review the personalized book proof:
  - Navigate pages with prev/next controls
  - Pages loaded from Supabase Storage (PDF → WebP pipeline)
  - Add per-page comments in a live chat panel
  - Submit change requests (saved to MongoDB) or approve for printing
  - Buttons disable during submission to prevent duplicates
- **📤 PDF Book Upload:** Upload a PDF book → auto-converts each page to WebP at 150 DPI → stores in Supabase Storage → serves via public URLs
- **Digital Asset Delivery:** Download links for personalized digital products
- **Demo Login:** Validates credentials (`sarah@onceuponme.com` / `magic123`)
- **Fully Responsive:** Optimized for mobile and desktop

## 🛠 Tech Stack

### Frontend
| Tech | Role |
|---|---|
| [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) | UI framework + build tool |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Lucide React](https://lucide.dev/) | Icons |
| TypeScript | Type safety |

### Backend
| Tech | Role |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | REST API |
| [Motor](https://motor.readthedocs.io/) | Async MongoDB driver |
| [MongoDB](https://www.mongodb.com/) | Persistence for reviews and book metadata |
| [Supabase Storage](https://supabase.com/storage) | Cloud storage for book page images (WebP) |
| [pdf2image](https://github.com/Belval/pdf2image) + [Pillow](https://pillow.readthedocs.io/) | PDF → WebP page conversion |
| [Pydantic](https://docs.pydantic.dev/) | Request/response validation |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |

## 📦 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.9+
- **MongoDB** running locally on port `27017` (or set `MONGO_URL` env var)
  ```bash
  # macOS (Homebrew)
  brew services start mongodb-community
  ```
- **Poppler** (required by `pdf2image` for PDF → image conversion)
  ```bash
  # macOS
  brew install poppler

  # Ubuntu/Debian
  sudo apt-get install poppler-utils

  # Windows — download from: https://github.com/oschwartz10612/poppler-windows/releases
  ```

### Frontend Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your credentials
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_BUCKET=books
EOF

# Start the API server (http://localhost:8000)
uvicorn app.main:app --reload --port 8000
```

> The Vite dev server proxies `/api` requests to FastAPI — no CORS issues in development.

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Storage** → **New Bucket**
3. Name it `books` and set it to **Public**
4. Copy your **Project URL** and **Service Role Key** from **Settings → API** into your `.env`

### Uploading a Book

Once the backend is running, upload a PDF book for an order:

```bash
curl -X POST -F "file=@/path/to/book.pdf" http://localhost:8000/api/books/ORD-84920
```

The backend will:
1. Convert each PDF page to WebP (150 DPI, lossless)
2. Upload each WebP to Supabase Storage
3. Save page metadata to MongoDB
4. Return the public URLs for each page

### Building for Production

```bash
npm run build
```

Output goes to `dist/`.

## 🚀 Deployment

### Frontend — Vercel

The frontend is deployed on [Vercel](https://vercel.com). To connect it to the backend, add a `vercel.json` rewrite or set the `VITE_API_URL` environment variable to your Railway backend URL.

### Backend — Railway

1. Deploy the `backend/` directory to [Railway](https://railway.app)
2. Set the **Root Directory** to `backend`
3. Add these **environment variables** in Railway:
   | Variable | Value |
   |---|---|
   | `MONGO_URL` | Your MongoDB connection string |
   | `SUPABASE_URL` | `https://your-project.supabase.co` |
   | `SUPABASE_SERVICE_KEY` | Your service role key |
   | `SUPABASE_BUCKET` | `books` |

### Database — MongoDB Atlas (Recommended for Production)

For production, use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available) instead of a local MongoDB instance. Create a cluster, get the connection string, and set it as `MONGO_URL`.

## 📁 Project Structure

```text
.
├── backend/                     # FastAPI backend
│   ├── app/
│   │   ├── main.py              # FastAPI app, CORS, dotenv
│   │   ├── database.py          # MongoDB connection (Motor)
│   │   ├── models.py            # Pydantic schemas (Reviews + Books)
│   │   ├── storage.py           # Supabase Storage helper
│   │   └── routes/
│   │       ├── reviews.py       # POST/GET /api/reviews/
│   │       └── books.py         # POST /api/books/{id} + GET /api/books/{id}/pages
│   ├── requirements.txt
│   └── .env                     # Credentials (gitignored)
│
└── src/                         # React frontend
    ├── api/
    │   ├── reviewApi.ts          # API client for review submission
    │   └── bookApi.ts            # API client for fetching book pages
    ├── app/
    │   ├── components/
    │   │   ├── Layout.tsx        # App shell with nav
    │   │   └── book/             # Book Review feature
    │   │       ├── BookViewer.tsx   # Main review modal (fetches from API)
    │   │       ├── BookPage.tsx     # Single page renderer
    │   │       ├── PageComments.tsx # Comments panel
    │   │       ├── CommentInput.tsx # Comment input field
    │   │       ├── ReviewActions.tsx # Approve / Request Changes buttons
    │   │       └── types.ts        # TypeScript types
    │   └── pages/
    │       ├── Login.tsx         # Demo login with validation
    │       ├── Dashboard.tsx     # Order list with dynamic counts
    │       ├── OrderDetail.tsx   # Order tracking + book review
    │       └── Profile.tsx       # User profile
    ├── data/
    │   ├── ordersData.ts         # Shared order data + lookup
    │   └── mockData.ts           # Fallback book pages
    └── styles/                   # Global CSS + custom fonts
```

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/reviews/` | Submit a book review (comments + order ID) |
| `GET` | `/api/reviews/{order_id}` | Fetch all reviews for an order |
| `POST` | `/api/books/{order_id}` | Upload a PDF book (converts to WebP, stores in Supabase) |
| `GET` | `/api/books/{order_id}/pages` | Fetch all page URLs for a book |

**Example — Submit Review:**
```json
POST /api/reviews/
{
  "order_id": "ORD-84920",
  "comments": [
    {
      "page_number": 2,
      "text": "Make the dragon friendlier",
      "author": "Mama Sarah",
      "created_at": "2026-03-23T08:00:00Z"
    }
  ]
}
```

**Example — Upload Book:**
```bash
curl -X POST -F "file=@emma_book.pdf" http://localhost:8000/api/books/ORD-84920
```
```json
{
  "order_id": "ORD-84920",
  "total_pages": 10,
  "pages": [
    { "page_number": 1, "image_url": "https://xxx.supabase.co/.../page_1.webp" },
    { "page_number": 2, "image_url": "https://xxx.supabase.co/.../page_2.webp" }
  ]
}
```

## 🎨 Design & Branding

- **Theme:** Warm parchment (`#FDFBF7`), white cards, amber accent (`#F5A623`)
- **Fonts:** `OnceUponMe` custom `.woff2` + `Nunito` from Google Fonts
- **Design system:** Generated via [Google Stitch](https://stitch.withgoogle.com) ("Gilded Parchment" system)

## 📝 License

This project is proprietary. All rights reserved.