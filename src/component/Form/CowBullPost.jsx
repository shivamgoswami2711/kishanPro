import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from '../../firebase'
import dataBrandAndBreed from '../Data'
import {useStateValue} from "../../Stateprovider" 
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function CowBullPost() {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [ClickImg, setClickImg] = useState('');
    const [breed, setBreed] = useState('')
    const [animalAge, setAnimalAge] = useState(0)
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const animalAgearr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const [state, dispatch] = useStateValue()

    // firebase 
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;
    let allfiles = []

    function uploadImgFile(e) {
        // second time uplode
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setFiles(Object.assign(allfiles, files))
        }
    };
    const animalFromSubmit = () => { 
        if (breed.length === 0) {
            setErrorMsg("breed not selected")
        } else if (EcjectPrice === 0) {
            setErrorMsg("price is enpty")
        } else if (animalAge === 0) {
            setErrorMsg("Aminal Age is enpty")
        } else if (description > 251) {
            setErrorMsg("Description is long")
        } else {
            setErrorMsg(null)
            dispatch({
                type :"POST",
                data:{Uid: user.uid,
                animal: "CowBull",
                breed: breed,
                price: EcjectPrice,
                animalAge: animalAge,
                description: description},
                files: files
            })
        }
    }

    const removeImg = e => setFiles(files.filter((i, index) => index != e.target.id))

    return (
        <form action="">

            {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="cowBullPostContainer">
                <div className="cowBullPostSelect">

                    <div className="formLinkImg"><label htmlFor="formQuestionImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} /></div>
                    <label htmlFor="" className="topLabel">Breed</label><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Breed</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={breed}
                            onChange={event => setBreed(event.target.value)} label="Age">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {dataBrandAndBreed[0].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))}
                            <MenuItem value="Other"><em>Other</em></MenuItem>
                        </Select>
                    </FormControl><br />

                    <div>
                        <label className="topLabel" htmlFor="">Aminal Age</label><br />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={animalAge}
                                onChange={event => setAnimalAge(event.target.value)} label="Age">
                                <MenuItem value=""><em>None</em></MenuItem>
                                {animalAgearr.map(age => (<MenuItem value={age}><em>{age + " year"}</em></MenuItem>))}
                            </Select>
                        </FormControl><br />
                    </div>
                </div>
                <div className="cowBullPostWrite">
                    <div className="linkImgContainer">
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
                    <div className="animalfromLeftSelectionContainer">
                        <div>
                            <label htmlFor="">Price</label>
                            <div><input type="number" onChange={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 10000 ₹" /></div>
                        </div>
                    </div>
                    <h4>Description</h4>
                    <textarea type="textarea" onChange={e => setDescription(e.target.value)} defaultValue="" rows="3" cols="30" name="question" id="question" ></textarea>
                </div>
            </div>
            <div className="button formSubmit" onClick={animalFromSubmit}>Submit</div>
        </form>
    )
}

export default CowBullPost
