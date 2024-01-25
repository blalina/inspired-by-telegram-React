import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import classes from "../modules_css/UserInfo.module.css";
import { UserContext } from "../Context";

export function getImageUrl(avatarImg) {
    return new URL(`../assets/images/${avatarImg}.jpeg`, import.meta.url).href;
}

export function UserInfo(props) {
    const { userId, userInfoAPI, setUserId, setuserInfoAPI } = useContext(UserContext);
    const { value } = props;
    const chatListTitle = useRef();
    
    useEffect(() => {
        fetch('http://localhost:4000/users/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setuserInfoAPI(data);
            })
            .catch(error => console.log('Error fatching data:', error))
    }, []);

    const blockWithUserInfo = userInfoAPI.filter(({ name, surname }) => {
        const valueFromTheInput = value.trim().toLowerCase();
        const remadeName = name.toLowerCase().search(valueFromTheInput);
        const remadeSurname = surname.toLocaleLowerCase().search(valueFromTheInput);
        if ((remadeName !== -1) || (remadeSurname !== -1)) {
            return true;
        } return false;
    }).map(({ id, avatarImg, name, surname, lastMessage }) => {
        return (<div key={id} className={id === userId ? `${classes.chatListUser} ${classes.chatListUser_active}` : classes.chatListUser} 
            onClick={() => {setUserId(id);}}
        >
            <div className="chatListAvatar">
                <img
                    className={classes.chatListAvatarImg}
                    src={getImageUrl(avatarImg)}
                    alt="avatar"
                />
            </div>
            <div className={classes.chatListInfo}>
                <div className="chatListTitle" ref={chatListTitle}>
                    <h3 className={id !== userId ? `${classes.userFullName} ${classes.userFullName_normal}` : `${classes.userFullName} ${classes.userFullName_selected}`} 
                        value={value}
                    >
                        {name} {surname}
                    </h3>
                </div>
                <div className="chatListSubtitle">
                    <p className={id !== userId ? `${classes.chatListLastMessage} ${classes.chatListLastMessage_normal}` : `${classes.chatListLastMessage} ${classes.chatListLastMessage_selected}`}
                    >
                        {lastMessage}
                    </p>
                </div>
            </div>
        </div>);
    });

    return (blockWithUserInfo);
}

export function UserAvatar() {
    const { userInfoAPI, userId } = useContext(UserContext);

    if (userInfoAPI.length === 0 || !userInfoAPI[userId]) {
        return "...";
    }

    return (
            <img
                className={`${classes.navBarHeaderAvatarImg} ${classes.avatarImg}`}
                src={getImageUrl(userInfoAPI[userId].avatarImg)}
                alt="avatar"
            />
    );
}

export function FullName() {
    const { userInfoAPI, userId } = useContext(UserContext);

    if (userInfoAPI.length === 0 || !userInfoAPI[userId]) {
        return "...";
    }

    return (
        <div className="middle-header__title">
            <h3>{`${userInfoAPI[userId].name} ${userInfoAPI[userId].surname}`}</h3>
        </div>
    );
}

export function UserStatus() {
    return (
        <div className="middle-header__subtitle">
            <p className={classes.navBarUserStatus}>last seen just now</p>
        </div>
    );
}
