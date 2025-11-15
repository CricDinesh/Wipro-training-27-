import React, { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect when app is installable
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Detect if already installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      alert("✅ App is already installed!");
      return;
    }

    if (!deferredPrompt) {
      alert("⚠️ App cannot be installed right now. Please reload.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      alert("🎉 App installed successfully!");
    } else {
      alert("❌ Installation was dismissed.");
    }
    setDeferredPrompt(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb, #9333ea)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
         My PWA React App
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        This app is installable and works offline.
      </p>

      <button
        onClick={handleInstallClick}
        aria-label="Install Progressive Web App"
        style={{
          backgroundColor: "#0ea5e9",
          padding: "12px 28px",
          border: "none",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0284c7")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#0ea5e9")}
      >
        Install App
      </button>

      {isInstalled && (
        <p
          style={{
            marginTop: "15px",
            fontSize: "1rem",
            color: "#d1fae5",
          }}
        >
          ✅ App is already installed
        </p>
      )}
    </div>
  );
}

export default App;
