import React from "react";
import Banner from "./banner";

function Dashboard(props) {
    
    return (
        <>
            <Banner pageTitle="Dashboard" />
            <div className="dashboard container">
                <h1 className="mt-5">Welcome to the dashboard</h1>
            </div>
        </>
    );

}

export default Dashboard;