  import React,{useState} from 'react'
  import firebase from '../firebase'
  import 'firebase/auth';
  import 'firebase/analytics';
  import 'firebase/firestore';
  import { makeStyles } from '@material-ui/core/styles';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
  import Typography from '@material-ui/core/Typography';
  import Slider from '@material-ui/core/Slider';
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  function NewPrice() {
    // firebase 
    const auth = firebase.auth();
    const db   = firebase.firestore();
    const user = auth.currentUser;

    let allfiles=[]
    const classes = useStyles();
    const [Seed, setSeed] = useState('');
    const [quality, setQuality] = useState('');
    const [PriceType, setPriceType] = useState(false)
    const [Fungus, setFungus] = useState(0)
    const [files, setFiles] = useState([]);
    const [LowPrice, setLowPrice] = useState(0);
    const [HighPrice, setHighPrice] = useState(0);
    const [EcjectPrice, setEcjectPrice] = useState(0);
    const [ClickImg, setClickImg] = useState('');

    const priceFun = e =>{
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

    function uploadImgFile(e){
        // second time uplode
        for(let i=0;i<e.target.files.length;i++){
            allfiles.push(e.target.files[i]);
        }
        if(allfiles.length>0){
            console.log(...allfiles)
            setFiles(Object.assign(allfiles,files)) 
        }
    };
    // remove img
    const removeImg = e => setFiles(files.filter((i, index) => index != e.target.id))
    // show img
    const showClickImg = e => {
        setClickImg(e.target.src)
    }

    const newPriceSubmit = ()=>{
        const PriceDetaile = []
        const date = new Date();
        const currentData = date.getSeconds() +":"+ date.getMinutes() + ":"+ date.getHours() + ":" + date.getFullYear()

        PriceType ? PriceDetaile.push(LowPrice,HighPrice):PriceDetaile.push(EcjectPrice)
        console.log(PriceDetaile)


        db.collection("user").doc(user.uid).collection("userpost").doc(currentData).set({
                seed: Seed,
                quality:quality,
                Fungus:Fungus,
                price:PriceDetaile
          }).then(() => {
                console.log("Document successfully written!");
                alert('successfully');
                  window.location = '/';
          }).catch((error) => {
              console.error("Error writing document: ", error);
          });
    }
      return (
          <>
            <div className="imgGallry">
            <div><label for="seedImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="seedImg" accept="image/*" multiple  onChange={uploadImgFile}/></div>
            <div className="seedimgGallry">
            <span className="cencel">X</span>
                {files.map((file, key) =><div><img onClick={showClickImg} alt='' src={URL.createObjectURL(file)}/><span className="cencelImg" onClick={removeImg}  id={key} >X</span></div>)}
                </div>
               {ClickImg!==""?
               <div className="popupImg">
                    <div className="windowImg">
                        <img onClick={()=>setClickImg("")} src={ClickImg} alt=''/>
                    </div>
                </div>:""}
        </div> 

            <div className="sellForm">
            <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Seed</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={Seed}
                            onChange={event=>setSeed(event.target.value)}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                </FormControl>
                <div>
                    <label for="price">Add low and high price</label><br/>
                    <input type="checkbox" 
                    name="priceType"
                    id="priceType"
                    onClick={e=>e.target.checked ? setPriceType(true):setPriceType(false)}
                    />
                    {PriceType?<>
                        <div className="price">
                            <label for="lowPrice">Low Price</label><br/>
                            <input type="text" name="lowPrice" id="lowPrice" placeholder='lowPrice' value={LowPrice} required onChange={priceFun}/>                    
                        </div>
                        <div className="price">
                            <label for="highPrice">High Price</label><br/>
                            <input type="text" name="highPrice" id="highPrice" placeholder='highPrice' value={HighPrice} required onChange={priceFun}/>                    
                        </div>
                    </>:<div className="price">
                        <label for="price">Price</label><br/>
                        <input type="text" name="price" id="price" placeholder='price' value={EcjectPrice} required onChange={priceFun}/>                    
                    </div>
                    }
                </div>

                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Quality </InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={quality}
                            onChange={event=>setQuality(event.target.value)}
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
                                getAriaValueText={value=>`${value}%`}
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
                                getAriaValueText={value=>setFungus(value)}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={20}
                            />
                <div className="button" onClick={newPriceSubmit}>Post</div>
            </div> 
            </>
      )
  }
  
  export default NewPrice
  