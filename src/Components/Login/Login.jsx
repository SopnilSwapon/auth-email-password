import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [regSucces, setRegSuccess] = useState('');
    const emailRef = useRef(null);
    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
          // clear error and success
          setRegisterError('');
          setRegSuccess('');

        // validations
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            if(result.user.emailVerified){
              setRegSuccess('Successfully logged In');
            }
            else{
              alert('Please verify your email address')
            }
        })
        .catch(error => {
            console.log(error.message);
            setRegisterError(error.message);
        })
    }
    const handleResetPassword = () => {
        console.log('sent email', emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log('please provide an email');
            return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
          console.log('please write a valid email');
          return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert ('Please checked your email')
        })
        .catch(error => {
          console.log(error);
        })
    }
    return (
        <div className="hero p-10 bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold mb-5">Login now!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body p-14">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <div>
            <Link to='/heroRagister'>New? Go to Registration</Link>
        </div>
      </form>
      {
        registerError && <p className="text-red-600">{registerError}</p>
      }
      {
        regSucces && <p className="text-green-500">{regSucces}</p>
      }
    </div>
  </div>
</div>
    );
};

export default Login;