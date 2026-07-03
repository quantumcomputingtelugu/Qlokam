import React, { useEffect, useState } from "react";

export default function WarningModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300); // match transition duration
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: animate ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(255, 60, 60, 0.4)",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          transform: animate ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "0 10px 40px rgba(255, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "rgba(255, 60, 60, 0.1)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px auto",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff4d4d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 style={{ margin: "0 0 12px 0", color: "#ff4d4d", fontSize: "24px" }}>
          Warning
        </h2>
        <p style={{ margin: "0 0 24px 0", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {message}
        </p>
        <button
          onClick={handleClose}
          style={{
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#ff3333")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#ff4d4d")}
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
