# 🚀 Interactive Developer Portfolio & Backend Sandbox

A premium, interactive, and visually stunning developer portfolio showcasing backend engineering expertise, custom-crafted with Vanilla CSS and JS. Featuring an interactive terminal console, a real-time system metrics dashboard, an API testing playground, and beautiful layout designs.

---

## ✨ Features

- **💻 Interactive Terminal Simulator**: Fully functional CLI emulator with autocomplete (Tab), history navigation (Up/Down arrows), and interactive shell commands (`help`, `about`, `projects`, `skills`, `resume`, `github`, `contact`, `blogs`, `architecture`, `clear`).
- **📊 Metrics Dashboard**: Real-time mock dashboard simulating database pools, cache hit ratios, CPU usage, and queue lengths, tailor-made for demonstrating a backend-focused mindset.
- **🔌 API Playground**: Live interactive tool to query mock API endpoints and inspect formatted JSON responses.
- **🎨 Glassmorphic Dark UI**: Premium, dark-mode design with glowing grid overlays, custom cursor, smooth parallax hover grids, and micro-animations.
- **📱 Fully Responsive**: Custom-built using a mobile-first responsive layout to provide a seamless user experience across all devices.

---

## 🛠️ Tech Stack

- **Frontend Structure**: HTML5 (Semantic elements)
- **Styling & Layout**: CSS3 (Vanilla CSS, custom CSS Grid & Flexbox, HSL variables, CSS variables)
- **Interactive Logic**: Vanilla JavaScript (ES6+, DOM Manipulation, Custom Canvas & particles)
- **Icons**: SVG vectors embedded directly for high performance and scaling

---

## 📂 Project Structure

```text
├── index.html          # Main application structure & SEO meta tags
└── assets/
    ├── css/
        ├── style.css       # Core design system, colors, variables, layout
        ├── animations.css  # Mouse glow, keyframes, transitions
        └── responsive.css  # Mobile and tablet breakpoints
    ├── js/
        ├── script.js       # Main controller, navbar, navigation
        ├── cursor.js       # Custom interactive cursor
        ├── particles.js    # Interactive canvas grid background
        ├── typing.js       # Auto-typing text effects
        ├── counter.js      # Animated stats counters
        ├── scroll.js       # Smooth scroll & active navigation tracker
        └── terminal.js     # CLI emulator & command-parsing logic
    └── images/
        └── ...             # Profile pictures, architecture SVGs, assets
```

---

## 🚀 Running Locally

You do not need to build this project. You can run it locally in two ways:

### Option A: Open Directly
Double-click `index.html` or drag it into any web browser.

### Option B: Local HTTP Server (Recommended)
Running it through an HTTP server ensures assets, font requests, and paths load without CORS issues.

**Using Python:**
```bash
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

**Using Node.js / npm:**
```bash
npx serve
```
Open the localhost address returned in your terminal.

---

## 🌐 Deployment (GitHub Pages)

This project is fully compatible with **GitHub Pages**. 
1. Push your repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder.
5. Click **Save**. Within a minute, your portfolio will be live at `https://<your-username>.github.io/<your-repo-name>/`.
