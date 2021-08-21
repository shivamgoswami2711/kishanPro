import React from 'react'
import firebase from 'firebase';

function ContactMsg() {
    return (
        <div className="mainContactContainer">
            <div className="infocard chatCard">
                <div className="NotificationProfilePic">
                    <img src="./profile.jpg" alt="" />
                </div>
                <div className="notificationInfo chatInfo">
                    <h3>shivam</h3>
                    <div className="msgClip"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, voluptates.</p><div className="readStatus"></div></div>
                    <p className="date">12:40 PM</p>
                </div>
            </div>
        </div>
    )
}

export const Throttle = (func, timeFrame) => {
    var lastTime = 0;
    return function () {
        var now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
}

export function makeid() {
    const length = 5
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result + new Date().getTime().toString();
}

export const PostTimeCalculate = (timestamp) => {
    let date
    date = (new Date().getTime() - timestamp) / 1000
    if (date < 60) {
        return date.toFixed(0) + " second"
    }
    else if (date / 60 < 60) {
        return (date / 60).toFixed(0) + " minute"
    }
    else if (date / (60 * 60) < 24) {
        return (date / (60 * 60)).toFixed(0) + " hour"
    }
    else if (date / (60 * 60 * 24) < 60) {
        return (date / (60 * 60 * 24)).toFixed(0) + " day"
    }
    return date
}

export const ProfileCantainer = ({ pic, name, uid, time, PostDelet, Edit, setEdit, DeleteId}) => {
    // firebase 
    const user = firebase.auth().currentUser;
    return (
        <div className="PostProfileContainer">
            <div className="profileCircle"><img src={pic} alt="" /></div>
            <div><span className="Postdistense">{PostTimeCalculate(time)} </span><h2>{name}</h2></div>
            {user.uid === uid ? <div className="deleteContainer">
                <i onClick={() => PostDelet(DeleteId)} className="far fa-trash-alt"></i>
                <i onClick={() => Edit ? setEdit(false) : setEdit(true)} className="fas fa-pencil-alt"></i>
            </div> : ''}
        </div>
    )
}
export { ContactMsg }
