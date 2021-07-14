import React, { useState } from 'react'
import firebase from '../../firebase'
import { useStateValue } from "../../Stateprovider"
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

// firebase 
const auth = firebase.auth();
const user = auth.currentUser;
let allfiles = []


function Equipment() {
    const [files, setFiles] = useState([]);
    const [linkAdd, setLinkAdd] = useState(null)
    const [ClickImg, setClickImg] = useState('');
    const [url, setUrl] = useState("")
    const [description, setDescription] = useState('')
    const [productName, setProductName] = useState('')
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null)
    const [state, dispatch] = useStateValue()

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
    const SubmitForm = () => {
        if (EcjectPrice === 0) {
            setErrorMsg("price is enpty")
        } else if (description > 251) {
            setErrorMsg("Description is long")
        } else {
            setErrorMsg(null)
            dispatch({
                type: "POST",
                data: {
                    Uid: user.uid,
                    Product: "equipment",
                    product: productName,
                    price: EcjectPrice,
                    description: description
                },
                files: files
            })
        }
    }
    return (
        <div>
            {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="formQuestion">
                <div className="formLinkImg"><label htmlFor="formQuestionImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} /><i className="fas fa-link" onClick={() => setLinkAdd("add")}></i></div>
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
                <div className="row equipment">
                    <div>
                        <label htmlFor="">equipment</label>
                        <div><input type="text" onChange={e => setProductName(e.target.value)} className="inputUrl " placeholder="Product Name" /></div>
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <div><input type="number" onChange={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 10000 ₹" /></div>
                    </div>
                </div>
                <h4>Description</h4>
                <textarea type="textarea" onChange={e => setDescription(e.target.value)} defaultValue="" rows="4" cols="50" name="question" id="question" ></textarea>
            </div>
            <div className="button formSubmit" onClick={SubmitForm}>Submit</div>
        </div>
    )
}

export default Equipment
