import React, { useEffect, useState } from "react";

function Alert({ theme, message }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // 3 sec baad hide
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`alert alert-${theme} alert-dismissible fade show`}style={{ position: "fixed", top: "10px", right: "10px", zIndex: 9999 }} 
      role="alert"
    >
      {message}
    </div>
  );
}

export default Alert;
