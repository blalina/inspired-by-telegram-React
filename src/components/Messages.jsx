import React from "react";
import classes from "../modules_css/Messages.module.css";

function getImageUrl(nameImg) {
    return new URL(`../assets/images/${nameImg}.png`, import.meta.url).href;
}

export function MessageBody({ list }) {
    let currentDate;
    
    const listWithDates = list
    .reduce((result, item) => {
        if (item.type === 'message' && (!currentDate || item.date !== currentDate)) {

            currentDate = item.date;

            result.push({
                type: "date-separator",
                date: item.date,
            });
        }
        result.push(item);

        return result;
    }, []);

    return listWithDates.map(({ id, text, nameImg, position, date, type, files }) => {
        if (type === 'date-separator') {
            return (
                <div key={date} className={classes.messageDate}>
                    <span className={classes.messageDateSpan}>{date}</span>
                </div>
            );
        }

        const haveNameImg = (nameImg || files)
            ? <img className={classes.messageBodyImg} src={files ? files : getImageUrl(nameImg)} alt="user photo" /> 
            : <p className={classes.messageBodyText}>{text}</p>;

        const leftPosition = position === "left" ? classes.messageBodyLeft : classes.messageBodyRigth;
        
        return (
            <div key={id} className={`${classes.messageBody} ${leftPosition}`}>
                {haveNameImg}
            </div>
        );
    });
}
  