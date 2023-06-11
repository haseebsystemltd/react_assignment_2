import React from "react";

import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container">
                    <a className="navbar-brand" href="#">Crypto Exchange</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <NavLink exact="true" to="/" className={'nav-link'}>Home</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink exact="true" to="/blog" className={'nav-link'}>Blog</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            { !props.authenticatedUser && 
                                <>
                                    <li className="nav-item">
                                        <NavLink exact="true" to="/login" className={'nav-link'} >Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact="true" to="/register" className={'nav-link'} >Signup</NavLink>
                                    </li>
                                </>
                            }
                            { props.authenticatedUser && 
                                <li className="nav-item">
                                    <NavLink exact="true" to="/logout" className={'nav-link'} >Logout</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;