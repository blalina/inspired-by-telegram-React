import React, { useState } from "react";
import "./App.css";
import { LeftColumn } from "./components/LeftColumn";
import { RightColumn } from "./components/WindowMessages";
import { UserContext } from "./Context";


export function App() {
  const [active, setActive] = useState(false);
  const [userInfoAPI, setuserInfoAPI] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleClick = () => {
    if (active !== true) {
      setActive(prev => !prev)
    }
  };

  return (
    <UserContext.Provider value={{ userInfoAPI, setuserInfoAPI, userId, setUserId }}>
      <div className="wrapper">
        <LeftColumn onClick={handleClick} />
        <RightColumn show={active} />
      </div>
    </ UserContext.Provider>
  );
}
