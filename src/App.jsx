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
  FaSun,
  FaMoon
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
    if (!q) return;
    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const links = {
    whatsapp: (q) =>
      isMobile
        ? `whatsapp://send?text=${encodeURIComponent(q)}`
        : q
        ? `https://wa.me/?text=${encodeURIComponent(q)}`
        : `https://web.whatsapp.com/`,
    instagram: (q) =>
      q
        ? `https://www.instagram.com/explore/tags/${encodeURIComponent(q)}`
        : `https://www.instagram.com/`,
    facebook: (q) =>
      q
        ? `https://www.facebook.com/search/top?q=${encodeURIComponent(q)}`
        : `https://www.facebook.com/`,
    twitter: (q) =>
      q
        ? `https://twitter.com/search?q=${encodeURIComponent(q)}`
        : `https://twitter.com/`,
    telegram: (q) =>
      isMobile
        ? `tg://msg?text=${encodeURIComponent(q)}`
        : q
        ? `https://t.me/s/${encodeURIComponent(q)}`
        : `https://web.telegram.org/`,
    youtube: (q) =>
      q
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
        : `https://www.youtube.com/`,
    spotify: (q) =>
      q
        ? `https://open.spotify.com/search/${encodeURIComponent(q)}`
        : `https://open.spotify.com/`,
  };

  const search = (platform) => {
    saveRecent(query);
    window.open(links[platform](query), "_blank");
  };

  const searchAll = () => {
    saveRecent(query);
    Object.keys(links).forEach((platform) => search(platform));
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <h1>OmniSearch Hub</h1>
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
          <FaSearch />
        </button>
      </div>

      {recent.length > 0 && (
        <div className="recent">
          <h3>Recent Searches</h3>
          <div className="recent-list">
            {recent.map((r, i) => (
              <button key={i} onClick={() => setQuery(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid">
        <button onClick={() => search("whatsapp")}><FaWhatsapp /> WhatsApp</button>
        <button onClick={() => search("instagram")}><FaInstagram /> Instagram</button>
        <button onClick={() => search("facebook")}><FaFacebookF /> Facebook</button>
        <button onClick={() => search("twitter")}><FaTwitter /> X</button>
        <button onClick={() => search("telegram")}><FaTelegramPlane /> Telegram</button>
        <button onClick={() => search("youtube")}><FaYoutube /> YouTube</button>
        <button onClick={() => search("spotify")}><FaSpotify /> Spotify</button>
      </div>
    </div>
  );
}

export default App;

