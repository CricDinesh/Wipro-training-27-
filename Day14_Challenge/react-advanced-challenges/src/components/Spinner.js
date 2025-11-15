import React from "react";
import "./Spinner.css";

export default function Spinner({ small = false }) {
  return <div className={small ? "spinner spinner-small" : "spinner"} aria-hidden="true" />;
}
