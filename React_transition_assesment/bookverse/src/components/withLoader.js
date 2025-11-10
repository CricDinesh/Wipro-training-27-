import React, { useEffect, useState } from "react";

export default function withLoader(Component) {
  return function LoaderWrapper(props) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }, []);
    return loading ? (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    ) : (
      <Component {...props} />
    );
  };
}
