import React from "react";
import './new-questionpage.css'


function QuestionPagePreview(props) {
    return(
        <div>
            <img style={{opacity: 1}} className="bg-img" src={props.banner[0]} alt=""></img>
            <div className="navbar">
                <div className="logo"><img src={require("./quizzicallogo.png")} alt=""></img></div>
                {/* <div className="more-info">
                    <div className="about">About</div>
                    <div className="contact">Contact us</div>
                </div> */}
            </div>
            <main>
                <h1 style={{color: "white", fontSize: 54, height: "90%"}}>{props.banner[1]}</h1>
                <p>{props.banner[2]}</p>
            </main>
        </div>
    )
}


export default QuestionPagePreview