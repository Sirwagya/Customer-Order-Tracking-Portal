# Customer Order Tracking Portal — OnceUponMe

OnceUponMe is a premium customer order tracking portal for personalized children's books. Parents can track their order, review a digital proof of their child's custom book page-by-page, leave feedback, and approve it for printing — all from a warm, storybook-inspired interface.

## 🚀 Features

- **Intuitive Dashboard:** Clean overview of all past and current orders
- **Detailed Order Tracking:** Visual step-by-step progress: Order Placed → Customization → Review → Production → Shipped → Delivered
- **📖 Book Review & Edit Mode:** Full-page modal to review the personalized book proof:
  - Navigate pages with prev/next controls
  - Add per-page comments in a live chat panel
  - Submit change requests (saved to MongoDB) or approve for printing
  - Comments cleared after submission — no duplicate entries
- **Digital Asset Delivery:** Download links for personalized digital products
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
| [MongoDB](https://www.mongodb.com/) (local) | Persistence for review submissions |
| [Pydantic](https://docs.pydantic.dev/) | Request/response validation |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |

## 📦 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.9+
- **MongoDB** running locally on port `27017`
  ```bash
  # macOS (Homebrew)
  brew services start mongodb-community
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
pip install fastapi "uvicorn[standard]" motor pydantic

# Start the API server (http://localhost:8000)
uvicorn app.main:app --reload --port 8000
```

> The Vite dev server proxies `/api` requests to FastAPI — no CORS issues in development.

### Building for Production

```bash
npm run build
```

Output goes to `dist/`.

## 📁 Project Structure

```text
.
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py          # FastAPI app + CORS
│   │   ├── database.py      # MongoDB connection (Motor)
│   │   ├── models.py        # Pydantic schemas
│   │   └── routes/
│   │       └── reviews.py   # POST/GET /api/reviews/
│   └── requirements.txt
│
└── src/                     # React frontend
    ├── api/
    │   └── reviewApi.ts     # API client for review submission
    ├── app/
    │   ├── components/
    │   │   └── book/        # Book Review feature components
    │   │       ├── BookViewer.tsx
    │   │       ├── BookPage.tsx
    │   │       ├── PageComments.tsx
    │   │       ├── CommentInput.tsx
    │   │       ├── ReviewActions.tsx
    │   │       └── types.ts
    │   └── pages/           # Login, Dashboard, OrderDetail
    ├── data/
    │   └── mockData.ts      # Mock book pages and initial comments
    └── styles/              # Global CSS + custom fonts
```

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/reviews/` | Submit a book review (comments + order ID) |
| `GET` | `/api/reviews/{order_id}` | Fetch all reviews for an order |

**Example POST payload:**
```json
{
  "order_id": "ORD-001",
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

## 🎨 Design & Branding

- **Theme:** Warm parchment (`#FDFBF7`), white cards, amber accent (`#F5A623`)
- **Fonts:** `OnceUponMe` custom `.woff2` + `Nunito` from Google Fonts
- **Design system:** Generated via [Google Stitch](https://stitch.withgoogle.com) ("Gilded Parchment" system)