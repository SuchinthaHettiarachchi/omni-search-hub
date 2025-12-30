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

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(saved);
  }, []);

  const saveRecent = (q) => {
    if (!q.trim()) return;
    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const removeSearch = (q) => {
    const updated = recent.filter((r) => r !== q);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearAllSearches = () => {
    setRecent([]);
    localStorage.removeItem("recentSearches");
  };

  const links = {
    whatsapp: (q) =>
      isMobile
        ? `whatsapp://send?text=${encodeURIComponent(q)}`
        : `https://wa.me/?text=${encodeURIComponent(q)}`,
    instagram: (q) =>
      `https://www.instagram.com/explore/tags/${encodeURIComponent(q)}`,
    facebook: (q) =>
      `https://www.facebook.com/search/top?q=${encodeURIComponent(q)}`,
    twitter: (q) => `https://twitter.com/search?q=${encodeURIComponent(q)}`,
    telegram: (q) =>
      isMobile
        ? `tg://msg?text=${encodeURIComponent(q)}`
        : `https://t.me/s/${encodeURIComponent(q)}`,
    youtube: (q) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    spotify: (q) =>
      `https://open.spotify.com/search/${encodeURIComponent(q)}`,
  };

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
    <div className={darkMode ? "container dark" : "container light"}>
     {/* 🌗 THEME TOGGLE (ORIGINAL STYLE – FIXED) */}
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


      <h1>SearchDeck</h1>
      <p className="subtitle">Search once. Explore everywhere.</p>

      <div className="search-box">
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

      {recent.length > 0 && (
        <div className="recent">
          <div className="recent-header">
            <h3>Recent Searches</h3>
            <button className="clear-all" onClick={clearAllSearches}>
              Clear All
            </button>
          </div>

          <div className="recent-list">
            {recent.map((r, i) => (
              <div key={i} className="recent-item">
                <button onClick={() => setQuery(r)}>{r}</button>
                <button
                  className="remove-btn"
                  onClick={() => removeSearch(r)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid">
        <button onClick={() => search("whatsapp")}><span><FaWhatsapp /> WhatsApp</span></button>
        <button onClick={() => search("instagram")}><span><FaInstagram /> Instagram</span></button>
        <button onClick={() => search("facebook")}><span><FaFacebookF /> Facebook</span></button>
        <button onClick={() => search("twitter")}><span><FaTwitter /> X</span></button>
        <button onClick={() => search("telegram")}><span><FaTelegramPlane /> Telegram</span></button>
        <button onClick={() => search("youtube")}><span><FaYoutube /> YouTube</span></button>
        <button onClick={() => search("spotify")}><span><FaSpotify /> Spotify</span></button>
      </div>
    </div>
  );
}

export default App;
