import React from "react";
import { withWindowWidth } from "./WindowWidthHOC";

function ShowWidth({ windowWidth }) {
  return (
    <div
      className="width-display"
      style={{
        padding: "15px 20px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        width: "fit-content",
        fontWeight: "600",
        color: "#5c39ff",
        marginTop: "15px",
      }}
    >
      Window Width: {windowWidth}px
    </div>
  );
}

export default withWindowWidth(ShowWidth);
