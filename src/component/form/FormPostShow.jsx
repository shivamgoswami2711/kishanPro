import React, { useState, useEffect, memo } from 'react'
import Carousel from "../Carousel"
import firebase from 'firebase';
import { makeid, PostTimeCalculate,ProfileCantainer} from '../Module';

function FormPostShow({ data, func }) {
    const [like, setLike] = useState(false)
    const [replay, setReplay] = useState(false)
    const [answer, setAnswer] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [EditQuestion, setEditQuestion] = useState(false)
    const [upDateQuestion, setUpDateQuestion] = useState("")
    const [newQusetion, setNewQusetion] = useState(data.question)
    const [ansCount, setAnsCount] = useState(0)
    const [userData, setUserData] = useState({})
    const [postRealTimeData, setPostRealTimeData] = useState({})
    const [image, setImage] = useState({})

    // firebase 
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()
    const user = auth.currentUser;

    useEffect(() => {
        setImage(
            data.img.map((img, index) => ({
                id: index,
                url: img
            })))
    }, [data])

    db.collection("formAnswer").where("qid", "==", data.qid)
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs;
            setAnsCount(doc.length)
        })

    console.log(data)
    console.log(data.question)

    useEffect(() => {
        setLike(data.likes.indexOf(user.uid))
        db.collection("user").doc(data.uid).get().then(doc => setUserData(doc.data()))
    }, [])
    //  like count data 
    const likeCount = typeof postRealTimeData.likes !== 'undefined' ? postRealTimeData.likes : typeof data.likes === 'undefined' ? [] : data.likes

    const LikeUpdate = async () => {

        await db.collection("from").doc(data.qid).onSnapshot(querySnapshot => {
            setPostRealTimeData(querySnapshot.data())
            like ? setLike(false) : setLike(true)
        })
        if (like) {
            db.collection("from").doc(data.qid).update({ likes: firebase.firestore.FieldValue.arrayUnion(user.uid) })
        }
        else {
            db.collection("from").doc(data.qid).update({ likes: firebase.firestore.FieldValue.arrayRemove(user.uid) })
        }
    }

    function updateComent() {
        const Postid = makeid()
        db.collection('formAnswer').doc(Postid).set({
            Uid: user.uid,
            pic: userData.profilePic,
            name: userData.name,
            qid: data.qid,
            answer: answer,
            timestamp: new Date().getTime()
        })
            .then(() => {
                setReplay(false)
                setAnswer("")

            }).catch((error) => {
                alert(error.code)
                console.log(error.message);
            });
    }

    const PostDelet = (pid) => {
        if (window.confirm('You want to delette ?')) {
            db.collection("from").doc(data.qid).delete().then(() => {
                db.collection("formAnswer").where("qid", "==", data.qid)
                    .get().then(doc => {
                        doc.docs.map(item => {
                            db.collection("formAnswer").doc(item.id).delete()
                        })
                    })
                data.img.map(img => {
                    storage.refFromURL(img).delete()
                })
                alert("Document successfully deleted!");
            }).catch((error) => {
                alert("Error removing document: ", error);
            });
        }
    }
    const updateQuestion = () => {
        console.log(data.qid)
        if (upDateQuestion.length > 251) {
            setErrorMsg("Description is long only 150 character")
        }
        else if (upDateQuestion.length < 15) {
            setErrorMsg("Description is to short")
        }
        else if (upDateQuestion.length !== 0) {
            db.collection('from').doc(data.qid).update({
                question: upDateQuestion,
            }).then(() => {
                setEditQuestion(false)
                setNewQusetion(upDateQuestion)
                setUpDateQuestion("")
            }).catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }

    return (
        <>{errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="formContainer">
            <ProfileCantainer pic={userData.profilePic} name={userData.name} uid={data.uid} PostDelet={PostDelet} Edit={EditQuestion} setEdit={setEditQuestion} time={data.timestamp}/>
                <div className="Formlink"><a href={data.url} target="_blank">{data.url}</a></div>
                <div className="editFormQusetionContainer">
                    {EditQuestion ? <><textarea cols="56" onChange={e => setUpDateQuestion(e.target.value)} onKeyPress={event => event.key === 'Enter' ? updateQuestion() : ""} className="comment textarea">{newQusetion}</textarea><div className='buttonContainer'>
                        <div onClick={updateQuestion} className="button">done</div></div></> :
                        <div className="formQuestion" ><h4>{newQusetion}</h4></div>
                    }
                </div>


                <div className="formImgShow">
                    <div className="carouselBlock">
                        {Object.keys(image).length !== 0 ? <Carousel images={image} /> : ""}
                    </div>
                </div>
                <div className="FormToolContainer">
                    <div onClick={() => LikeUpdate()}>{like ? (<i className="far fa-heart"></i>) : (<i className="fas fa-heart"></i>)} <span className="unSelectText">
                        {typeof likeCount === "undefined" ? "" : likeCount.length}
                    </span></div>
                    <div onClick={() => {
                        func({
                            qid: data.qid,
                            formPost: data
                        })
                    }}><i className="far fa-comment-dots"></i><span className="unSelectText"> {ansCount}</span></div>
                    <div onClick={() => replay ? setReplay(false) : setReplay(true)}><i class="fas fa-share"></i></div>
                </div>
                {replay ? <div className="formPostAnswer">
                    <textarea cols="45" onChange={e => setAnswer(e.target.value)} className="comment textarea">{answer}</textarea><div className='buttonContainer'>
                        <div onClick={updateComent} className="button">done</div></div>
                </div> : ""}
            </div>
        </>
    )
}

export default memo(FormPostShow)
