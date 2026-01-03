import { useState, useEffect } from "react";
import "./App.css";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaSpotify,
  FaSearch,
} from "react-icons/fa";

function App() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [glassMode, setGlassMode] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* ===============================
     LOAD RECENT SEARCHES
     =============================== */
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecent(saved);
  }, []);

  /* ===============================
     SAVE RECENT SEARCH
     =============================== */
  const saveRecent = (q) => {
    if (!q.trim()) return;

    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /* ===============================
     REMOVE ONE RECENT
     =============================== */
  const removeSearch = (q) => {
    const updated = recent.filter((r) => r !== q);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /* ===============================
     CLEAR ALL RECENTS
     =============================== */
  const clearAllSearches = () => {
    setRecent([]);
    localStorage.removeItem("recentSearches");
  };

  /* ===============================
     LINKS
     =============================== */
  const links = {
    whatsapp: (q) =>
      isMobile
        ? `whatsapp://send?text=${encodeURIComponent(q)}`
        : `https://wa.me/?text=${encodeURIComponent(q)}`,
    instagram: (q) =>
      `https://www.instagram.com/explore/tags/${encodeURIComponent(q)}`,
    facebook: (q) =>
      `https://www.facebook.com/search/top?q=${encodeURIComponent(q)}`,
    twitter: (q) =>
      `https://twitter.com/search?q=${encodeURIComponent(q)}`,
    telegram: (q) =>
      isMobile
        ? `tg://msg?text=${encodeURIComponent(q)}`
        : `https://t.me/s/${encodeURIComponent(q)}`,
    youtube: (q) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    spotify: (q) =>
      `https://open.spotify.com/search/${encodeURIComponent(q)}`,
  };

  /* ===============================
     SEARCH FUNCTIONS
     =============================== */
  const search = (platform) => {
    if (!query.trim()) return;
    window.open(links[platform](query), "_blank");
    saveRecent(query);
  };

  const searchAll = () => {
    if (!query.trim()) return;
    saveRecent(query);
    Object.keys(links).forEach((platform) =>
      window.open(links[platform](query), "_blank")
    );
  };

  return (
    <div
      className={`container ${darkMode ? "dark" : "light"} ${
        glassMode ? "glass-mode" : ""
      }`}
    >
      {/* 🌗 DARK MODE TOGGLE */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            className="toggle"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* 🧊 GLASS MODE TOGGLE (ENTRY STYLE) */}
      <a
        href="#"
        className={`glass-toggle-btn button type--C ${
          glassMode ? "active" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          setGlassMode(!glassMode);
        }}
      >
        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text">
          {glassMode ? "GLASS ON" : "GLASS OFF"}
        </span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </a>

      <h1>SearchDeck</h1>
      <p className="subtitle">Search once. Explore everywhere.</p>

      {/* 🔍 SEARCH */}
      <div className="search-box glass">
        <input
          type="text"
          placeholder="Search everything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchAll()}
        />
        <button onClick={searchAll}>
          <span>
            <FaSearch />
          </span>
        </button>
      </div>

      {/* 🕘 RECENT SEARCHES */}
      {recent.length > 0 && (
        <div className="recent glass">
          <h3>Recent Searches</h3>

          <div className="recent-list">
            {recent.map((r, i) => (
              <div key={i} className="recent-item glass">
                <button
                  className="recent-text"
                  onClick={() => setQuery(r)}
                >
                  {r}
                </button>

                <button
                  className="recent-remove"
                  onClick={() => removeSearch(r)}
                  aria-label="Remove recent search"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="clear-all" onClick={clearAllSearches}>
            Clear All
          </button>
        </div>
      )}

      {/* 🌐 PLATFORM GRID */}
      <div className="grid">
        <button className="glass" onClick={() => search("whatsapp")}>
          <span><FaWhatsapp /> WhatsApp</span>
        </button>
        <button className="glass" onClick={() => search("instagram")}>
          <span><FaInstagram /> Instagram</span>
        </button>
        <button className="glass" onClick={() => search("facebook")}>
          <span><FaFacebookF /> Facebook</span>
        </button>
        <button className="glass" onClick={() => search("twitter")}>
          <span><FaTwitter /> X</span>
        </button>
        <button className="glass" onClick={() => search("telegram")}>
          <span><FaTelegramPlane /> Telegram</span>
        </button>
        <button className="glass" onClick={() => search("youtube")}>
          <span><FaYoutube /> YouTube</span>
        </button>
        <button className="glass" onClick={() => search("spotify")}>
          <span><FaSpotify /> Spotify</span>
        </button>
      </div>
    </div>
  );
}

export default App;
