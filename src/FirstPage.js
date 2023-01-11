import React from "react";
import './first.css';


function FirstPage(props) {
    function goToNextPage() {
        props.setShowCategoryPage(true)
        props.setShowFirstPage(false)
    }

    return(
        <div>
            <img className="bg-img" style={{opacity: 1, height: "100%"}} src={require("./opening.gif")} alt=""></img>
            <div className="navbar">
                <div className="logo"><img src={require("./quizzicallogo.png")} alt=""></img></div>
                {/* <div className="more-info">
                    <div className="about">About</div>
                    <div className="contact">Contact us</div>
                </div> */}
            </div>

            <main>
                <h1 style={{color: "white", fontSize: "60px"}}>Welcome to Quizzical</h1>
                <div style={{height: "50px", marginTop: "40px"}} onClick={() => goToNextPage()} className="start">Start now</div>
            </main>
        </div>
    )
}


export default FirstPage