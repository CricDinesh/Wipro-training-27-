import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Chatbot /> {/* Floating chatbot */}
    </BrowserRouter>
  );
}

export default App;
