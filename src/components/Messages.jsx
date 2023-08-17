import React from "react";
import classes from "../modules_css/Messages.module.css";

export function getImageUrl(value) {
    return new URL(`../assets/images/${value}.png`, import.meta.url).href;
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
    console.log('list', list);

    return listWithDates.map(({ id, text, author, attachment, date, type }) => {
        if (type === 'date-separator') {
            return (
                <div key={date} className={classes.messageDate}>
                    <span className={classes.messageDateSpan}>{date}</span>
                </div>
            );
        }
        // const checkAttachment = (attachment !== undefined) ? console.log("attachment.type:", attachment.type, ", attachment.value:", attachment.value) : undefined;
        // console.log(checkAttachment);
        const haveNameImg = attachment
            ? <img className={classes.messageBodyImg} src={attachment.type === 'image' ? getImageUrl(attachment.value) : attachment.value} alt="user photo" /> 
            : <p className={classes.messageBodyText}>{text}</p>;

        const leftPosition = author === 0 ? classes.messageBodyLeft : classes.messageBodyRigth;
        
        return (
            <div key={id} className={`${classes.messageBody} ${leftPosition}`}>
                {haveNameImg}
            </div>
        );
    });
}
