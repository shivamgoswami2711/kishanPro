import React, { useState } from 'react'
import firebase from 'firebase';
import Replyshow from './Replyshow';
import { useStateValue } from "../../Stateprovider"

function CommentShow({ commentData }) {
    const [isLoad, setIsLoad] = useState(false)
    const [showReplay, setShowReplay] = useState(false)
    const [addReplay, setAddReplay] = useState(false)
    const [reply, setReply] = useState('')
    const [replyData, setReplyData] = useState([])
    const [updateCom, setUpdateCom] = useState('')
    const [state] = useStateValue()
    const Commedata = commentData === undefined ? {
        Cid: "",
        comment: " ",
        name: "",
        pic: "",
        pid: "",
        time: { seconds: 0, nanoseconds: 0 },
        uid: "",
    } : commentData

    const { Cid, comment, name, pic, pid, time, uid } = Commedata

    const [NewComment, setNewComment] = useState(comment)
    // firebase
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;


    const updateComent = () => {
        if (updateCom.length > 250) {
            alert('only 150 character')
        }
        else if (updateCom.length !== 0) {
            db.collection('comments').doc(Cid).update({
                comment: updateCom,
            }).then(() => {
                setIsLoad(false)
                setNewComment(updateCom)
                setUpdateCom('')
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const replyCommentShow = () => {
        const Data = []
        showReplay ? setShowReplay(false) : setShowReplay(true)
        if (showReplay === true) {
            db.collection("reply").where("cid", "==", Cid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const reData = doc.data()
                        reData.rid = doc.id
                        Data.push(reData)
                    });
                    setReplyData(Data)
                })
        }

    }

    // create docName

    function makeid() {
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

    const addReplayFunc = () => {
        if (reply.length > 250) {
            alert('only 150 character')
        }
        else if (reply.length !== 0) {
            db.collection('reply').doc(makeid()).set({
                comment: reply,
                uid: user.uid,
                name: state.useData.name,
                pic: state.useData.profilePic,
                cid: Cid,
                time: new Date()
            }).then(() => {
                setIsLoad(false)
                setAddReplay(false)
                setReply('')
            }).catch((error) => {
                alert(error.massage)
                console.log(error)
            })
        }

    }
    return (
        <div className='commentContainer'>
            <div className="commentSubContainer">
                <div className="profileCantainer">
                    <div className="PostProfileContainer">
                        <div className="profileCircle">
                            <img src={pic} alt="" />
                        </div>
                        <div className="CommentName">
                            {name}
                        </div>
                        <div className="commentTool">
                            <div onClick={() => { setIsLoad(false); addReplay ? setAddReplay(false) : setAddReplay(true) }}>
                                <i className="fas fa-reply"></i>
                            </div>
                            {user.uid === uid ? <div onClick={() => { setAddReplay(false); isLoad ? setIsLoad(false) : setIsLoad(true) }}>
                                <i class="fas fa-pencil-alt"></i>
                            </div> : ""}
                        </div>
                    </div>
                </div>
                <div>
                    {isLoad ?
                        <><textarea cols="56" onChange={e => setUpdateCom(e.target.value)} onKeyPress={event => event.key === 'Enter' ? updateComent() : ""} className="comment textarea">{NewComment}</textarea><div className='buttonContainer'>
                            <div onClick={updateComent} className="button">done</div></div></> :
                        <div className="comment">{NewComment}</div>}
                </div>
                <div className="replayAddContainer">
                    {addReplay ?
                        <><div className="textareaContainer">
                            <div><i className="fas fa-reply"></i></div>
                            <div><textarea cols="45" onChange={e => setReply(e.target.value)} onKeyPress={event => event.key === 'Enter' ? updateComent() : ""} className="comment textarea"></textarea></div>
                        </div>
                            <div className='buttonContainer'>
                                <div onClick={addReplayFunc} className="button">done</div>
                            </div></> :
                        ""}
                </div>
                <div>
                    <div onClick={replyCommentShow}>{showReplay ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i>}</div>
                    {showReplay ? <div className="replaycontainer">
                        {replyData.map(data => {
                            return (
                                <div className="textareaContainer">
                                    <div>
                                        <i className="fas fa-reply"></i>
                                    </div>
                                    <div>
                                        <Replyshow replyData={data} />
                                    </div>
                                </div>
                            )
                        })}
                    </div> : ""}
                </div>
            </div>
        </div>
    )
}

export default CommentShow

