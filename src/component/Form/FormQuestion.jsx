import React, { useState } from 'react'
import firebase from '../../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

// firebase 
const auth = firebase.auth();
const db = firebase.firestore();
const user = auth.currentUser;
let allfiles = []


function FormQuestion() {
    const [files, setFiles] = useState([]);
    const [linkAdd, setLinkAdd] = useState(null)
    const [ClickImg, setClickImg] = useState('');
    const [url, setUrl] = useState("")
    const [question, setQuestion] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    const removeImg = e => setFiles(files.filter((i, index) => index != e.target.id))

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
    const questionSubmit = () => { }

    return (
        <>
        {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="formQuestion">
                <div className="formLinkImg">
                    <label htmlFor="formQuestionImg">
                        <i className="fa fa-camera upload-button"></i>
                    </label>
                    <input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} />
                    <i className="fas fa-link" onClick={() => setLinkAdd("add")}></i>
                </div>
                <div className="linkImgContainer">
                    {linkAdd ? (<div><input type="url" onClick={e => setUrl(e.target.value)} onKeyPress={enterUrl} className="inputUrl" placeholder="Enter URL and press Enter key" /></div>) : (<></>)}
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
                <h4>ask your question </h4>
                <textarea type="textarea" onChange={e => setQuestion(e.target.value)} defaultValue="" rows="2" cols="50" name="question" id="question" ></textarea>
            </div>
            <div className="button formSubmit" onClick={questionSubmit}>Submit</div>
        </>
    )
}

export default FormQuestion
