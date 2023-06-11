import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Banner from "./banner";

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {

        const timeout = setTimeout(() => {
            props.setLoginError("");
          }, 2000);
    
          return () => clearTimeout(timeout);
      }, []);

    function signupFormValidator() {

        let errorList = { ...errors }
        let errorStatus = false
        if (email == '') {
            errorList['email'] = 'Email required'
            errorStatus = true;
        }
        if (password == '') {
            errorList['password'] = 'Password required'
            errorStatus = true;
        }

        setErrors(errorList);
        return errorStatus;

    }

    function signupFormSubmition(e) {
        e.preventDefault();
        if (!signupFormValidator()) {
            props.loginHandler({
                email: email,
                password: password
            });
        }
    }
    return (
        <>
            <Banner pageTitle="Login" />
            <div className="card login_card">
                <form onSubmit={signupFormSubmition} >
                    
                    {props.loginError != '' ?
                        <Alert variant="danger" >
                            <Alert.Heading>{props.loginError}</Alert.Heading>
                        </Alert> : ""
                    }

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

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;