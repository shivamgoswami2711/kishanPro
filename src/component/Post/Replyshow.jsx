import React,{useState} from 'react'
import firebase from 'firebase';

function Replyshow({ replyData }) {
    const [isLoad, setIsLoad] = useState(false)
    const [updateCom, setUpdateCom] = useState('')

    // firebase
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;

    console.log(replyData)
    const { comment, uid, name, pic, cid, time } = replyData

    const updateComent =()=>{
    }
    return (
        <div className='commentContainer'>
            <div className="commentSubContainer reply">
                <div className="profileCantainer">
                    <div className="PostProfileContainer">
                        <div className="profileCircle">
                            <img src={pic} alt="" />
                        </div>
                        <div className="CommentName">
                            {name}
                        </div>
                        <div className="commentTool">
                            {user.uid === uid ? <div onClick={() => isLoad ? setIsLoad(false) : setIsLoad(true) }>
                                <i class="fas fa-pencil-alt"></i>
                            </div> : ""}
                        </div>
                    </div>
                    <div>
                    {isLoad ?
                        <><textarea cols="45" onChange={e => setUpdateCom(e.target.value)}  className="comment textarea">{comment}</textarea><div className='buttonContainer'>
                            <div onClick={updateComent} className="button">done</div></div></> :
                        <div className="comment">{comment}</div>}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Replyshow
