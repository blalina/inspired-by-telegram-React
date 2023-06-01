import React from "react";
import { AttachPhotoButton, SendButtonFile } from "./Buttons";
import { AttachModalInputFile } from "./Inputs";
import classes from "../modules_css/ModalWindows.module.css";

export function ModalWindowToAttachAFile({ show, inputRef, onChange, file, onClick }) {
    return (
        <div className={show === true ? classes.attachModalContainer : classes.attachModalContainerHidden} >
            <AttachPhotoButton />
            <AttachModalInputFile inputRef={inputRef} onChange={onChange} />
            <SendButtonFile file={file} onClick={onClick} />
        </div>
    );
}
