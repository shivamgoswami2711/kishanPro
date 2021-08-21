import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
import Replyshow from './Replyshow';
import { useStateValue } from "../../Stateprovider"
import { makeid, PostTimeCalculate } from '../Module';

function CommentShow({ commentData, DeleteComment }) {
    const [isLoad, setIsLoad] = useState(false)
    const [showReplay, setShowReplay] = useState(false)
    const [addReplay, setAddReplay] = useState(false)
    const [reply, setReply] = useState('')
    const [replyData, setReplyData] = useState([])
    const [updateCom, setUpdateCom] = useState('')
    const [state] = useStateValue()
    const Commedata = typeof commentData === "undefined" ? {
        cid: "", comment: " ", name: "", pic: "", pid: "", time: { seconds: 0, nanoseconds: 0 }, uid: "",
    } : commentData

    const { cid, comment, name, pic, pid, timestamp, uid } = Commedata

    useEffect(() => {
        db.collection("reply").where("cid", "==", cid)
            .onSnapshot((querySnapshot) => {
                const Data = []
                querySnapshot.forEach((doc) => {
                    const reData = doc.data()
                    reData.rid = doc.id
                    Data.push(reData)
                });
                setReplyData(Data)
            })
    }, [replyData])

    const [NewComment, setNewComment] = useState(comment)
    // firebase
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;

    const updateComent = () => {
        console.log(cid)
        if (updateCom.length > 250) {
            alert('only 150 character')
        }
        else if (updateCom.length !== 0) {
            db.collection('comments').doc(cid).update({
                comment: updateCom,
            }).then(() => {
                setIsLoad(false)
                setNewComment(updateCom)
                setUpdateCom('')
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
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
                cid: cid,
                timestamp: new Date().getTime()
            }).then(() => {
                setIsLoad(false)
                setAddReplay(false)
                setReply('')
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }

    }
    const deletePostRemove = (rid) => {
        if (window.confirm('You want to delette ?')) {
            db.collection('reply').doc(rid).delete().catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }
    const UpdateReplyFunC = (rid) => {
        if (updateCom.length > 250) {
            alert('only 150 character')
        }
        else if (updateCom.length !== 0) {
            db.collection('reply').doc(rid).update({
                comment: updateCom,
            }).then(() => {
                setIsLoad(false)
                setNewComment(updateCom)
                setUpdateCom('')
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }
    return (
        <div className='commentContainer'>
            <div className="commentSubContainer">
                <div className="profileCantainer">
                    <div className="PostProfileContainer">
                        <div className="profileCircle"><img src={pic} alt="" /></div>
                        <div><span className="Postdistense">{PostTimeCalculate(timestamp)} </span><h2>{name}</h2></div>
                        <div className="commentTool">
                            <div onClick={() => { setIsLoad(false); addReplay ? setAddReplay(false) : setAddReplay(true) }}>
                                <i className="fas fa-reply"></i>
                            </div>
                            {user.uid === uid ? <div onClick={() => { setAddReplay(false); isLoad ? setIsLoad(false) : setIsLoad(true) }}>
                                <i class="fas fa-pencil-alt"></i>
                            </div> : ""}
                            <div>
                                <i onClick={() => DeleteComment(cid)} className="far fa-trash-alt"></i>
                            </div>
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
                            <div><textarea cols="45" onChange={e => setReply(e.target.value)} onKeyPress={event => event.key === 'Enter' ? addReplayFunc() : ""} className="comment textarea"></textarea></div>
                        </div>
                            <div className='buttonContainer'>
                                <div onClick={()=>addReplayFunc()} className="button">done</div>
                            </div></> :
                        ""}
                </div>
                <div>
                    <div onClick={() => showReplay ? setShowReplay(false) : setShowReplay(true)}>{showReplay ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i>}<span className="unSelectText"> {replyData.length}</span></div>
                    {showReplay ? <div className="replaycontainer">
                        {replyData.map((data) => {
                            return (
                                <div className="textareaContainer">
                                    <div>
                                        <i className="fas fa-reply"></i>
                                    </div>
                                    <div>
                                        <Replyshow replyData={data} deletePostRemove={deletePostRemove} updateComent={UpdateReplyFunC} />
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

