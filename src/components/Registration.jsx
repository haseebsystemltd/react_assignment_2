import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./banner";

function Register(props) {

    const [fullname, setfullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [cnic, setCnic] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    function signupFormValidator() {

        let errorList = { ...errors }
        let errorStatus = false
        if (fullname == '') {
            errorList['fullname'] = 'Fullname required';
            errorStatus = true;
        }
        if (email == '') {
            errorList['email'] = 'Email required';
            errorStatus = true;
        }
        if (password == '') {
            errorList['password'] = 'Password required';
            errorStatus = true;
        }
        if (address == '') {
            errorList['address'] = 'Address required';
            errorStatus = true;
        }

        setErrors(errorList);

        return errorStatus;

    }

    function signupFormSubmition(e) {
        e.preventDefault();
        if (!signupFormValidator()) {
           
            let newUser = {
                name: fullname,
                email: email,
                password: password,
                address: address,
                status: "active",
                loginAttempts: 0,
            }
            
            props.newUser(newUser);

            navigate('/login');
        }
    }
    return (
        <>
            <Banner pageTitle="Registration" />
            <div className="card login_card">
                <form onSubmit={signupFormSubmition} >

                    <div className="form-group">
                        <label >Full Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.hasOwnProperty('fullname') ? 'is-invalid' : ''} `}
                            name="fullname"
                            value={fullname}
                            onChange={(e) => setfullname(e.target.value)}
                        />
                        {errors.hasOwnProperty('fullname') ?
                            <div id="validationServer03Feedback" className="invalid-feedback">
                                {errors.fullname}
                            </div> : ""
                        }
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.hasOwnProperty('email') ? 'is-invalid' : ''} `}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.hasOwnProperty('email') ?
                            <div id="validationServer03Feedback" className="invalid-feedback">
                                {errors.email}
                            </div> : ""
                        }
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input
                            type="password"
                            className={`form-control " ${errors.hasOwnProperty('password') ? 'is-invalid' : ''} `}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.hasOwnProperty('password') ?
                            <div id="validationServer03Feedback" className="invalid-feedback">
                                {errors.password}
                            </div> : ""
                        }
                    </div>
                    <div className="form-group">
                        <label>Home Address</label>
                        <input
                            type="text"
                            className={`form-control ${errors.hasOwnProperty('password') ? 'is-invalid' : ''} `}
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.hasOwnProperty('address') ?
                            <div id="validationServer03Feedback" className="invalid-feedback">
                                {errors.address}
                            </div> : ""
                        }
                    </div>
                    <div className="form-group">
                        <label >CNIC Document</label>
                        <input
                            type="file"
                            className="form-control"
                            name="cnic"
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </>
    );
}

export default Register;