import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import classes from './LoginPage.module.css'; 
import facebook from '../../assets/FacebookAuth.svg'
import google from '../../assets/google.png'
import mailIcon from '../../assets/mail.svg'
import lockIcon from '../../assets/lock.svg'
export interface ISignupPageProps {}

const SignupPage: React.FunctionComponent<ISignupPageProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpWithEmailAndPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
        .then((response) => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            setAuthing(false);
        });
};
const signInWithFacebook = async () => {
    setAuthing(true);

    signInWithPopup(auth, new FacebookAuthProvider())
        .then((response) => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            setAuthing(false);
        });
};

  return (
    <div className={classes.loginPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>Audio</h1>
        <h2 className={classes.subtitle}>It's modular and designed to last</h2>

        <form onSubmit={signUpWithEmailAndPasswordHandler}>
        <div className={classes.inputContainer}>
                    <img src={mailIcon} alt="Search Icon" className={classes.icons} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.input}
                        />
                    </div>
                    <div className={classes.inputContainer}>
                    <img src={lockIcon} alt="Search Icon" className={classes.icons} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.input}
                        />
                    </div>

          <button
            type="submit"
            disabled={authing}
            className={classes.signInButton}
          >
            Sign up with Email and Password
          </button>
        </form>
        <div className={classes.socialButtons}>
          <button
            onClick={() => signInWithGoogle()}
            disabled={authing}
            className={classes.mediaButton}
          >
            <img src={google} alt="Google" />
          </button>
          <button
            onClick={() => signInWithFacebook()}
            disabled={authing}
            className={classes.facebookImg}
          >
            <img src={facebook} alt="Facebook" />
          </button>
        </div>

        <p className={classes.signUpText}>
          Already have an account? <Link to="/login"  className={classes.signUpTextLink}>Sign In here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
