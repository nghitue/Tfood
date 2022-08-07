import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authentication } from '@/firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { setStatusLogin , setUserPhone } from '@/components/CartList/cartListSlice';


const cx = classNames.bind(styles);

function Login() {
  // country code
  const countryCode = "+84";
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');
  const [isValidText, setValidtext] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);

  let navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    }, authentication);
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e);
    setIsShowBtn(true);
  }

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        
        // ...
      }).catch((error) => {
        // Error 404 SMS not sent
        // ...
        setValidtext(true);
        console.log(error);
      });
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        
        const user = result.user;

        dispatch(setStatusLogin(true));
        dispatch(setUserPhone(user.phoneNumber));

        // update status and direct to home page

        window.sessionStorage.setItem("isLogin", true);
        window.sessionStorage.setItem("phoneNum", user.phoneNumber);
        navigate("/");

      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        // setValidtext(true);
        console.log(error);
      });
    }
  }

  return (
    <div className="page-login">
      <form onSubmit={requestOTP} className="p-login">
        <div className="loginbox_c">
          <div className="logobox">
            <h1 className='junita-script'>TFood</h1>
          </div>
          <div className="formlogin">
            <div className={`ins ${cx('phone-number-box')}`}>
              <span>Phone number</span>
              <input className="form-control" type="text" value={phoneNumber} onChange={(e) => handlePhoneNumber(e.target.value)} placeholder="Please enter your phone number"/>
            </div>
            {
              !expandForm &&
              <div className={cx('otp-enter')}>
                <button className={isShowBtn ? "btn btn-primary" : "btn btn-primary btn-disable"}>Request OTP</button>
              </div>
            }
            {
              expandForm &&
              <>
                <div className={`ins ${cx('otp-box')}`}>
                  <span>OTP</span>
                  <input className="form-control" type="text" value={OTP} onChange={(e) => verifyOTP(e)}/>
                  {isValidText && <p className={cx('error-text')}>Too many requests today. See you in tomorrow</p>}
                </div>
              </>
            }
          </div>
        </div>
        <div id="sign-in-button"></div>
      </form>
    </div>
  );
}

export default Login;