import React from "react";
import "./Common.css";

/**
 * StatsCard is memoized so it only re-renders when props change.
 * We log to the console to demonstrate when it re-renders.
 */
function StatsCardComponent({ title, value, lastUpdated }) {
  console.log(`StatsCard render: ${title} — value: ${value} — lastUpdated: ${lastUpdated}`);
  return (
    <div className="stats-card">
      <div className="stats-title">{title}</div>
      <div className="stats-value">{value}</div>
      <div className="stats-small">Updated: {lastUpdated}</div>
    </div>
  );
}

// Shallow compare by default; that's what React.memo does.
const StatsCard = React.memo(StatsCardComponent);

export default StatsCard;
