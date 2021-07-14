import React from 'react'
import { ContactMsg } from './Module'

function Chat() {
    return (
        <section className="chatMainContainer">
            <div className="contactAccount">
                <div className="chatContact">
                    <div id="search">
                        <input className="search contactSearch" type="search" name="" id="" />
                    </div>
                    <ContactMsg />
                    <ContactMsg />
                </div>
            </div>
            <div className="chatSection">
                <div className="msgcontainer">
                    <div className="contactButton"><i className="fas fa-address-card"></i></div>
                </div>
                <div className="msgsendingContainer">
                    <div><i className="fas fa-plus">
                        <div className="msgManu">
                            <div className="msgmanuContainer">
                                <div><i className="fas fa-camera"></i></div>
                                <div><i className="fas fa-seedling"></i></div>
                                <div><i className="fas fa-map-marker-alt"></i></div>
                            </div>
                        </div>
                    </i>
                    </div>
                    <div>
                        <input type="text" name="msg" id="msg" placeholder="massage" />
                    </div>
                    <div><i className="fas fa-paper-plane"></i></div>
                </div>
            </div>
        </section>
    )
}

export default Chat
