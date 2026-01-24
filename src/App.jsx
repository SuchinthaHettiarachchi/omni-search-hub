import { useState, useEffect, useMemo } from "react";
import "./App.css";

// Social & utility icons
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
  /*  STATE*/
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [glassMode, setGlassMode] = useState(false);

  /* DEVICE CHECK (SAFE) */
  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  /* LOAD RECENT SEARCHES (ONCE) */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      setRecent(saved);
    } catch {
      setRecent([]);
    }
  }, []);

  /* RECENT SEARCH HANDLERS */
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

  /* PLATFORM LINKS */
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

  /* SEARCH ACTIONS */
  const search = (platform) => {
    if (!query.trim()) return;
    window.open(links[platform](query), "_blank", "noopener,noreferrer");
    saveRecent(query);
  };

  const searchAll = () => {
    if (!query.trim()) return;
    saveRecent(query);
    // NOTE: May be blocked by popup blockers (browser limitation)
    Object.values(links).forEach((fn) =>
      window.open(fn(query), "_blank", "noopener,noreferrer")
    );
  };

  /* INPUT VALIDATION */
  const isQueryEmpty = !query.trim();

  /* KEYBOARD SHORTCUTS */
  const handleKeyDown = (e) => {
    // Enter - Search all platforms
    if (e.key === "Enter" && !isQueryEmpty) {
      searchAll();
    }
    // Escape - Clear search input
    if (e.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div
      className={`container ${darkMode ? "dark" : "light"} ${
        glassMode ? "glass-mode" : ""
      }`}
    >
      {/* GLASS MODE TOGGLE */}
      <div className="glass-toggle">
        <button
          type="button"
          className={`glass-toggle-btn ${glassMode ? "active" : ""}`}
          onClick={() => setGlassMode((v) => !v)}
        >
          {glassMode ? "GLASS ON" : "GLASS OFF"}
        </button>
      </div>

      {/* THEME TOGGLE */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            className="toggle"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((v) => !v)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <h1>SearchDeck</h1>
      <p className="subtitle">Search once. Explore everywhere.</p>

      {/* SEARCH BAR */}
      <div className="search-box glass">
        <input
          type="text"
          placeholder="Search everything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search query input"
          title="Press Enter to search all platforms, Esc to clear"
        />
        <button 
          onClick={searchAll} 
          disabled={isQueryEmpty}
          aria-label="Search all platforms"
          title={isQueryEmpty ? "Enter a search query" : "Search all platforms (Enter)"}
        >
          <FaSearch />
        </button>
      </div>

      {/* RECENT SEARCHES */}
      {recent.length > 0 && (
        <div className="recent glass">
          <h3>Recent Searches</h3>

          <div className="recent-list">
            {recent.map((r) => (
              <div key={r} className="recent-item glass">
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

      {/*  PLATFORM BUTTONS */}
      <div className="grid">
        <button className="glass" onClick={() => search("whatsapp")} aria-label="Search on WhatsApp"><FaWhatsapp /> WhatsApp</button>
        <button className="glass" onClick={() => search("instagram")} aria-label="Search on Instagram"><FaInstagram /> Instagram</button>
        <button className="glass" onClick={() => search("facebook")} aria-label="Search on Facebook"><FaFacebookF /> Facebook</button>
        <button className="glass" onClick={() => search("twitter")} aria-label="Search on X (Twitter)"><FaTwitter /> X</button>
        <button className="glass" onClick={() => search("telegram")} aria-label="Search on Telegram"><FaTelegramPlane /> Telegram</button>
        <button className="glass" onClick={() => search("youtube")} aria-label="Search on YouTube"><FaYoutube /> YouTube</button>
        <button className="glass" onClick={() => search("spotify")} aria-label="Search on Spotify"><FaSpotify /> Spotify</button>
      </div>
    </div>
  );
}

export default App;
