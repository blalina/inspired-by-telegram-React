import React from "react";
import { useRef } from "react";
import classes from "../modules_css/UserInfo.module.css";

const usersInfo = [
    {
        id: 0,
        name: 'Princess',
        surname: 'Tiabeanie',
        lastMessage: 'Gav gav gav',
        nameImg: 'bean',
    },
    {
        id: 1,
        name: 'Oleg',
        surname: 'Drapeza',
        lastMessage: 'Bean, good girl!',
        nameImg: 'lovely_boy',
    },
    {
        id: 2,
        name: 'Alina',
        surname: 'Blokhina',
        lastMessage: 'I think game development is the best coding job. You have to use your imagination and realize what you have in mind. You create an entire world with characters and objects, thinking about in-game mechanics. Oh, it’s a whole art form.',
        nameImg: 'avatar2',
    },
    {
        id: 3,
        name: '1ne',
        surname: 'here',
        lastMessage: 'Two',
        nameImg: 'avatar2',
    },
    {
        id: 4,
        name: 'Cornfield',
        surname: 'Chase',
        lastMessage: 'Three',
        nameImg: 'avatar2',
    },
    {
        id: 5,
        name: 'Day',
        surname: 'one',
        lastMessage: 'Four',
        nameImg: 'avatar2',
    },
    {
        id: 6,
        name: '22',
        surname: 'April',
        lastMessage: 'Five',
        nameImg: 'avatar2',
    },
    {
        id: 7,
        name: 'afraid of',
        surname: 'Time',
        lastMessage: 'Six',
        nameImg: 'avatar2',
    },
    {
        id: 8,
        name: 'TodayIsFriday',
        surname: 'MaybeItsJustLongName',
        lastMessage: 'Seven',
        nameImg: 'avatar2',
    },
    {
        id: 9,
        name: 'Алина',
        surname: 'Blokhina',
        lastMessage: 'Eight',
        nameImg: 'avatar2',
    },
    {
        id: 10,
        name: 'Username',
        surname: 'here',
        lastMessage: 'Nine',
        nameImg: 'avatar2',
    },
    {
        id: 11,
        name: 'Алина',
        surname: 'Блохина',
        lastMessage: 'Ten',
        nameImg: 'avatar2',
    },
    {
        id: 12,
        name: 'Олег',
        surname: 'Драпеза',
        lastMessage: 'Eleven',
        nameImg: 'avatar2',
    },
    {
        id: 13,
        name: 'Иван',
        surname: 'Блохин',
        lastMessage: 'Twelve',
        nameImg: 'avatar2',
    },
];

function getImageUrl(nameImg) {
    return new URL(`../assets/images/${nameImg}.jpeg`, import.meta.url).href
}

export function UserInfo(props) {
    const { value } = props;
    const chatListTitle = useRef();

    const blockWithUserInfo = usersInfo.filter(({ name, surname }) => {
        const valueFromTheInput = value.trim().toLowerCase();
        const remadeName = name.toLowerCase().search(valueFromTheInput);
        const remadeSurname = surname.toLocaleLowerCase().search(valueFromTheInput);
        if ((remadeName !== -1) || (remadeSurname !== -1)) {
            return true;
        } return false;
    }).map(({ id, nameImg, name, surname, lastMessage }) => (
        <div key={id} className={classes.chatListUser}>
            <div className="chatListAvatar">
                <img
                    className={classes.chatListAvatarImg}
                    src={getImageUrl(nameImg)}
                    alt="avatar"
                />
            </div>
            <div className={classes.chatListInfo}>
                <div className="chatListTitle" ref={chatListTitle}>
                    <h3 className={classes.userFullName} value={value}>{name} {surname}</h3>
                </div>
                <div className="chatListSubtitle">
                    <p className={classes.chatListLastMessage}>{lastMessage}</p>
                </div>
            </div>
        </div>
    ));

    return (blockWithUserInfo);
}

export function UserAvatar() {
    return (
            <img
                className={`${classes.navBarHeaderAvatarImg} ${classes.avatarImg}`}
                src={getImageUrl(usersInfo[0].nameImg)}
                alt="avatar"
            />
    );
}

export function FullName() {
    return (
        <div className="middle-header__title">
            <h3>{`${usersInfo[0].name} ${usersInfo[0].surname}`}</h3>
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
