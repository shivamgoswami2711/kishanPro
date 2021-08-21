import React, { useState } from 'react'
import firebase from '../../firebase'
import { useStateValue } from "../../Stateprovider"
import 'firebase/auth';
import 'firebase/firestore';
const geofire = require('geofire-common');



let allfiles = []


function FormQuestion() {
    const [files, setFiles] = useState([]);
    const [linkAdd, setLinkAdd] = useState(null)
    const [ClickImg, setClickImg] = useState('');
    const [url, setUrl] = useState("")
    const [question, setQuestion] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [state, dispatch] = useStateValue()
    const removeImg = e => setFiles(files.filter((i, index) => index != e.target.id))
    // firebase 
    const auth = firebase.auth();
    const user = auth.currentUser;

    function uploadImgFile(e) {
        // second time uplode
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setFiles(Object.assign(allfiles, files))
        }
    };
    const enterUrl = e => {
        if (e.key === 'Enter') {
            setLinkAdd(null)
        }
    }
    console.log(question)

    const questionSubmit = () => {
        if (question.length > 251) {
            setErrorMsg("Description is long")
        }
        else if (question.length < 15) {
            setErrorMsg("Description is to short")
        }
        else if (files.length >= 4) {
            setErrorMsg("only max 4 pic upload")
        } else {
            const lat = state.data.city.coord.lat
            const lon = state.data.city.coord.lon
            const hash = geofire.geohashForLocation([lat, lon]);
            setErrorMsg(null)
            dispatch({
                type: "POST",
                data: {
                    uid: user.uid,
                    Geohash: hash,
                    geopoint: [lat, lon],
                    type: "from",
                    url: url,
                    question: question
                },
                files: files
            })
            setQuestion("")
        }
    }


    return (
        <>{errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="AddFormQuestion">
                <div className="formQuestion">
                    <div className="formLinkImg">
                        <label htmlFor="formQuestionImg">
                            <i className="fa fa-camera upload-button"></i>
                        </label>
                        <input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} />
                        <i className="fas fa-link" onClick={() => setLinkAdd("add")}></i>
                    </div>
                    <div className="linkImgContainer">
                        {linkAdd ? (<div><input type="url" onChange={e => setUrl(e.target.value)} onKeyPress={enterUrl} className="inputUrl" placeholder="Enter URL and press Enter key" /></div>) : (<></>)}
                        <div className="showLinkImg">
                            <div className="seedimgGallry">
                                <span className="cencel">X</span>
                                {files.map((file, key) => <div><img onClick={e => setClickImg(e.target.src)} alt='' src={URL.createObjectURL(file)} /><span className="cencelImg" onClick={removeImg} id={key} >X</span></div>)}
                            </div>
                            {ClickImg !== "" ?
                                <div className="popupImg">
                                    <div className="windowImg">
                                        <img onClick={() => setClickImg("")} src={ClickImg} alt='' />
                                    </div>
                                </div> : ""}
                        </div>
                    </div>
                    <div>
                        <h4>ask your question</h4>
                        <textarea type="textarea" value={question} onChange={e => setQuestion(e.target.value)} defaultValue="" rows="2" cols="50" name="question" id="question" ></textarea>
                    </div>
                </div>
                <div className="button formSubmit" onClick={questionSubmit}>Submit</div>
            </div>
        </>
    )
}

export default FormQuestion
