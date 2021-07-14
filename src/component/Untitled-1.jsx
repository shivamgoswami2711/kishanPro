import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import dataBrandAndBreed from './Data'
import Images from './asset/Index'
import firebase from '../firebase'
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


function Leftheader() {
    const classes = useStyles();
    const [Seed, setSeed] = useState('');
    const [quality, setQuality] = useState('');
    const [windowName, setWindowName] = useState([]);
    const [windowOpenCloce, setWindowOpenCloce] = useState(false)
    const [PriceType, setPriceType] = useState(false)
    const [Fungus, setFungus] = useState(0)
    const [files, setFiles] = useState([]);
    const [LowPrice, setLowPrice] = useState(0);
    const [HighPrice, setHighPrice] = useState(0);
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [ClickImg, setClickImg] = useState('');
    const [linkAdd, setLinkAdd] = useState(null)
    const [url, setUrl] = useState("")
    const [breed, setBreed] = useState('')
    const [aminalAge, setAminalAge] = useState(0)
    const [calfNumber, setCalfNumber] = useState('')
    const [pregnancy, setPregnancy] = useState(0)
    const [byaath, setByaath] = useState('')
    const [milkCpacity, setMilkCpacity] = useState(0)
    const [produceMilk, setProduceMilk] = useState(0)
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [henWeight, setHenWeight] = useState(0)
    const [tractorsBrand, setTractorsBrand] = useState('')
    const [tacterPower, setTacterPower] = useState('')
    const [productName, setProductName] = useState('')
    const aminalAgearr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const pregnancyMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const numberOfCalves = ["no", "bull calf", "heifer calf/calf"]
    const weightUnit = ["gram", "kilogram", "quintal", "tonne", "ceret"]
    let data;

    useEffect(() => {

        return () => {
            data = ''
        }
    }, [data])
    // firebase 
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;
    let allfiles = []


    const popupSection = () => {
        setWindowOpenCloce(true)
        console.log(windowOpenCloce)
        switch (windowName[windowName.length - 1]) {
            case 'newPricePost':
                return  
            case 'CreatePost':
                return CreatePost();
            case 'marketSell':
                return marketSell();
            case 'AnimalType':
                return AnimalType();
            case 'formQuestion':
                return formQuestion();
            case 'tacterPost':
                return formQuestion("tacter");
            case 'equipment':
                return formQuestion("equipment");
            case 'Vegetables':
                return formQuestion("Vegetables");
            case 'Pesticide':
                return formQuestion("Pesticide");
            case 'otherPostType':
                return formQuestion("other");
            case 'cowPost':
                return cowBullPost("cowPost");
            case 'cowBullPost':
                return cowBullPost("cowBullPost");
            case 'BuffaloPost':
                return cowBullPost("BuffaloPost");
            case 'BuffaloBullPost':
                return cowBullPost("BuffaloBullPost");
            case 'goatPost':
                return cowBullPost("goatPost");
            case 'goatMalePost':
                return cowBullPost("goatBullPost");
            case 'henPost':
                return cowBullPost("henBullPost");
            case 'dogPost':
                return cowBullPost("dogBullPost");
            default:
                break;
        }
    }

    const priceFun = e => {
        switch (e.target.name) {
            case "lowPrice":
                setLowPrice(e.target.value);
                break;
            case "highPrice":
                setHighPrice(e.target.value);
                break;
            case "price":
                setEcjectPrice(e.target.value);
                break;
            default:
                break;
        }
    }

    const newPriceSubmit = () => {
        const PriceDetaile = []
        const date = new Date();
        const currentData = date.getSeconds() + ":" + date.getMinutes() + ":" + date.getHours() + ":" + date.getFullYear()

        PriceType ? PriceDetaile.push(LowPrice, HighPrice) : PriceDetaile.push(EcjectPrice)
        console.log(PriceDetaile)


        db.collection("user").doc(user.uid).collection("userpost").doc(currentData).set({
            seed: Seed,
            quality: quality,
            Fungus: Fungus,
            price: PriceDetaile
        }).then(() => {
            console.log("Document successfully written!");
            alert('successfully');
            window.location = '/';
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    


    function uploadImgFile(e) {
        // second time uplode
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setFiles(Object.assign(allfiles, files))
        }
    };
    // remove img
    const removeImg = e => setFiles(files.filter((i, index) => index != e.target.id))


    const enterUrl = e => {
        if (e.key === 'Enter') {
            setLinkAdd(null)
        }
    }


    // aad form question
    function formQuestion(type) {
        const questionSubmit = () => {
            switch (type) {
                case "tacter":
                    return data = {
                        breed: breed, byaath: byaath, produceMilk: produceMilk, milkCpacity: milkCpacity, price: EcjectPrice, aminalAge: aminalAge, calf: calfNumber, pregnancy: pregnancy, description: description
                    }
                case "equipment":
                    return data = {
                        equipment: productName, price: EcjectPrice, unit: weightUnit, description: description
                    }
                case "Vegetables":
                    return data = {
                        equipment: productName, price: EcjectPrice, unit: weightUnit, description: description
                    }
                case "Pesticide":
                    return data = {
                        equipment: productName, price: EcjectPrice, description: description
                    }
                default:
                    return data = {
                        description: description
                    }
            }
        }
        return (
            <div className="popup">
                <div className="window">
                    <span className="cencel" onClick={() => setWindowName(windowName.slice(0, windowName.length - 1))}>X</span>
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
                        {type === "tacter" || type === "equipment" || type === 'Vegetables' || type === "Pesticide" ?
                            (<><div className="row">
                                {type === "tacter" ? (<div>
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
                                </div>) :
                                    type === 'Vegetables' ?
                                        (<div>
                                            <label htmlFor="">Vegetables name</label>
                                            <div><input type="number" onClick={e => setTacterPower(e.target.value)} className="inputUrl " placeholder="Ex. Tomato" /></div>
                                        </div>) : (
                                            <div>
                                                {type === "Pesticide" ? (<label htmlFor="">Pesticide</label>) : (<label htmlFor="">equipment</label>)}
                                                <div><input type="number" onClick={e => setProductName(e.target.value)} className="inputUrl " placeholder="Product Name" /></div>
                                            </div>
                                        )}
                                <div>
                                    <div className="row VegetablesContainer">
                                        <div>
                                            <label htmlFor="">Price</label>
                                            <div><input type="number" onClick={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 100 ₹" /></div>
                                        </div>
                                        {type !== "Pesticide" ? (
                                            <div className="unit">
                                                <label htmlFor="" className="topLabel">unit</label><br />
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">unit</InputLabel>
                                                    <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={tractorsBrand}
                                                        onChange={event => setTractorsBrand(event.target.value)} label="Age">
                                                        {weightUnit.map(unit => (<MenuItem value={unit}><em>{unit}</em></MenuItem>))}
                                                    </Select>
                                                </FormControl>
                                            </div>) : (<></>)}
                                    </div>
                                </div>
                            </div>
                                {type === "tacter" ? (<div>
                                    <label htmlFor="">horse power</label><br />
                                    <input type="number" onClick={e => setTacterPower(e.target.value)} className="inputUrl" placeholder="Ex. 25 HP" />
                                </div>) : (<></>)}
                            </>
                            ) :
                            (<></>)
                        }

                        <h4>Description</h4>
                        <textarea type="textarea" defaultValue="" rows="4" cols="50" name="question" id="question" ></textarea>
                    </div>
                    <div className="button formSubmit" onClick={questionSubmit}>Submit</div>
                </div>
            </div>

        )
    }

    // aminamal Post
    function cowBullPost(type) {

        const animalFromSubmit = () => {
            if (breed.length === 0) {
                setErrorMsg("breed not selected")
            } if (byaath >= 15) {
                setErrorMsg("how many times did you have children? value is high or empty")
            } if (byaath === 0) {
                setErrorMsg("how many times did you have children? value is empty")
            } if (produceMilk > 50) {
                setErrorMsg("produce milk very high number")
            } if (milkCpacity === 0) {
                setErrorMsg("milk capacity is empty")
            } if (milkCpacity >= 50) {
                setErrorMsg("milk capacity very high number")
            } if (EcjectPrice === 0) {
                setErrorMsg("price is enpty")
            } if (aminalAge === 0) {
                setErrorMsg("Aminal Age is enpty")
            }
            // if (henWeight === 0) {
            //     setErrorMsg("weight is enpty")
            // } 
            if (description.length >= 1000) {
                setErrorMsg("discription only 1000 charater")
            }
            switch (type) {
                case "cowPost":
                    return data = {
                        breed: breed, byaath: byaath, produceMilk: produceMilk, milkCpacity: milkCpacity, price: EcjectPrice, aminalAge: aminalAge, calf: calfNumber, pregnancy: pregnancy, description: description
                    }
                case "cowBullPost":
                    return data = {
                        breed: breed, price: EcjectPrice, aminalAge: aminalAge, description: description
                    }
                case "BuffaloPost":
                    return data = {
                        breed: breed, byaath: byaath, produceMilk: produceMilk, milkCpacity: milkCpacity, price: EcjectPrice, aminalAge: aminalAge, calf: calfNumber, pregnancy: pregnancy, description: description
                    }
                case "BuffaloBullPost":
                    return data = {
                        breed: breed, price: EcjectPrice, aminalAge: aminalAge, description: description
                    }
                case "goatPost":
                    return data = { breed: breed, byaath: byaath, price: EcjectPrice, aminalAge: aminalAge, calf: calfNumber, pregnancy: pregnancy, description: description }

                case "goatBullPost":
                    return data = { breed: breed, price: EcjectPrice, aminalAge: aminalAge, description: description }
                case "henBullPost":
                    return data = { breed: breed, price: EcjectPrice, aminalAge: aminalAge, weight: henWeight, description: description }
                case "dogBullPost":
                    return data = { breed: breed, price: EcjectPrice, aminalAge: aminalAge, description: description }
                default:
                    break;
            }
            if (breed.length !== 0 && byaath !== 0 && milkCpacity !== 0 && EcjectPrice !== 0 && aminalAge !== 0 && byaath <= 15 && produceMilk < 50 && milkCpacity <= 50 && description.length <= 1000) {
                console.log('hello')
                db.collection("user").doc(user.uid).collection("aminal").doc("aminal").set(data).then(() => {
                    console.log("Document successfully written!");
                    alert('successfully');
                    setWindowName([]); setFiles([]); setBreed(""); setByaath(0); setProduceMilk(0); setMilkCpacity(0); setEcjectPrice(0); setCalfNumber(""); setAminalAge(''); setPregnancy(''); setDescription(''); setErrorMsg(null);
                }).catch((error) => {
                    alert(error.code)
                    console.log(error.message);
                });

            }
            // console.log(data)
        }
        return (
            <div className="popup">
                <div className="window">
                    <span className="cencel" onClick={() => setWindowName(windowName.slice(0, windowName.length - 1))}>X</span>
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
                                        {type === "BuffaloPost" || type === "BuffaloBullPost" ? (dataBrandAndBreed[1].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))) :
                                            type === "cowPost" || type === "cowBullPost" ? (dataBrandAndBreed[0].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))) :
                                                type === "goatPost" || type === "goatBullPost" ? (dataBrandAndBreed[2].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))) :
                                                    type === "dogBullPost" ? (dataBrandAndBreed[3].map(breed => (<MenuItem value={breed}><em>{breed}</em></MenuItem>))) : (<></>)}
                                        <MenuItem value="Other"><em>Other</em></MenuItem>
                                    </Select>
                                </FormControl><br />
                                {type.search("Bull") === -1 ? (<>
                                    <label htmlFor="childrenBirth" className="cl">how many times did you have children?</label><br />
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Number</InputLabel>
                                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={byaath}
                                            onChange={event => setByaath(event.target.value)} label="childrenBirth">
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {aminalAgearr.map(Num => (<MenuItem value={Num}><em>{Num}</em></MenuItem>))}
                                        </Select>
                                    </FormControl><br />

                                    {type !== "goatPost" ? (<><label htmlFor="">how much milk does it give</label>
                                        <div><input type="number" onChange={e => setProduceMilk(e.target.value)} className="inputUrl milk" placeholder="produce milk" /></div>
                                        <label htmlFor="">milk capacity</label>
                                        <div><input type="number" onChange={e => setMilkCpacity(e.target.value)} className="inputUrl milkCapacity" placeholder="milk capacity" /></div></>) : (<></>)}</>) : (
                                    <>
                                        <div>
                                            <label htmlFor="">Price</label>
                                            <div><input type="number" onChange={e => setEcjectPrice(e.target.value)} className="inputUrl Price" placeholder="Ex. 10000 ₹" /></div>
                                        </div>
                                        <div>
                                            <label className="topLabel" htmlFor="">Aminal Age</label><br />
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={aminalAge}
                                                    onChange={event => setAminalAge(event.target.value)} label="Age">
                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                    {aminalAgearr.map(age => (<MenuItem value={age}><em>{age + " year"}</em></MenuItem>))}
                                                </Select>
                                            </FormControl><br />
                                        </div>
                                    </>
                                )}

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
                                {type === "henBullPost" ? (<div>
                                    <label htmlFor="">weight</label>
                                    <div><input type="number" onChange={e => setHenWeight(e.target.value)} className="inputUrl Price" placeholder="Ex. 1 kg" /></div>
                                </div>) : (<></>)}
                                <div className="animalPricecontainer">

                                    {type.search("Bull") === -1 ? (<>
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
                                        </div></>) : (<></>)}
                                </div>


                                {type.search("Bull") === -1 ? (<><div className="aminalfromLeftSelectionContainer">
                                    <div>
                                        <label className="topLabel" htmlFor="">Aminal Age</label><br />
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={aminalAge}
                                                onChange={event => setAminalAge(event.target.value)} label="Age">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                {aminalAgearr.map(age => (<MenuItem value={age}><em>{age + " year"}</em></MenuItem>))}
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
                                </div></>) : (<></>)}
                                <h4>Description</h4>
                                <textarea type="textarea" onChange={e => setDescription(e.target.value)} defaultValue="" rows="3" cols="30" name="question" id="question" ></textarea>
                            </div>
                        </div>
                        <div className="button formSubmit" onClick={animalFromSubmit}>Submit</div>
                    </form>

                </div>
            </div >
        )
    }

    // new price window
    function newPricePost() {
        // 
        return (
            <div className="popup">
                <div className="window">
                    <span className="cencel" onClick={() => setWindowName(windowName.slice(0, windowName.length - 1))}>X</span>
                    <div className="seedPriceConatainer">
                        <div className="seedSelectDetail">
                            <div className="sellForm">
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Seed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={Seed}
                                        onChange={event => setSeed(event.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Quality </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={quality}
                                        onChange={event => setQuality(event.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"High"}>High</MenuItem>
                                        <MenuItem value={"Medium"}>Medium</MenuItem>
                                        <MenuItem value={"Low"}>Low</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography id="discrete-slider" gutterBottom>Moisture</Typography>
                                <Slider
                                    defaultValue={1}
                                    getAriaValueText={value => `${value}%`}
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
                                        <input type="text" name="lowPrice" id="lowPrice" placeholder='lowPrice' value={LowPrice} required onChange={priceFun} />
                                    </div>
                                    <div className="price">
                                        <label for="highPrice">High Price</label><br />
                                        <input type="text" name="highPrice" id="highPrice" placeholder='highPrice' value={HighPrice} required onChange={priceFun} />
                                    </div>
                                </> : <div className="price">
                                    <label for="price">Price</label><br />
                                    <input type="text" name="price" id="price" placeholder='price' value={EcjectPrice} required onChange={priceFun} />
                                </div>
                                }
                            </div>
                            <h4>Extra detail</h4>
                            <textarea type="textarea" defaultValue="" rows="4" cols="30" name="question" id="question" ></textarea>
                        </div>
                    </div>
                    <div className="button newPriceSubmitButton" onClick={newPriceSubmit}>Post</div>
                </div>
            </div>
        )
    }



    return (
        <>
            <section>
                <div className="leftheaderButton">
                    <div className="button filterbtn">Filter</div>
                    <div className="button newPrice" onClick={() => console.log("herllo")}>New price</div>
                </div>
                <div className="leftheader">
                    <span className="cencelLeftHeader" onClick={() => setWindowName(windowName.slice(0, windowName.length - 1))}>X</span>
                    <div>
                        <div className="button newPrice" onClick={() => setWindowName(['CreatePost'])}>new price</div>
                    </div>
                    <div>
                        <div className='laftHeaderTab'><div><img src={Images.Market} alt="" /></div><div><h1>Market</h1></div></div>
                        <div className='laftHeaderTab'><div><img src={Images.Form} alt="" /></div><div><h1>form</h1></div></div>
                        <div className='laftHeaderTab'><div><img src={Images.information} alt="" /></div><div><h1>Knowledge</h1></div></div>
                        <div className='laftHeaderTab'><div><img src={Images.hashtag} alt="" /></div><div><h1>Follew</h1></div></div>
                        <div className='laftHeaderTab'><div><img src={Images.Warehouse} alt="" /></div><div><h1>Warehouse</h1></div></div>
                    </div>
                </div>
            </section>
            <section className="popupSection">
           { windowOpenCloce?(<div className="popup">
                    <div className="window">
                        <span className="cencel" onClick={() => {setWindowName(windowName.slice(0, windowName.length - 1));setWindowOpenCloce(false)}}>X</span>
                    {popupSection()}
                    </div>
                </div>):(<></>)}
                {/* <CowForm/> */}
                
            </section>
        </>
    )
}

export default React.memo(Leftheader)
