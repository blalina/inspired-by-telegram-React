import React, { useState } from "react";
import "./App.css";
import { LeftColumn } from "./components/LeftColumn";
import { RightColumn } from "./components/WindowMessages";


export function App() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active !== true) {
      setActive(prev => !prev)
    }
  };

  return (
    <>
      <div className="wrapper">
        <LeftColumn onClick={handleClick} />
        <RightColumn show={active} />
      </div>
    </>
  );
}
