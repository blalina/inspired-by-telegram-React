import React from "react";
import { ArchivedChatsIcon, BugIcon, ContactsIcon, HelpIcon, NightModeIcon, SavedMessageIcon, SettingsIcon } from "./Icons";
import classes from "../modules_css/Menu.module.css";

export function Menu(props) {
    return (
        <nav className={props.show === false ? classes.dropdownMenuNav : classes.dropdownMenuNavActive}>
                            <ul className={classes.dropdownMenuUl}>
                                <li className={classes.dropdownMenuLi}>
                                    <SavedMessageIcon  />
                                    <a className={classes.dropdownMenuA}>Saved Messages</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <ArchivedChatsIcon />
                                    <a className={classes.dropdownMenuA}>Archived Chats</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <ContactsIcon />
                                    <a className={classes.dropdownMenuA}>Contacts</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <SettingsIcon />
                                    <a className={classes.dropdownMenuA}>Settings</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <NightModeIcon />
                                    <a className={classes.dropdownMenuA}>Night Mode</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <HelpIcon />
                                    <a className={classes.dropdownMenuA}>Telegram Features</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <BugIcon />
                                    <a className={classes.dropdownMenuA}>Report Bug</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <p className={classes.dropdownMenuLiPK}>K</p>
                                    <a className={classes.dropdownMenuA}>Switch to K Version</a>
                                </li>
                                <li className={classes.dropdownMenuLi}>
                                    <p className={classes.dropdownMenuLiPW}>W</p>
                                    <a className={classes.dropdownMenuA}>Switch to Old Version</a>
                                </li>
                                <li className={classes.dropdownMenuLiTextBelow}>Telegram WebZ 0.00.0</li>
                            </ul>
                        </nav>
    );
}
