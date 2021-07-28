import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Leftheader from '../Leftheader'
import { useStateValue } from "../../Stateprovider"
import Carousel from '../Post/Carousel'
import firebase from 'firebase';
import 'firebase/auth';
import CommentShow from './CommentShow'

function FullPost() {
    const [state] = useStateValue()
    const [images, setImages] = useState([])

    // firebase
    const db = firebase.firestore();


    useEffect(() => {
        // set img data
        setImages(
            state.Post.img.map((img, index) => ({
                id: index,
                url: img
            }))
        );
    }, [])


    return (
        <div>
            <Header />
            <Leftheader />
            <div className="postContainer fullPost">
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
                {state.Comment.map((commentData) => {
                    return (
                    <CommentShow commentData={commentData} />
                    )
                })}
            </div>
        </div>
    )
}

export default FullPost



