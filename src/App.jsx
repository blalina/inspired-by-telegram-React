import React, { useState } from "react";
import "./App.css";
import { LeftColumn } from "./components/LeftColumn";
import { RightColumn } from "./components/WindowMessages";
import { UserContext } from "./Context";


export function App() {
  const [active, setActive] = useState(false);
  // состояние для списка инфо про юзеров с сервера
  const [userInfoAPI, setuserInfoAPI] = useState([]);

  const handleClick = () => {
    if (active !== true) {
      setActive(prev => !prev)
    }
  };

  return (
    <UserContext.Provider value={{ userInfoAPI, setuserInfoAPI }}>
      <div className="wrapper">
        <LeftColumn onClick={handleClick} />
        <RightColumn show={active} />
      </div>
    </ UserContext.Provider>
  );
}
