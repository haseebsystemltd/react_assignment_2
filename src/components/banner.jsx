import React from "react";
import './../App.css';

function Banner(props) {

    return (
        <>
            <div className="banner">
                <h1 className="pageTitle">{props.pageTitle}</h1>
            </div>


        </>
    );
}

export default Banner;