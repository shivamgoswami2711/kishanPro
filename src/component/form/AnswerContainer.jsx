import React, { useState, useEffect } from 'react'
import { PostTimeCalculate, makeid } from '../Module'
import Replyshow from '../Post/Replyshow';
import firebase from 'firebase';
import { useStateValue } from '../../Stateprovider';


function AnswerContainer({ data }) {
    const [editAnswer, setEditAnswer] = useState(false);
    const [updateNewAnswer, setUpdateAnswer] = useState('')
    const [replyData, setReplyData] = useState([])
    const [newAnswer, setNewAnswer] = useState(data.answer)
    const [ShowReplyPost, setShowReplyPost] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [replay, setReplay] = useState(false)
    const [replayAnswer, setReplayAnswer] = useState('')
    const [state] = useStateValue()

    const userData = typeof state.useData === 'undefined' ? '' : state.useData;
    // firebase 
    const db = firebase.firestore();
    const auth = firebase.auth();
    const user = auth.currentUser;

    useEffect(() => {
        db.collection("formReplay").where("aid", "==", data.aid)
        .onSnapshot((querySnapshot) => {
            const AnswerReply = []
            querySnapshot.forEach((doc) => {
                const Reply = doc.data()
                Reply.rid = doc.id;
                AnswerReply.push(Reply)
            })
            setReplyData(AnswerReply)
        })
    }, [])
    const PostDelet = () => {
        if (window.confirm('You want to delette ?')) {
            db.collection("formAnswer").doc(data.aid).delete().then(() => {
                alert("Document successfully deleted!");
            }).catch((error) => {
                alert("Error removing document: ", error);
            });
        }
    }

    // update Question 
    const updateAnswer = () => {
        if (updateNewAnswer.length !== 0) {
            db.collection('formAnswer').doc(data.aid).update({
                replay: updateNewAnswer,
            }).then(() => {
                setEditAnswer(false)
                setNewAnswer(updateNewAnswer)
                setErrorMsg(null)
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }
    const uploadReply = () => {
        if (replayAnswer.length !== 0) {
            db.collection('formReplay').doc(makeid()).set({
                name:userData.name,
                pic:userData.profilePic,
                uid: user.uid,
                aid: data.aid,
                comment: replayAnswer,
                timestamp: new Date().getTime(),
            }).then(() => {
                setReplay(false)
                setReplayAnswer('')
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        } else {
            alert("Please enter your replay")
        }
    }
    const deletePostRemove = (rid) => {
        if (window.confirm('You want to delette ?')) {
            db.collection('formReplay').doc(rid).delete().then(() => {
                alert('Delete Success')
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }
    return (
        <>
            {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="formContainer">
                <div className="PostProfileContainer">
                    <div class="profileCircle" ><img src={data.pic} alt="" /></div>
                    <div><span className="Postdistense">{PostTimeCalculate(data.timestamp)}</span><h2>{data.name}</h2></div>
                    {user.uid === data.uid ? <div className="deleteContainer"><i onClick={() => PostDelet()} className="far fa-trash-alt"></i><i onClick={() => editAnswer ? setEditAnswer(false) : setEditAnswer(true)} className="fas fa-pencil-alt"></i></div> : ''}
                </div>
                <div className="editFormQusetionContainer">
                    {editAnswer ? <><textarea cols="56" onChange={e => setUpdateAnswer(e.target.value)} onKeyPress={event => event.key === 'Enter' ? updateAnswer() : ""} className="comment textarea">{newAnswer}</textarea><div className='buttonContainer'>
                        <div onClick={() => updateAnswer()} className="button">done</div></div></> :
                        <div className="formQuestion" ><h4>{newAnswer}</h4></div>
                    }
                </div>
                <div className="FormToolContainer">
                    <div><span>
                    </span></div>
                    <div><i onClick={()=>ShowReplyPost?setShowReplyPost(false):setShowReplyPost(true)} className="far fa-comment-dots"></i> <span> {replyData.length}</span></div>
                    <div><i onClick={() => replay ? setReplay(false) : setReplay(true)} class="fas fa-share"></i></div>
                </div>
                {replay ? <div className="formPostAnswer">
                    <textarea cols="45" onChange={e => setReplayAnswer(e.target.value)} className="comment textarea">{replayAnswer}</textarea><div className='buttonContainer'>
                        <div onClick={() => uploadReply()} className="button">done</div></div>
                </div> : ""}
                {ShowReplyPost?<div className="Reaplyconainer">
                    {replyData.map((reply) => {
                        return (
                            <div className="textareaContainer">
                            <div>
                                <i className="fas fa-reply"></i>
                            </div>
                            <div>
                                <Replyshow replyData={reply} deletePostRemove={deletePostRemove} />
                            </div>
                        </div>
                        )
                    })}
                </div>:""}
            </div>
        </>
    )
}

export default AnswerContainer
