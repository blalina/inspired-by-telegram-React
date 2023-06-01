import React, { useState, useEffect, useRef } from "react";
import classes from "../modules_css/LeftColumn.module.css";
import { ClearButton, DropdownMenu } from "./Buttons";
import { LupaIcon } from "./Icons";
import { SearchInput } from "./Inputs";
import { Menu } from "./Menu";
import { UserInfo } from "./UserInfo";

export function LeftColumn({ onClick }) {
    const [elementSize, setElementSize] = useState(0);
    const [mouseDistance, setMouseDistance] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const leftColumnRef = useRef();
    const resizeHandleRef = useRef();
    const currentMousePositionRef = useRef(0);

    useEffect(() => {
        const calculateElementSize = window.getComputedStyle(leftColumnRef.current);
        setElementSize(parseInt(calculateElementSize.width, 10));
    }, []);

    const mouseMoveHandler = (event) => {
        setMouseDistance(event.clientX - currentMousePositionRef.current);
    }; // получаем координаты и пересчитываем ширину

    const mouseDownHandler = (event) => {
        event.preventDefault();
        const calculateElementSize = window.getComputedStyle(leftColumnRef.current);
        setElementSize(parseInt(calculateElementSize.width, 10));
        currentMousePositionRef.current = event.clientX;

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    }; // включаем режим растяжения

    const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }; // выключаем режим растяжения

    const handleValueChange = (value) => {
        setSearchValue(value);
    };

    const handleClear = (event) => {
        event.preventDefault();
        setSearchValue('');
    };

    return (
        <div className={classes.leftColumn} style={elementSize !== 0 ? { width: `${elementSize + mouseDistance}px` } : null} ref={leftColumnRef}>
            <div className={classes.resizeHandle} ref={resizeHandleRef} onMouseDown={mouseDownHandler}></div>
            <LeftHeader value={searchValue} onChange={handleValueChange} onClick={handleClear} />
            <ChatList value={searchValue} onClick={onClick} />
        </div>
    );
}

export function LeftHeader(props) {
    const { value, onChange } = props;
    const [active, setActive] = useState(false);

    const menuRef = useRef();

    const handleClick = () => setActive(prev => !prev);

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener('mousedown', closeDropdown);

        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };

    }, []);

    return (
        <>
            <div className={classes.leftHeader}>
                <div className="dropdown-menu" ref={menuRef}>
                    <DropdownMenu  onClick={handleClick} />
                    <Menu show={active} />
                </div>
                <div className={classes.leftHeaderSearch}>
                    <SearchInput value={value} onChange={onChange} />
                    <span className={classes.spanSearch}>
                        <LupaIcon />
                    </span>
                        <ClearButton value={value} onClick={props.onClick} />
                </div>
            </div>
        </>
    );
}

export function ChatList(props) {
    const { value } = props;
    return (
        <div className={classes.chatList} onClick={props.onClick}>
            <UserInfo value={value} />
        </div>
    );
}
