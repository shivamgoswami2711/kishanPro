import React, { useState, useEffect } from 'react'
import WeatherComponent from '../WeatherComponent';
import FormPostShow from './FormPostShow';
import { useStateValue } from '../../Stateprovider';
import { useHistory } from "react-router-dom";
import FormQuestion from '../fromComponent/FormQuestion';
// firebase
import firebase from '../../firebase'

function FormHome() {
    const [postList, setPostList] = useState([])
    const [state, dispatch] = useStateValue()
    const history = useHistory();
    // const auth = firebase.auth();
    const db = firebase.firestore();

    useEffect(() => {
        db.collection("from").orderBy("timestamp","desc").limit(15)
            .onSnapshot((querySnapshot) => {
                var post = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    data.qid = doc.id
                    post.push(data)
                })
                setPostList(post)
            })
    }, [])


    // firebase 
    const Callback = (data) => {
        const formPost = data.formPost

        dispatch({
            type: "formAnswer",
            qid: data.qid,
            formPost
        })
        history.push("/formAnswer")
    }

    return (
        <div className="postContainer">
            <WeatherComponent />
            <div className="HomeFormContainer">
                <div className="FormPostContainer">
                    <FormQuestion />
                </div>

                {console.log(postList)}
                {postList.map(post => {
                    return (<FormPostShow data={post} func={Callback} />)
                })}
            </div>
        </div>
    )
}

export default FormHome
