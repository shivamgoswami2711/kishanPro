import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from '../../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

// firebase 
const auth = firebase.auth();
const db = firebase.firestore();
const user = auth.currentUser;
let allfiles = []

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Vegetables() {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [linkAdd, setLinkAdd] = useState(null)
    const [ClickImg, setClickImg] = useState('');
    const [url, setUrl] = useState("")
    const [description, setDescription] = useState('')
    const [productName, setProductName] = useState('')
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [weightUnit, setWeightUnit] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const Unit = ["gram", "kilogram", "quintal", "tonne", "ceret"]

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
        <div>
            {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="formQuestion">

                <div className="formLinkImg"><label htmlFor="formQuestionImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} /><i className="fas fa-link" onClick={() => setLinkAdd("add")}></i></div>
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
                <div className="row">
                    <div>
                        <label htmlFor="">Vegetables name</label>
                        <div><input type="number" onClick={e => setProductName(e.target.value)} className="inputUrl " placeholder="Product Name" /></div>
                    </div>
                    <div className="row VegetablesContainer">
                        <div>
                            <label htmlFor="">Price</label>
                            <div><input type="number" onClick={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 100 ₹" /></div>
                        </div>
                        <div className="unit">
                            <label htmlFor="" className="topLabel">unit</label><br />
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">unit</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={weightUnit}
                                    onChange={event => setWeightUnit(event.target.value)} label="Age">
                                    {Unit.map(unit => (<MenuItem value={unit}><em>{unit}</em></MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                </div>
                <h4>Description</h4>
                <textarea type="textarea" onChange={e => setDescription(e.target.value)} defaultValue="" rows="4" cols="50" name="question" id="question" ></textarea>
            </div>
            <div className="button formSubmit" onClick={questionSubmit}>Submit</div>
        </div>
    )
}

export default Vegetables
