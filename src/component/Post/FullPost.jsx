import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Leftheader from '../Leftheader'
import { useStateValue } from "../../Stateprovider"
import Carousel from '../Carousel'
import firebase from 'firebase';
import 'firebase/auth';
import CommentShow from './CommentShow'

function FullPost() {
    const [state] = useStateValue()
    const [images, setImages] = useState([])
    const [commentData, setCommentData] = useState([])
    const userData = typeof state.useData === "undefined" ? {} : state.useData
    const PostId = typeof state.PostId === "undefined" ? '' : state.PostId

    // firebase
    const db = firebase.firestore();


    useEffect(() => {
        db.collection("comments").orderBy("timestamp","desc").limit(15)
        .where("pid", "==", PostId)
        .onSnapshot((querySnapshot) => {
            const commentList = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                data.cid = doc.id
                commentList.push(data)
            })
            setCommentData([])
            setCommentData(commentList)
        })
        // set img data
        setImages(
            state.Post.img.map((img, index) => ({
                id: index,
                url: img
            }))
        );
    }, [state.PostId])

    // delete comment
    const DeleteComment = (cid) => {
        if (window.confirm('You want to delette ?')) {
            db.collection('comments').doc(cid).delete().catch((error) => {
                alert(error.code)
                console.log(error)
            })
        }
    }

    return (
        <div>
            fullPost
            <Header/>
            <Leftheader />
            <div className="postContainer fullPost">
                <div className="PostProfileContainer top">
                    <div className="profileCircle">
                        <img src={userData.profilePic} alt="" />
                    </div>
                    <div className="CommentName">
                        {userData.name}
                    </div></div>
                <div className="fullPostContainer">

                    <div className="PostMainContainer carouselBlock">
                        <Carousel images={images} />
                    </div>
                    <div className="detaileContainer">
                        <div className="detaile">
                            <div className="fullPostName"><h2>{state.Post.animal}</h2></div>
                            <div className='fullPostPrice price'><label htmlFor="price">price</label> {state.Post.price}</div>
                            <div className="fullPostAge" ><label htmlFor="age">age</label> {state.Post.animalAge} year</div>
                            <div>
                                <div className="fullPostBreed Postbreed"><label htmlFor="Breed">Breed</label> <span className="breedName">{state.Post.breed}</span></div>
                                <div className="fullPostDiscription postDiscription">
                                    {state.Post.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {commentData.map((commentData) => (<CommentShow commentData={commentData} DeleteComment={DeleteComment} />))}
            </div>
        </div>
    )
}

export default FullPost



