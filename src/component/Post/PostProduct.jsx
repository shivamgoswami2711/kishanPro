import React, { useState, useEffect } from 'react'
import ImageCarousel from "../Carousel";
import { useHistory} from "react-router-dom";
import ImageData from '../asset/Index';
import { useStateValue } from "../../Stateprovider"
import "../../style/carousel.css";
import firebase from 'firebase';
import { makeid, PostTimeCalculate} from '../Module';
import 'firebase/auth';

function PostProduct({ data }) {
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState('')
    const [userData, setUserData] = useState('')
    const [postRealTimeData, setPostRealTimeData] = useState({})
    const [images, setImages] = useState([])
    const [commentData, setCommentData] = useState([])
    const [state, dispatch] = useStateValue()
    const LogingUserData = typeof state.useData === 'undefined' ? '' : state.useData;

    const history = useHistory();

    // firebase 
    const db = firebase.firestore();
    const auth = firebase.auth();
    const user = auth.currentUser;

    //  cleck like button then run
    useEffect(async () => {
        await db.collection(data.collection).doc(data.pid).onSnapshot(querySnapshot => {
            setPostRealTimeData(querySnapshot.data())
        })
        if (like) {
            db.collection(data.collection).doc(data.pid).update({ likes: firebase.firestore.FieldValue.arrayUnion(user.uid) })
        }
        else {
            db.collection(data.collection).doc(data.pid).update({ likes: firebase.firestore.FieldValue.arrayRemove(user.uid) })
        }


    }, [like])

    //  data change then run 
    useEffect(async () => {
        // get user persnal
        const docRefInfo = db.collection("user").doc(data.uid);
        await docRefInfo.get().then(doc => {
            setUserData(doc.data())
        }).catch(error => {
            alert(error.code)
            console.log(error.message);
        });
        // set img data
        setImages(
            data.img.map((img, index) => ({
                id: index,
                url: img
            }))
        );
        setLike(data.likes.indexOf(user.uid))
    }, [data])

    useEffect(() => {
        getCommentData()
    }, [])


    //  like count data 
    const likeCount = typeof postRealTimeData.likes !== 'undefined' ? postRealTimeData.likes : data.likes

    // add data to commentData

    const postComment = () => {
        if (comment.length > 250) {
            alert('only 150 character')
        }
        else if (comment.length === 0) {
            console.log("coment fild is empty")
        } else {
            db.collection('comments').doc(makeid()).set({
                uid: user.uid,
                pid: data.pid,
                comment: comment,
                name: LogingUserData.name,
                pic: LogingUserData.profilePic,
                timestamp: new Date().getTime()
            }).then(e => {
                console.log("comment add")
                setComment('')
            })
                .catch(error => {
                    alert(error.code)
                    console.log(error.message);
                });
        }
    }


    const getCommentData = () => {
        let commentsList = [];
        db.collection("comments").where("pid", "==", data.pid).onSnapshot((querySnapshot) => {
            commentsList = []
            querySnapshot.forEach((doc) => {
                const Comid = doc.data()
                Comid.cid = doc.id;
                commentsList.push(Comid)
            })
            setCommentData(commentsList)
        });
        return commentsList
    }
    const commentClick = () => {
        dispatch({
            type: "comment",
            post: data,
            PostId: commentData[0].pid
        })
        history.push("/post/" + data.pid)
    }

    return (
        <>
            <div className="PostMainContainer">
                <div className="PostProfileContainer">
                    <div className="profileCircle"><img src={userData.profilePic ? userData.profilePic : ImageData.profile} alt="" /></div>
                    <div><span className="Postdistense">chand({parseInt(data.distance) === 0 ? 'nearby' : data.distance + 'km'}) </span><h2>{userData.name}</h2></div>
                </div>
                <div className="carouselContainer">
                    <div onDoubleClick={commentClick} className="carouselBlock">
                        <ImageCarousel images={images} /> 
                    </div>
                    <div>
                        <div>
                            <span className="postTimeShow">{PostTimeCalculate(postRealTimeData.timestamp)}</span>
                            <h2>{postRealTimeData.animal}</h2></div>
                        <div className='price'><label htmlFor="price">price</label> {postRealTimeData.price}</div>
                        <div><label htmlFor="age">age</label> {postRealTimeData.animalAge} year</div>
                    </div>
                </div>
                <div>
                    <div className="Postbreed"><label htmlFor="Breed">Breed</label> <span className="breedName">{postRealTimeData.breed}</span></div>
                    <div className="postDiscription">
                        {postRealTimeData.description}
                    </div>
                </div>
                <div className="likeContainer">
                    <div onClick={() => like ? setLike(false) : setLike(true)}>{like ? (<i className="fas fa-heart"></i>) : (<i className="far fa-heart"></i>)}
                        <span> {likeCount.length}</span>
                    </div>
                    <div onClick={commentClick}>
                        <i className="far fa-comment-dots"></i><span> {commentData.length}</span>
                    </div>
                    <div className="commentComtainer">
                        <div>
                            <input type="text" onChange={e => setComment(e.target.value)} onKeyPress={event => event.key === 'Enter' ? postComment() : ""} value={comment} placeholder="comment" />
                        </div>
                        <div>
                            <i onClick={postComment} className="fas fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostProduct


