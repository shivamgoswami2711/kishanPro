import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useHistory, Link } from "react-router-dom";
import defaultProfilePic from "./asset/profile.jpg";

// firebase
import firebase from '../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';


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
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
    
  
  let seedList = ["makka","soyabin","chana"];

function Header() {
    const classes = useStyles();
    const [seedName, setSeedName] = useState([]);
    const [windowName, setWindowName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [dataInfo, setDataInfo] = useState(window.localStorage.data !== undefined || window.data !== undefined?typeof(Storage) !== "undefined"?JSON.parse(window.localStorage.data):JSON.parse(window.data):"")
    const history = useHistory();
    const [ClickImg, setClickImg] = useState('');

    // const [classnameUpload, setClassnameUpload] = useState('');
    // const [profileProgtrss, setProfileProgtrss] = useState('');

    // firebase 
    const auth = firebase.auth();
    const db   = firebase.firestore();
    const storageRef = firebase.storage().ref();
    const user = auth.currentUser;

    // user not login 
    if (!user) history.push("/login")

    // value get func profile
    function changetext(e){
        switch (e.target.name) {
          case 'name':
            setFullName(e.target.value)
            break;
          case 'email':
            setEmail(e.target.value)
            break;
          case 'number':
            setNumber(e.target.value)
            break;
          case 'address':
            setAddress(e.target.value)
            break;
          default:
            break;
        }
      }
      const uploadLocal = (data)=>{
        if (typeof(Storage) !== "undefined") {
          // Code for localStorage/sessionStorage.
          window.localStorage.setItem('data', JSON.stringify(data));
          setDataInfo(data)
        } else {
          // Sorry! No Web Storage support..
          console.log('Sorry! No Web Storage support..')
          window.data = JSON.stringify(data);
        }
      }

      const changeData ={
        name: fullName,
        email:email,
        number:number,
        address :address,
        profilePic:profilePic,
        seeds:seedName
        }

      // Save change Datails profile 
    const SaveDatails = ()=>{

      
        
        // profile uploade
        db.collection("user").doc(user.uid).set(changeData).then(() => {
            // add data in local storage
            uploadLocal(changeData);

                console.log("Document successfully written!");
                alert('successfully');
          }).catch((error) => {
            alert(error.code)
            console.log(error.message);
          });
    }

      // cliak img show
      const showClickImg = e => {
        setClickImg(e.target.src)
    }

    //  notification 
    const notification = e=>{
        return(
            <div className="popup"><div className="notification window">
            <span className="cencel" onClick={cencelWindow}>X</span>
            <h3>Notification</h3> 
            <div className="cardWindow">
                <div className="infocard">
                <div className="NotificationProfilePic"><img  onClick={showClickImg} src={dataInfo.profilePic?dataInfo.profilePic:profilePic} alt=""/></div>
                <div className="notificationInfo contact">
                    <h3>shivam</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, voluptates.</p>
                    <p className="date">12:40 PM</p>
                </div>
                </div>
            </div>
            </div>
            </div>
        )
    }

   async function uploadImgFile(e)  {
        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('Profile/' + user.uid).put(e.target.files[0], metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
              default:
                break;
            }
          }, 
          (error) => { // A full list of error codes is available at
            switch (error.code) {
              case 'storage/unauthorized':
                console.log('access problam'); // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                console.log('canceled'); // User canceled the upload
                break;
              case 'storage/unknown':
                console.log('occurred');  // Unknown error occurred, inspect error.serverResponse
                break;
              default:
                break;
            }
          }, 
          // Upload completed successfully, now we can get the download URL
          () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setProfilePic(downloadURL)
            // set data in local
            uploadLocal(changeData);
            // upload profile url 
            db.collection("user").doc(user.uid).update({profilePic:downloadURL}).catch((error) => {
              alert(error.code);
              console.log(error.message);
            });
          })
          
        );
    };
    //  prifile 
    const Profile = e =>{
        // User is signed in.
        // data ref and user collection ref
        const docRef = db.collection("data").doc("seed");

        //data  seed name 
          docRef.get().then((doc) => {
          if (doc.exists) {
              seedList = doc.data().seeds;
          } else {
              console.log("No such document!");
          }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });


        return(
            <div className="popup">
                <div className="profilewin window">
                    <span className="cencel" onClick={cencelWindow}>X</span>
                    <div>
                        <div className="profileImgcontainer">
                        <div className="circle">
                          {console.log(dataInfo.profilePic===undefined)}
                          {console.log(dataInfo.profilePic)}
                          {console.log(dataInfo)}
                            <img className="profile-pic"  onClick={showClickImg} src={dataInfo.profilePic===undefined || dataInfo.profilePic===""?profilePic:dataInfo.profilePic} alt=""/>
                        </div>
                        <div className="p-image">
                            <label for="file"><i className="fa fa-camera upload-button"></i></label>
                            <input className="file-upload" type="file" id="file" accept="image/*" onChange={uploadImgFile}/>
                        </div>
                    </div>
                    </div>
                    <div className="button editDetail">Edit Details</div>
                    <div className="profileInfoEdit">
                      <form action="" >
                            <div className="name">
                                <label for="fullName">Full Name</label><br/>
                                <input type="text" name="name" id="fullName" defaultValue={dataInfo.name}  required onChange={changetext}/>                    
                            </div>
                
                            <div className="email">
                                <label for="email">Email</label><br/>
                                <input type="email" name="email" id="email" defaultValue={dataInfo.email} required autocomplete="false" onChange={changetext}/>                    
                            </div>
                
                            <div className="number">
                                <label for="mobileNUmber">Mobile number</label><br/>
                                <input type="text" name="number" id="mobileNumber" defaultValue={dataInfo.number} required autocomplete="false" onChange={changetext}/>                    
                            </div>
                            <div className="address">
                                <label for="address">address</label><br/>
                                <input type="text" name="address" id="address" defaultValue={dataInfo.address} required autocomplete="false" onChange={changetext}/>                    
                            </div>
                
                            {false ? (<div className="otp">
                            <label for="otp">OTP</label><br/>
                            <input type="text" name="otp" id="otp" placeholder='otp'  required autocomplete="false" onChange={changetext}/>                    
                          </div>) : (<></>)}
                            <div className="produceSeed">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Seeds</InputLabel>
                                    <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={seedName}
                                    onChange={event=>setSeedName(event.target.value)}
                                    input={<Input />}
                                    renderValue={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                        {
                                        selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {seedList.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={seedName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="button" onClick={SaveDatails}>Change Details</div>
                        </form>
                    </div>
                </div>
            </div>    
        )
    }
    
    const cencelWindow = () => setWindowName('')

    // set window which window isw open
    const puppopWindow = e=>{
        switch(windowName){
            case 'notification' :
                return notification()
            case 'profile' :
                return Profile()
            default:
                return ''
        }
    }
    return (
        <>
        <header>
            <div className="mainheader">
                <div className="logo"><img src="" alt=""/></div>
                <div><input className="search" type="search" name="" id=""/></div>
                <nav>
                    <ul className='navul'>
                        <li className="home"><Link to='/'><i className="fas fa-home"></i></Link><span>Home</span></li>
                        <li onClick={()=>setWindowName('notification')}><i className="fas fa-bell"></i><span>Notification</span></li>
                        <li onClick={()=>setWindowName('profile')}><i className="fas fa-user-alt"></i><span>Profile</span></li>
                        <li className="chat"><Link to='/chat'><i className="far fa-comment-dots"></i></Link><span>Chat</span></li>
                        <li className="moreManu"><Link><i className="fas fa-caret-up"></i></Link><span>More</span> 
                        <ul className='submenu'>
                            {user?(<li onClick={()=>{ auth.signOut().then(() => {alert("logout");history.push('/login')})
                            .catch((error) => {alert(error.code); console.log(error.message)});
                            }}>Logout</li>):
                            (<li onClick={()=>{history.push("/login");}}>Login</li>)}
                            <li><Link to='/'>Singup</Link></li>
                            <li>Setting</li>
                        </ul> </li>
                    </ul>
                </nav>
                <div id="hangBurger"></div>
            </div>
            {ClickImg!==""?
                           <div className="popupImg">
                                <div className="windowImg">
                                    <img onClick={()=>setClickImg("")} src={ClickImg} alt=''/>
                                </div>
                            </div>:""}
        </header>
        <section className="popupSection"> 
            {puppopWindow()}
        </section>
        </>
    )
}
export default Header


// http://api.openweathermap.org/data/2.5/weather?lat=21.899110336284146&lon=79.15255358843002&appid=2af3b76572ec89eebe41fdee001b8aae