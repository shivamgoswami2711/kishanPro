import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import dataBrandAndBreed from '../Data'
import { useStateValue } from "../../Stateprovider"
import firebase from '../../firebase'
import 'firebase/auth';
const geofire = require('geofire-common');
// firebase 
const auth = firebase.auth();
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

function Tector() {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [linkAdd, setLinkAdd] = useState(null)
    const [ClickImg, setClickImg] = useState('');
    const [url, setUrl] = useState("")
    const [tacterPower, setTacterPower] = useState('')
    const [tractorsBrand, setTractorsBrand] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [state, dispatch] = useStateValue()

    const questionSubmit = () => {
        if (tractorsBrand.length === 0) {
            setErrorMsg("enter brand name")
        } else if (tacterPower === 0) {
            setErrorMsg("places enter horse power")
        } else if (price === 0) {
            setErrorMsg("price is enpty")
        } else if (description > 251) {
            setErrorMsg("Description is long")
        } else {
            const lat = state.data.coord.lat
            const lon = state.data.coord.lon
            const hash = geofire.geohashForLocation([lat,lon]);
            setErrorMsg(null)
            dispatch({
                type: "POST",
                data: {
                    'Uid': user.uid,
                    Geohash: hash,
                    geopoint: [lat,lon],
                    equipment:"tector",
                    brand: tractorsBrand,
                    price: price,
                    description: description,
                    url: url
                },
                files: files
            })
        }
    }

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
                </div><div className="row">
                    <div>
                        <label htmlFor="" className="topLabel">tractors</label><br />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">tacter</InputLabel>
                            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={tractorsBrand}
                                onChange={event => setTractorsBrand(event.target.value)} label="Age">
                                <MenuItem value=""><em>None</em></MenuItem>
                                {dataBrandAndBreed[4].map(tacter => (<MenuItem value={tacter}><em>{tacter}</em></MenuItem>))}
                                <MenuItem value="Other"><em>Other</em></MenuItem>
                            </Select>
                        </FormControl><br />
                    </div>
                    <div>
                        <div className="row VegetablesContainer">
                            <div>
                                <label htmlFor="">Price</label>
                                <div><input type="number" onChange={e => setPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 250000 ₹" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="">horse power</label><br />
                    <input type="number" onChange={e => setTacterPower(e.target.value)} className="inputUrl" placeholder="Ex. 25 HP" />
                </div>
                <h4>Description</h4>
                <textarea type="textarea" onChange={e => setDescription(e.target.value)} defaultValue="" rows="4" cols="50" name="question" id="question" ></textarea>
            </div>
            <div className="button formSubmit" onClick={questionSubmit}>Submit</div>
        </div>
    )
}

export default Tector
