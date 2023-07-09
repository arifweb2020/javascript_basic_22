import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [contentVisible, setContentVisible] = useState(true);

  const [contentVisible1, setContentVisible1] = useState(false);

  const handleMouseEnter = () => {
    setContentVisible(true);
  };

  const handleMouseLeave = () => {
    setContentVisible(false);
  };

  const handleMouseEnter1 = () => {
    setContentVisible1(true);
    setContentVisible(false);
  };

  const handleMouseLeave1 = () => {
    setContentVisible1(false);
    setContentVisible(true);
  };

  return (
    <div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Hover me
      </div>
      <div onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
        2nd menu
      </div>

      {contentVisible && <div>This is the content</div>}
      {contentVisible1 && <div>This is the content2</div>}
    </div>
  );
}
