import React from "react";

export default function RenderMessage({ children }) {
  const message = "Welcome to BookVerse! Enjoy managing your books.";
  return children({ message });
}
