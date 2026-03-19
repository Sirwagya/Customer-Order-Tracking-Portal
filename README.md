# Customer Order Tracking Portal - OnceUponMe

OnceUponMe is a premium, magical customer order tracking portal designed specifically to track personalized children's books and movies. The platform provides a beautiful, user-friendly interface for parents to track their child's personalized items from order placement to delivery.

The design features a whimsical aesthetic with customized branding (Crown and Book logo), the `OnceUponMe` brand font, and a clean, step-by-step progress tracker.

## 🚀 Features

*   **Magical Login Experience:** Beautiful starry background, brand-consistent typography, and a seamless login entry point (including Google sign-in UI).
*   **Intuitive Dashboard:** A clean overview of past and current orders.
*   **Detailed Order Tracking:** A visual, step-by-step progress graph tailored for production tracking:
    *   Order Placed
    *   Customization
    *   In Production
    *   Quality Check
    *   Shipped
    *   Delivered
*   **Digital Asset Delivery:** Direct download options for personalized digital products like movies or certificates.
*   **Fully Responsive Design:** Optimized for both mobile and desktop screens.

## 🛠 Tech Stack

*   **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **Routing:** React Router
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components:** 
    *   [Radix UI](https://www.radix-ui.com/) (Headless Primitives)
    *   [Lucide React](https://lucide.dev/) (Icons)
*   **Tooling:** TypeScript (for Vite configurations)

## 📦 Getting Started

### Prerequisites

*   **Node.js** (v18.x or newer is recommended)
*   **npm**, **yarn**, or **pnpm** (This project uses npm by default)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/customer-order-tracking-portal.git
    cd customer-order-tracking-portal
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
pnpm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready bundle:

```bash
npm run build
# or
pnpm run build
```

The output will be placed in the `dist/` directory.

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/  # Reusable UI components and layouts (e.g., Layout.tsx)
│   ├── pages/       # Page components (Login, Dashboard, OrderDetail, etc.)
│   └── routes.tsx   # React Router configuration
├── assets/          # Static assets (fonts, logo, background images)
├── styles/          # Global styles, Tailwind configuration, and Custom fonts
├── main.tsx         # Application entry point
└── vite-env.d.ts    # TypeScript definitions for static asset imports
```

## 🎨 Design & Branding Details

*   **Custom Fonts:** The platform utilizes the `OnceUponMe` custom `.woff2` fonts (loaded locally) alongside `Nunito` from Google Fonts.
*   **Original Figma Design:** The original UI/UX design can be referenced [here](https://www.figma.com/design/LuF3MEnKMQCVbmrZPUaSeN/Customer-Order-Tracking-Portal).

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.