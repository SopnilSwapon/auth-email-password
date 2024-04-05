import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoIosEyeOff,  IoMdEye } from "react-icons/io";

const HeroRagister = () => {
  const [registerError, setRegisterError] = useState('');
  const [regSucces, setRegSuccess] = useState('');
  const [passShow, setPassShow] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, typeof password.length);
        setRegisterError('');
        setRegSuccess('');
        if(password.length < 6) {
          setRegisterError('Password should be at least 6 characters');
          return
        }
        else if(!/[A-Z]/.test(password)){
          setRegisterError('You password should have at least one uppercase character.');
          return
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user);
          setRegSuccess('Successfully created this email account')
        })
        .catch(error => {
          console.log(error.message);
          setRegisterError(error.message)
        })
    }
    return (
        <div>
            <div className="hero p-10 bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center mb-4">Register now!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
            
          </label>
          <input type={passShow ? 'password' : 'text'}  name="password" placeholder="password" className="input input-bordered" required />
          <div onClick={()=>setPassShow(!passShow)} className="absolute top-14 left-56">
          {
            passShow ? <IoIosEyeOff></IoIosEyeOff> : <IoMdEye></IoMdEye>
          }
          </div>
          
        </div>
        <div className="form-control">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
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
        </div>
    );
};

export default HeroRagister;