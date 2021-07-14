import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import WeatherComponent from './WeatherComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 450,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

function SeedPostContainer() {
    const classes = useStyles();
    const [Seed, setSeed] = React.useState('');
    const [quality, setQuality] = React.useState('');
    const [windowName, setWindowName] = React.useState('');
    const [files, setFiles] = React.useState([]);

    function uploadImgFile(e) {
        let allfiles = []
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setFiles(allfiles);
        }
    };
    // seed from 
    const seedForm = e => {
        return (
            <div className="popup">
                <div className="window">
                    <span className="cencel" onClick={() => setWindowName('')}>X</span>
                    <div className="sellForm">
                        <div className="imgGallry">
                            <div><label htmlFor="seedImg"><i className="fa fa-camera upload-button"></i></label><input className="file-upload" type="file" id="seedImg" accept="image/*" multiple onChange={uploadImgFile} /></div>
                            <div className="seedimgGallry">
                                {files.map((file, key) => <div key={key}><img src={URL.createObjectURL(file)} alt='' /></div>)}
                            </div>
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">Quality </InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={quality}
                                    onChange={(event => setQuality(event.target.value))}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                    <MenuItem value={"Medium"}>Medium</MenuItem>
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <Typography id="discrete-slider" gutterBottom>Fungus</Typography>
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
                        </div>
                        <div className="button">Post</div>
                    </div>
                </div>
            </div>
        )
    }
    function puppopWindow() {
        if (windowName === 'seedForm') {
            return seedForm()
        }
    }

    function SeedPost() {
        return (
            <div className="seedInfoContainer">
                <div className="namecontainer">
                    <div className="profilePic"><img src="./profile.jpg" alt="" /></div>
                    <div className="profileName">
                        <h2>shivam</h2>
                        <p>Chhindwara mp 480110</p>
                    </div>
                </div>
                <div className="infoContainer">
                    <div className="seedName">
                        <h2>Makka</h2>
                        <p>mandi name</p>
                    </div>
                    <div className="info">
                        <p>Quality : low</p>
                        <p>fangas : 5%</p>
                        <p>moisture : 14%</p>
                    </div>
                </div>
                <div className="priceContainer">
                    <div className="priceUp">
                        <div className="price">
                            <h2>Price</h2>
                            <p>average 1250</p>
                        </div>
                        <div className="priceUpHigh">
                            <p>hight 1400</p>
                            <p>low 1400</p>
                        </div>
                    </div>
                    <div className="sellButton">
                        <div className="button sellSeed" onClick={() => setWindowName('seedForm')}>SELL</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <section className="postContainer">
                <WeatherComponent />
                <SeedPost />
                <SeedPost />
                <SeedPost />
            </section>
            <section className="popupSection">
                {puppopWindow()}
            </section>
        </>
    )
}

export default SeedPostContainer
