import React, { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import { useStateValue } from "../Stateprovider"
import fetchData from './Weather'
import firebase from '../firebase'
import 'firebase/auth';
import 'firebase/firestore';



function Login() {
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [state, dispatch] = useStateValue()
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);
  let weatherData;
  
  const auth = firebase.auth();
  const history = useHistory();
  const db = firebase.firestore();

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebase.auth.RecaptchaVerifier(element.current, { size: 'invisible', })
      verifier.verify().then(() => setRecaptcha(verifier));
    }
  });


  const singupSubmit = async () => {
    // verify OTP 
    await confirmationResult.confirm(code).then((result) => {

      // User signed in successfully.
      const user = auth.currentUser;
      const docRefInfo = db.collection("user").doc(user.uid);
      docRefInfo.get().then( async (doc) => {
        if (doc.exists) {
          weatherData = await fetchData(doc.data().pincode)
          dispatch({
            type:"weather",
            weather:weatherData
          })
          dispatch({
            type:"useData",
            data:{useData:doc.data()}
          })

          // add data in local storage
          if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            window.localStorage.setItem('data', JSON.stringify(doc.data()));
          } else {
            // Sorry! No Web Storage support..
            console.log('Sorry! No Web Storage support..')
            window.data = JSON.stringify(doc.data());
          }
          // go to home page 
          history.push("/")
          alert('login')
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
        alert(error.code)
      });
    }).catch((error) => {
      alert(error.code)
      console.log(error.message);
    });

  }

  // sand OTP
  const signInWithPhoneNumber = async () => {
    // history.push("")
    if (number.length >= 10 && 13 >= number.length) {
      // remove extra part in number
      let tenNumber = number.substring(number.length - 10, number.length);
      const phoneNumber = `+91${tenNumber}`;
      setConfirmationResult(await auth.signInWithPhoneNumber(phoneNumber, recaptcha)
        .catch(error => {
          alert(error.code);
          console.log(error.message)
        }));
    }
    else {
      alert('places enter vaild Number (:')
    }

  };



  return (
    <section className="loginSection">
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="number">
          <label htmlFor="mobileNUmber">Mobile number</label><br />
          <input type="text" name="number" id="mobileNumber" onChange={e => setNumber(e.target.value)} />
        </div>
        <div className="otp">
          <label htmlFor="otp">OTP</label><br />
          <input type="text" name="otp" id="otp" onChange={e => setCode(e.target.value)} />
        </div>
        <div ref={element}></div>
        {confirmationResult ? (<div className="singupSubmit"><div className="button" onClick={singupSubmit} type="submit" >Submit</div></div>) :
          (<div className="button otpButton" onClick={signInWithPhoneNumber}>Sand OTP</div>)
        }
        <div><p className="forget">Forget password</p>

          <div className="singinref">
            <p className="Singin">
              <Link to='/singup'>Singin</Link>
            </p>
            <p>terms and condition</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Login
