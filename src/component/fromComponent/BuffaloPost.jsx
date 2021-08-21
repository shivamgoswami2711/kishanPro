import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from '../../firebase'
import dataBrandAndBreed from '../Data'
import { useStateValue } from "../../Stateprovider"
import 'firebase/auth';
import 'firebase/firestore';

const geofire = require('geofire-common');


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function CowForm1() {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [ClickImg, setClickImg] = useState('');
    const [breed, setBreed] = useState('')
    const [animalAge, setAnimalAge] = useState(0)
    const [calfNumber, setCalfNumber] = useState('')
    const [pregnancy, setPregnancy] = useState(0)
    const [byaath, setByaath] = useState('')
    const [milkCpacity, setMilkCpacity] = useState(0)
    const [produceMilk, setProduceMilk] = useState(0)
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const animalAgearr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const pregnancyMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const numberOfCalves = ["no", "bull calf", "heifer calf/calf"]
    const [state, dispatch] = useStateValue()


    // firebase 
    const auth = firebase.auth();
    const user = auth.currentUser;
    let allfiles = []

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
    const animalFromSubmit = () => {
        if (breed.length === 0) {
            setErrorMsg("breed not selected")
        } else if (byaath === 0) {
            setErrorMsg("how many times did you have children? value not selected")
        } else if (produceMilk > 50) {
            setErrorMsg("produce milk very high number")
        } else if (milkCpacity === 0) {
            setErrorMsg("milk capacity is empty")
        } else if (milkCpacity >= 50) {
            setErrorMsg("milk capacity very high number")
        } else if (EcjectPrice === 0) {
            setErrorMsg("price is enpty")
        } else if (animalAge === 0) {
            setErrorMsg("Select animal age")
        } else if (calfNumber === 0) {
            setErrorMsg("select calf detile")
        } else if (pregnancy === 0) {
            setErrorMsg("select pregnancy detile")
        } else if (description > 251) {
            setErrorMsg("Description is long")
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
                    animal: "Buffalo",
                    type: "animal",
                    breed: breed,
                    byaath: byaath,
                    produceMilk: produceMilk,
                    milkCpacity: milkCpacity,
                    price: EcjectPrice,
                    animalAge: animalAge,
                    calf: calfNumber,
                    pregnancy: pregnancy,
                    description: description
                },
                files: files
            })
        }
    }

    return (
        <form action="">

            {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="cowBullPostContainer">
                <div className="cowBullPostSelect">

                    <div className="formLinkImg"><label for="formQuestionImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="formQuestionImg" accept="image/*" multiple onChange={uploadImgFile} /></div>
                    <label htmlFor="" className="topLabel">Breed</label><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Breed</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={breed}
                            onChange={event => setBreed(event.target.value)} label="Age">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {dataBrandAndBreed[1].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))}
                            <MenuItem value="Other"><em>Other</em></MenuItem>
                        </Select>
                    </FormControl><br />
                    <label htmlFor="childrenBirth" className="cl">how many times did you have children?</label><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Number</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={byaath}
                            onChange={event => setByaath(event.target.value)} label="childrenBirth">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {animalAgearr.map(Num => (<MenuItem value={Num}><em>{Num}</em></MenuItem>))}
                        </Select>
                    </FormControl><br />

                    <label htmlFor="">how much milk does it give</label>
                    <div><input type="number" onChange={e => setProduceMilk(e.target.value)} className="inputUrl milk" placeholder="produce milk" /></div>
                    <label htmlFor="">milk capacity</label>
                    <div><input type="number" onChange={e => setMilkCpacity(e.target.value)} className="inputUrl milkCapacity" placeholder="milk capacity" /></div>
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
                    <div className="animalPricecontainer">
                        <div>
                            <label htmlFor="">Price</label>
                            <div><input type="number" onChange={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 10000 ₹" /></div>
                        </div>
                        <div>
                            <label className="topLabel" htmlFor="">calfs</label><br />
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">calf</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={calfNumber}
                                    onChange={event => setCalfNumber(event.target.value)} label="calf">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {numberOfCalves.map(calf => (<MenuItem value={calf}><em>{calf}</em></MenuItem>))}
                                </Select>
                            </FormControl><br />
                        </div>
                    </div>


                    <div className="animalfromLeftSelectionContainer">
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
                        <div>
                            <label className="topLabel" htmlFor="">pregnancy Month</label><br />
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">month</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={pregnancy}
                                    onChange={event => setPregnancy(event.target.value)} label="pregnancyMonth">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="no"><em>No</em></MenuItem>
                                    {pregnancyMonth.map(age => (<MenuItem value={age}><em>{age + " Month"}</em></MenuItem>))}
                                </Select>
                            </FormControl><br />
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

