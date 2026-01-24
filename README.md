# 🔍 SearchDeck

SearchDeck is a modern, minimalist web application that lets users search and instantly access multiple platforms from a single, beautiful dashboard.

Instead of opening multiple apps or tabs, users can search once and jump directly to WhatsApp, Instagram, Facebook, X (Twitter), Telegram, YouTube, Spotify, and more.

**Search once. Explore everywhere.**

---

## ✨ Features

- 🌙 **Dark & Light Theme** - Toggle between elegant dark and light modes  
- 🎨 **Glass Mode** - Frosted glass aesthetic with premium blur effects  
- 🔎 **Unified Search** - Search across 7+ platforms simultaneously  
- ⚡ **Animated UI** - Smooth transitions, ripple effects, and fade-in animations  
- 🕘 **Search History** - Recent searches saved to localStorage  
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop  
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation  
- 🎯 **Smart Validation** - Disabled buttons prevent empty searches  
- ⌨️ **Keyboard Support** - Press Enter to search all platforms  

---

## 🛠 Tech Stack

- **React 19** - UI framework
- **Vite** - Fast build tool
- **React Icons** - Icon library
- **CSS3** - Custom styling with animations & glass effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/searchdeck.git
cd searchdeck
```

2. Install dependencies
```bash
npm install
```

3. Start the dev server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production
```bash
npm run build
```

---

## 🎮 Usage

1. **Enter a search query** in the search box
2. **Click a platform button** to search on that platform
3. **Click "All" or press Enter** to search all platforms at once
4. **Recent searches** are automatically saved and displayed
5. **Toggle Glass Mode** for a premium frosted glass effect
6. **Switch themes** using the toggle in the top-right corner

### Keyboard Shortcuts
- **Enter** - Search all platforms
- **Tab** - Navigate through buttons
- **Esc** - Clear focus

---

## 🎨 Glass Mode

Toggle Glass Mode for a premium, frosted glass aesthetic with:
- Smooth backdrop blur effects
- Enhanced text shadows for contrast
- Refined button styling
- Polished animations

Perfect for modern setups or showcasing the app!

---

## 📱 Responsive Design

- **Desktop** - Full grid layout with 7 columns
- **Tablet** - 4-column grid, optimized spacing
- **Mobile** - 2-column grid, stacked search bar
- **Small Screens** - 1-column grid, compact layout

---

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels and descriptions
- Focus-visible states for all interactive elements
- Reduced motion support for users with motion sensitivity
- Proper color contrast ratios (WCAG AA)
- 44px minimum touch targets

---

## 🔧 Customization

### Add a New Platform

Edit `src/App.jsx` and add to the `links` object:

```javascript
myplatform: (q) => `https://myplatform.com/search?q=${encodeURIComponent(q)}`,
```

Then add a button in the grid:

```javascript
<button className="glass" onClick={() => search("myplatform")}>
  <FaIcon /> My Platform
</button>
```

### Customize Colors

Edit `:root` variables in `src/App.css`:

```css
--accent-primary: #2064ad;
--dark-bg-primary: #0e0e0e;
--light-bg-primary: #eafcff;
```

---

## 📦 Project Structure

```
searchdeck/
├── src/
│   ├── App.jsx           # Main component
│   ├── App.css           # Component styles
│   ├── index.css         # Global styles
│   ├── main.jsx          # Entry point
│   └── assets/           # Images, icons
├── public/               # Static assets
├── package.json          # Dependencies
├── vite.config.js        # Vite config
└── README.md            # This file
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Vite and deploys

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
# Update vite.config.js with base: '/repo-name/'
npm run build
git add dist && git commit -m "deploy"
git push origin $(git subtree split --prefix dist main):gh-pages --force
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Created with ❤️ for seamless cross-platform searching.

**Happy Searching! 🎉**

