
const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        console.log('form submitting');
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

    }
    return (
        <div>
            <h2 className="text-5xl text-center text-blue-600 my-5">Register Now</h2>
           <div className=" md:w-1/2 mx-auto">
           <form onSubmit={handleRegister}>
                <input className="w-2/3 bg-gray-300 border mb-4 px-2 py-2 font-bold" type="email" name="email" placeholder="Email" id="" />
                <br />
                <input className="w-2/3 bg-gray-300 border mb-4 px-2 py-2 font-bold" type="password" name="password" placeholder="Password" id="" />
                <br />
                <input className="btn btn-primary w-2/3 border mb-4 px-2 py-2 font-bold" type="submit" value="Submit" />
             </form>
           </div>
        </div>
    );
};

export default Register;