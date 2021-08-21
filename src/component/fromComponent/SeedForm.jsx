import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useStateValue } from "../../Stateprovider"
import firebase from '../../firebase'
import 'firebase/auth';
const geofire = require('geofire-common');

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SeedForm() {
    const classes = useStyles();
    const [Seed, setSeed] = useState('');
    const [quality, setQuality] = useState('');
    const [PriceType, setPriceType] = useState(false)
    const [fungus, setFungus] = useState(0)
    const [moisture, setMoisture] = useState('')
    const [files, setFiles] = useState([]);
    const [LowPrice, setLowPrice] = useState(0);
    const [HighPrice, setHighPrice] = useState(0);
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [ClickImg, setClickImg] = useState('');
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [state, dispatch] = useStateValue()
    let allfiles = []

    const seedData =[]
    const seedQuality = ['High','Medium','Low']

    const auth = firebase.auth();
    const user = auth.currentUser;

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

    const Submit = () => {
        if (Seed.length === 0) {
            setErrorMsg("select seed")
        } else if (quality.length === 0) {
            setErrorMsg("select seed quality")
        } else if (moisture === 0) {
            setErrorMsg("select seed quality")
        } else if (EcjectPrice === 0) {
            setErrorMsg("price is enpty")
        } else if (description > 251) {
            setErrorMsg("Description is long")
        } else if (files.length >= 4) {
            setErrorMsg("only max 4 pic upload")
        } else {
            const lat = state.data.city.coord.lat
            const lon = state.data.city.coord.lon
            const hash = geofire.geohashForLocation([lat,lon]);
            setErrorMsg(null)
            const Price = PriceType?[HighPrice,LowPrice]:[EcjectPrice]
            dispatch({
                type: "POST",
                data:
                {
                    uid: user.uid,
                    Geohash: hash,
                    geopoint: [lat,lon],
                    type:"seed",
                    seed: Seed,
                    quality:quality,
                    price: Price,
                    fungus:fungus,
                    moisture:moisture,
                    description: description
                },
                files: files
            })
        }
    }
    return (
        <>
        {errorMsg ? (<div className="msgContainer"> <label htmlFor="">{errorMsg}</label></div>) : ""}
            <div className="seedPriceConatainer">
                <div className="seedSelectDetail">
                    <div className="sellForm">
                    <label htmlFor="" className="Seed">Seed</label><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Seed</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={Seed}
                            onChange={event => setSeed(event.target.value)} label="Seed">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {seedData.map(Seed => (<MenuItem value={Seed}><em>{Seed}</em></MenuItem>))}
                            <MenuItem value="Other"><em>Other</em></MenuItem>
                        </Select>
                    </FormControl><br />
                    <label htmlFor="childrenBirth" className="quality">quality?</label><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">quality</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={quality}
                            onChange={event => setQuality(event.target.value)} label="quality">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {seedQuality.map(quality => (<MenuItem value={quality}><em>{quality}</em></MenuItem>))}
                        </Select>
                    </FormControl><br />
                        <Typography id="discrete-slider" gutterBottom>Moisture</Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={value =>setMoisture(value)}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={20}
                        />
                        <Typography id="discrete-slider" gutterBottom>Fungus</Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={value => setFungus(value)}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={20}
                        />
                    </div>
                </div>
                <div className="writeDetail">
                    <div className="imgGallry">
                        <div><label for="seedImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="seedImg" accept="image/*" multiple onChange={uploadImgFile} /></div>
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
                    <div>
                        <label for="price">Add low and high price </label>
                        <input type="checkbox"
                            name="priceType"
                            id="priceType"
                            onClick={e => e.target.checked ? setPriceType(true) : setPriceType(false)}
                        />
                        {PriceType ? <>
                            <div className="price">
                                <label for="lowPrice">Low Price</label><br />
                                <input type="text" name="lowPrice" id="lowPrice" placeholder='lowPrice' value={LowPrice} required onChange={e=>setEcjectPrice(e.target.value)} />
                            </div>
                            <div className="price">
                                <label for="highPrice">High Price</label><br />
                                <input type="text" name="highPrice" id="highPrice" placeholder='highPrice' value={HighPrice} required onChange={e=>setEcjectPrice(e.target.value)} />
                            </div>
                        </> : <div className="price">
                            <label for="price">Price</label><br />
                            <input type="text" name="price" id="price" placeholder='price' value={EcjectPrice} required onChange={e=>setEcjectPrice(e.target.value)} />
                        </div>
                        }
                    </div>
                    <h4>Extra detail</h4>
                    <textarea type="textarea" onChange={e=>setDescription(e.target.value)} defaultValue="" rows="4" cols="30" name="question" id="question" ></textarea>
                </div>
            </div>
            <div className="button newPriceSubmitButton" onClick={Submit}>Post</div>
        </>
    )
}

export default SeedForm
