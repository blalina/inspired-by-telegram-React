import React from "react";
import { AttachFileIcon, AttachPhotoIcon, CallIcon, CloseIcon, DropdownMenuIcon, LupaIcon, MoodIcon, MoreVertIcon, SendIcon, VoiceIcon } from "./Icons";
import classes from "../modules_css/Buttons.module.css";

export function DropdownMenu(props) {
    return (
        <button className={classes.dropdownMenu} onClick={props.onClick}>
            <DropdownMenuIcon />
        </button>
    );
}

export function ClearButton(props) {
    return (
        <button className={props.value === '' ? classes.clearButton : `${classes.clearButton} ${classes.showClearButton}`} onClick={props.onClick}>
            <CloseIcon />
        </button>
    );
}

export function LupaButton() {
    return (
        <button className={classes.lupaButton}>
            <LupaIcon />
        </button>
    );
}

export function CallButton() {
    return (
        <button className={classes.callButton}>
            <CallIcon />
        </button>
    );
}

export function MoreVertButton() {
    return (
        <button className={classes.moreVertButton}>
            <MoreVertIcon />
        </button>
    );
}

export function MoodButton() {
    return (
        <button className={classes.moodButton}>
            <MoodIcon />
        </button>
    );
}

export function AttachFileButton(props) {
    return (
        <button className={classes.attachFileButton} onClick={props.onClick}>
            <AttachFileIcon />
        </button>
    );
}

export function AttachPhotoButton() {
    return (
        <button className={classes.attachPhotoButton} >
            <AttachPhotoIcon />
        </button>
    );
}

export function SendButtonFile(props) {
    return (
        <button className={classes.sendButtonFile} onClick={props.onClick}>
            {props.file ? `${props.file.name}` : 'Open'}
        </button>
    );
}

export function VoiceButton() {
    return (
        <button className={classes.voiceButton}>
            <VoiceIcon />
        </button>
    );
}

export function SendButton({ addPost }) {
    return (
        <button 
            className={classes.sendButton}
            onClick={addPost}
        >
            <SendIcon />
        </button>
    );
}
