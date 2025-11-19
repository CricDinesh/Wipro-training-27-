import React, { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = () => {
    if (!msg.trim()) return;

    setChat([...chat, { from: "user", text: msg }]);
    setMsg("");

    setTimeout(() => {
      setChat(prev => [
        ...prev,
        { from: "bot", text: "I can help with packages, booking or support." }
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating open button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ff5722",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            zIndex: 9999,
          }}
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            height: "380px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#ff5722",
              padding: "10px",
              color: "white",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>Chat Support</strong>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
          </div>

          {/* Chat body */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto"
            }}
          >
            {chat.map((c, i) => (
              <p
                key={i}
                style={{
                  textAlign: c.from === "user" ? "right" : "left",
                  background: c.from === "user" ? "#e8f0fe" : "#f5f5f5",
                  padding: "8px",
                  borderRadius: "6px",
                  marginBottom: "6px"
                }}
              >
                {c.text}
              </p>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px",
              display: "flex",
              gap: "5px"
            }}
          >
            <input
              className="form-control"
              placeholder="Ask..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={send} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
