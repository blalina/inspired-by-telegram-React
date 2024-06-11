import React, { useContext, useEffect, useState } from "react";
import classes from "../modules_css/WindowMessages.module.css";
import { AttachFileButton, CallButton, LupaButton, MoodButton, MoreVertButton, SendButton, VoiceButton } from "./Buttons";
import { FullName, UserAvatar, UserStatus } from "./UserInfo";
import { useRef } from "react";
import { MessageBody } from "./Messages";
import { ModalWindowToAttachAFile } from "./ModalWindows";
import { UserContext } from "../Context";

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
    const [posts, setPosts] = useState([]);

    const inputRef = useRef(null);

    const { userId } = useContext(UserContext);
    useEffect(() => {
        const abortController = new AbortController();

        fetch(`http://localhost:4000/messages/${userId}`, { signal: abortController.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setPosts(data.map((message) => ({...message, type: "message"})));
            })
            .catch(error => {
                if (!abortController.signal.aborted) {
                    console.log('Error fatching data:', error);
                }
            })

            return () => {
                abortController.abort();
            }
    }, [userId]);

    const postRequestCreation = async (reader) => {
        const messageBody = {
            id: posts.length,
            author: 999999,
            type: "message",
            text: post,
            date: monthToday,
        };

        if (reader && reader.result) {
            messageBody.attachment = {
                type: 'base64',
                value: reader.result
            };
        }

        setPosts((currentPost) => [...currentPost, messageBody]);

        try {
            const response = await fetch(`http://localhost:4000/messages/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(messageBody),
            });
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            const createdMessage = await response.json();

            setPosts((allMessageArray) => allMessageArray.map((oneMessage) => {
                if (oneMessage.id === messageBody.id) {
                    return {
                        ...oneMessage,
                        ...createdMessage
                    };
                }
                return oneMessage;
            }));
        } catch (error) {
            console.log('Error fetching data:', error);
            setPosts((allMessageArray) => allMessageArray.filter((oneMessage) => {
                if (oneMessage.id === messageBody.id) {
                    return false;
                }
                return true;
            }));
        }
    }

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
            postRequestCreation();
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

    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                postRequestCreation(reader);
                setFile("");
                setPost("");
            }
        };

        reader.readAsDataURL(event.target.files[0]);
        console.log("event.target", event.target.files[0]);
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
