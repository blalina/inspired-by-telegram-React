import React from "react";
import classes from "../modules_css/Inputs.module.css";

export function SearchInput(props) {
    const { onChange, value } = props;

    const handleValueChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <input 
            className={classes.searchInput} 
            type="text" 
            placeholder="Search"
            value={value}
            onChange={handleValueChange}
        />
    );
}

export function AttachModalInputFile({onChange, inputRef}) {
    return (
        <input
            className={classes.attachModalInputFile} 
            type="file"
            ref={inputRef}
            onChange={onChange}
            multiple
        />
    );
}
