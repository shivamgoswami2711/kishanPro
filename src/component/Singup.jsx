import React,{useState ,useRef ,useEffect} from 'react';
import { useHistory, Link } from "react-router-dom";
import fetchData from './Weather'
import firebase from '../firebase'
import 'firebase/auth';
import 'firebase/firestore';




function Singup() {
    const [fullName, setFullName] = useState('');
    const [number, setNumber] = useState('');
    const [recaptcha, setRecaptcha] = useState(null);
    const element = useRef(null);
    const [code, setCode] = useState('');
    const [otpVerify, setOtpVerify] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const history = useHistory();


    const user = firebase.auth().currentUser;


    useEffect(() => {
      if (!recaptcha) {
        const verifier = new firebase.auth.RecaptchaVerifier(element.current, {size: 'invisible',})
        verifier.verify().then(() => setRecaptcha(verifier));
      }
    });
    
    function changetext(e){
      switch (e.target.name) {
        case 'name':
          setFullName(e.target.value)
          break;
        case 'number':
          setNumber(e.target.value)
          break;
        case 'otp':
          setCode(e.target.value)
          break;
        case 'address':
          setAddress(e.target.value)
          break;
        case 'pincode':
          setPincode(e.target.value)
          break;
        default:
          break;
      }
    }


    
    
    
    function handleSubmit() {
    }
    const singupSubmit = async () => {
      await confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
       fetchData(pincode);
        setOtpVerify(true);
          }).catch((error) => {
              alert(error.code)
              console.log(error.message);
          });
    }



    const submitDetaile = async ()=>{
      await db.collection("user").doc(user.uid).set({
        name: fullName,
        number:number,
        address:address,
        pincode:pincode
        }).then(() => {
              console.log("Document successfully written!");
              history.push("/home");
        }).catch((error) => console.error("Error writing document: ", error));
    }


    const signInWithPhoneNumber = async () => {
        if (number.length>=10 && 13>=number.length) {
          let tenNumber = number.substring(number.length-10, number.length);
          const phoneNumber = `+91${tenNumber}`;
          setConfirmationResult(await auth.signInWithPhoneNumber(phoneNumber, recaptcha)
          .catch(error => {
            alert(error.code);
            console.log(error.message)
          }));
        }
        else{
          alert('places enter vaild Number (:')
        }
        
      };

    return (
        <section className="singupSection">
          <div className="singupContainer">
          {otpVerify?(<>                   
                    <div className="address">
                          <label for="address">address</label><br/>
                          <input type="text" name="address" id="address" placeholder='address'   onChange={changetext}/>                    
                      </div>

                    <div className="pincode">
                          <label for="pincode">pincode</label><br/>
                          <input type="text" name="pincode" id="pincode" placeholder='pincode'  onChange={changetext}/>                    
                      </div>

                      <div className="singupSubmit">
                        <div className="button" type="submit" onClick={submitDetaile}>Submit</div>
                        </div>
                        </>
                      ):(<>
                <h1 className>Login/singup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <label for="fullName">Full Name</label><br/>
                        <input type="text" name="name" id="fullName" placeholder='fullName' required  onChange={changetext}/>                    
                    </div>
                    <div className="number">
                        <label for="mobileNUmber">Mobile number</label><br/>
                        <input type="text" name="number" id="mobileNumber" placeholder='Mobile number' required onChange={changetext}/>                    
                    </div>
                    {confirmationResult ? (<div className="otp">
                        <label for="otp">OTP</label><br/>
                        <input type="text" name="otp" id="otp" placeholder='otp'  required onChange={changetext}/>                    
                      </div>) : (<></>)}
                    <div ref={element}></div>
                    <div className="SubmitOtp">{confirmationResult?(<div className="singupSubmit"><div className="button" onClick={singupSubmit} type="submit" >Submit</div></div>):
                  (<div className="button otpButton" onClick={signInWithPhoneNumber}>Sand OTP</div>)
                  }</div>         
                </form>
                <div className="singinref">
                    <p className="Singin">
                      <Link to='/login'>login </Link>
                    </p>
                    <p>terms and condition</p>
                </div>
            </>)}
            </div>
        </section>
    )
}

export default Singup
