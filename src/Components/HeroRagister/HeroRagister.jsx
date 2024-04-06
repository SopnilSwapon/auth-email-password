import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoIosEyeOff,  IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroRagister = () => {
  const [registerError, setRegisterError] = useState('');
  const [regSucces, setRegSuccess] = useState('');
  const [passShow, setPassShow] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, email, password, terms);
        // clear error and success
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
        else if(!terms){
          setRegisterError('Please accept our terms & condition');
          return
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user);
          setRegSuccess('Successfully created this email account');
          // updated profile //
          updateProfile(result.user, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
          // sent email verifications //
          sendEmailVerification(result.user)
          .then(() => {
            alert('checked your email & verify your account');
          })
          .catch(error=> {
            console.log(error);
          })
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
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
        </div>
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
        <div className="flex items-center gap-2">
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms"><a href="/">accepts our terms & condition</a></label>
        </div>
        <div className="form-control">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div>
          <Link to='/login'>Have an account? Go to login</Link>
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