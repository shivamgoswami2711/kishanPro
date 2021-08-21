import React, { useState } from 'react'
import firebase from 'firebase';
import { PostTimeCalculate,ProfileCantainer } from '../Module'


function Replyshow({ replyData, deletePostRemove, updateComent }) {
    const [editPost, setEditPost] = useState(false)
    const [updateCom, setUpdateCom] = useState('')

    // firebase
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;

    const { comment, uid, name, pic, cid, timestamp, rid } = replyData
    const [NewComment, setNewComment] = useState(comment)

    return (
        <div className='commentContainer'>
            <div className="commentSubContainer reply">
                <div className="profileCantainer">
                    <ProfileCantainer
                        pic={replyData.pic}
                        name={name} uid={uid}
                        PostDelet={deletePostRemove}
                        Edit={editPost}
                        setEdit={setEditPost}
                        time={timestamp}
                        DeleteId={rid}
                    />
                    <div>
                        {editPost ?
                            <><textarea cols="45" onChange={e => setUpdateCom(e.target.value)} className="comment textarea">{NewComment}</textarea><div className='buttonContainer'>
                                <div onClick={updateComent(rid)} className="button">done</div></div></> :
                            <div className="comment">{NewComment}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Replyshow
