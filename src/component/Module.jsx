import React from 'react'

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


export { ContactMsg }
