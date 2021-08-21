import React from 'react'
import WeatherComponent from '../WeatherComponent'
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useStateValue } from '../../Stateprovider';
import { makeid, PostTimeCalculate } from "../Module"
import { useHistory } from "react-router-dom";
import AnswerShow from './AnswerContainer';
import Carousel from '../Carousel';

function FormAnswer() {
    const [answer, setAnswer] = useState('')
    const [answerData, setAnswerData] = useState([])
    const [userFormData, setUserFormData] = useState('')
    const [editQuestion, setEditQuestion] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [upDateQuestion, setUpDateQuestion] = useState('')
    const [state] = useStateValue()
    const history = useHistory();

    // firebse
    const db = firebase.firestore();
    const storage = firebase.storage()
    const auth = firebase.auth();
    const user = typeof auth.currentUser === null ? "" : auth.currentUser;
    const userData = state.useData
    const qid = typeof state.qid === "undefined" ? "" : state.qid
    const postData = typeof state.formPost === "undefined" ? "" : state.formPost
    const [newQusetion, setNewQusetion] = useState(postData.question)

    // add answer 
    const postComment = () => {
        db.collection('formAnswer').doc(makeid()).set({
            Uid: user.uid,
            pic: userData.profilePic,
            name: userData.name,
            qid: state.qid,
            answer: answer,
            timestamp: new Date().getTime()
        })
            .then(() => {
                setAnswer("")
            }).catch((error) => {
                alert(error.code)
                console.log(error.message);
            });
    }
    // post answer data
    useEffect(() => {
        db.collection("formAnswer").where("qid", "==", qid).orderBy("timestamp","desc")
            .onSnapshot((querySnapshot) => {
                const answerLIst = []
                querySnapshot.forEach((doc) => {
                    const Ansid = doc.data()
                    Ansid.aid = doc.id;
                    answerLIst.push(Ansid)
                })
                setAnswerData(answerLIst)
            });
        db.collection("user").doc(postData.uid).get().then(doc => setUserFormData(doc.data()))
    }, [])

    // delete Qusetion
    const PostDelet = () => {
        if (window.confirm('You want to delette ?')) {
            db.collection("from").doc(qid).delete().then(() => {
                db.collection("formAnswer").where("qid", "==", qid)
                    .get().then(doc => {
                        doc.docs.map(item => {
                            db.collection("formAnswer").doc(item.id).delete()
                        })
                    })
                postData.img.map(img => {
                    storage.refFromURL(img).delete()
                })
                history.push("/form")
                alert("Document successfully deleted!");

            }).catch((error) => {
                alert("Error removing document: ", error);
            });
        }
    }
    // update Question 
    const updateQuestion = () => {
        if (upDateQuestion.length > 251) {
            setErrorMsg("Description is long only 150 character")
        }
        else if (upDateQuestion.length < 15) {
            setErrorMsg("Description is to short")
        }
        else if (upDateQuestion.length !== 0) {
            db.collection('from').doc(qid).update({
                question: upDateQuestion,
            }).then(() => {
                setEditQuestion(false)
                setNewQusetion(upDateQuestion)
                setUpDateQuestion("")
                setErrorMsg(null)
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }
    return (
        <>{errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
        <div className="postContainer">
            <WeatherComponent />
            <div className="HomeFormContainer">
                <div className="formContainer">
                    <div className="PostProfileContainer">
                        <div className="profileCircle"><img src={userFormData.profilePic} alt="" /></div>
                        <div><span className="Postdistense"> {PostTimeCalculate(postData.timestamp)}</span><h2>{userFormData.name}</h2></div>
                        {user.uid === postData.uid ? <div className="deleteContainer"><i onClick={() => PostDelet()} className="far fa-trash-alt"></i>
                        <i onClick={() => editQuestion ? setEditQuestion(false) : setEditQuestion(true)} className="fas fa-pencil-alt"></i></div> : ''}
                    </div>
                    <div className="editFormQusetionContainer">
                        {editQuestion ? <><textarea cols="56" onChange={e => setUpDateQuestion(e.target.value)} onKeyPress={event => event.key === 'Enter' ? updateQuestion() : ""} className="comment textarea">{newQusetion}</textarea><div className='buttonContainer'>
                            <div onClick={updateQuestion} className="button">done</div></div></> :
                            <div className="formQuestion" ><h4>{newQusetion}</h4></div>
                        }
                    </div>
                    <div className="formImgShow">
                        {false ? <Carousel /> : ""}
                    </div>
                </div>
                <div className="formContainer">
                    <div className="HomeFormContainer">
                        <div className="AnswerContainer">
                            <div className="ansDiv">
                                <textarea cols="65" value={answer} placeholder="Enter your Answer" onChange={e => setAnswer(e.target.value)} className="ansTextarea textarea"></textarea>
                            </div>
                            <div>
                                <i onClick={postComment} className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {answerData.map(post => {
                    return (<AnswerShow data={post} />)
                })}
            </div>
        </div>
        </>
    )
}

export default FormAnswer
