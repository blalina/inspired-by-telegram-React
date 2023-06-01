import React, { useEffect, useState } from "react";
import classes from "../modules_css/WindowMessages.module.css";
import { AttachFileButton, CallButton, LupaButton, MoodButton, MoreVertButton, SendButton, VoiceButton } from "./Buttons";
import { FullName, UserAvatar, UserStatus } from "./UserInfo";
import { useRef } from "react";
import { MessageBody } from "./Messages";
import { ModalWindowToAttachAFile } from "./ModalWindows";

export function RightColumn({ show }) {
    return (
        <div className={classes.rightColumn}>
            <NavBar show={show} />
            <MessageWindow show={show} />
        </div>
    );
}

export function NavBar({ show }) {
    return (
        <div className={show === true ? `${classes.navBar_active} ${classes.navBar}` : classes.navBar}>
            <div className="middle-header_avatar">
                <UserAvatar />
            </div>
            <div className="middle-header_info">
                <FullName />
                <UserStatus />
            </div>
            <NavBarTools />
        </div>
    );
}

export function NavBarTools() {
    return (
        <div className={classes.navBarTools}>
            <LupaButton />
            <CallButton />
            <MoreVertButton />
        </div>
    );
}

export function MessageWindow({ show }) {
    const [post, setPost] = useState('');
    const [file, setFile] = useState('');
    const [posts, setPosts] = useState([
        {
            type: "message",
            id: 0,
            text: "",
            nameImg: "mamis_dumplongs",
            position: "left",
            date: "March 12",
            files: "",
        },
        {
            type: "message",
            id: 1,
            text: "Who knows? Is this the start of something wonderful and new? Or one more dream that I cannot make true? Gav gav gav Gav Gav gav Gav gav gav",
            nameImg: "",
            position: "left",
            date: "March 12",
            files: "",
        },
        {
            type: "message",
            id: 2,
            text: "Who knows? All that is really worth the doing is what we do for others. Everybody has won, and all must have prizes. If you don't think, you shouldn't talk. Gav Gav gav Gav gav gav Who in the world am I? Ah, that's the great puzzle.",
            nameImg: "",
            position: "right",
            date: "March 23",
            files: "",
        },
        {
            type: "message",
            id: 3,
            text: "I will follow you into the darkness",
            nameImg: "",
            position: "left",
            date: "April 4",
            files: "",
        },
        {
            type: "message",
            id: 4,
            text: "My lover's got humour",
            nameImg: "",
            position: "right",
            date: "April 5",
            files: "",
        },
    ]);

    const inputRef = useRef(null);

    const month = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      };

    const currentTime = new Date();
    const currentMonth = currentTime.getMonth();
    const currentDate = currentTime.getDate();
    const monthToday = `${month[currentMonth]} ${currentDate}`;

    const addPost = () => {
        
        if (post !== "") {
            setPosts([...posts, {
                type: "message",
                id: posts.length,
                text: post,
                nameImg: "",
                position: "right",
                date: monthToday,
                files: file,
            }]);
            setPost("");
            setFile("");
        }
    };

    const handleChange = (event) => {
        setPost(event.currentTarget.textContent);
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            addPost(event);
        }
    };
    // For modal window
    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile("");
                setPost("");
                setPosts([...posts, {
                    type: "message",
                    id: posts.length,
                    text: post,
                    nameImg: "",
                    position: "right",
                    date: monthToday,
                    files: reader.result,
                }]);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleUploadClick = () => {
        inputRef.current.click();
        inputRef.current.value = null;
    };

    return (
        <div className={classes.messageWindow}>
            <MessageListWrapper show={show} list={posts} post={post}
            />
            <RightColumnFooter 
                addPost={addPost} 
                onContent={handleChange} 
                post={post} 
                onKeyDown={handleKeyPress}

                inputRef={inputRef} onChange={handleFileChange}

                file={file} onClick={handleUploadClick}

                show={show}
            />
        </div>
    );
}

export function MessageListWrapper({ list, show }) {
    return (
        <div className={classes.messageListWrapper}>
            <div className={classes.messageListScrollableArea}>
                <div className={classes.messageList}>
                    <div className={show === true ? `${classes.messageContainer} ${classes.messageContainer_active}` : classes.messageContainer}>
                        <MessageBody list={list} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function RightColumnFooter({ post, onContent, addPost, onKeyDown, inputRef, onChange, file, onClick, show }) {
    const [active, setActive] = useState(false);
    const divTextRef = useRef();

    useEffect(() => {
        if (post !== divTextRef.current.textContent) {
            divTextRef.current.textContent = post;
        }
    }, [post]);

    const handleClick = () => setActive(prev => !prev);

    useEffect(() => {
        const closeModalWindow = (event) => {
            if (!inputRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener('mouseup', closeModalWindow);

        return () => {
            document.removeEventListener('mouseup', closeModalWindow);
        };
    }, []);

    return (
        <div className={show === true ? `${classes.rightColumnFooter} ${classes.rightColumnFooter_active}` : classes.rightColumnFooter}>
            <div className={classes.rightColumnFooterTools}>
                <MoodButton />
                <div
                    className={classes.inputMessageFooter}
                    contentEditable="true"  
                    data-text="Message" 
                    name="text" 
                    aria-label="Message"
                    ref={divTextRef}
                    onInput={onContent}
                    onKeyDown={onKeyDown}
                >
                </div>
                <AttachFileButton onClick={handleClick} />
                <ModalWindowToAttachAFile show={active} 
                    inputRef={inputRef} onChange={onChange}

                    file={file} onClick={onClick}
                />
            </div>
            {post === '' ? <VoiceButton /> : <SendButton addPost={addPost} />} 
        </div>
    );
}

