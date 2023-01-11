import React from "react";
import './categorypage.css'
// import Science from './blue microscope.png'
// import Music from './sound wave.png'
// import Sports from './Male football players greeting each other with handshake on the field.png'
// import math from './maths decoration.png'
// import Computers from './computer with keyboard and mouse.png'
// import Arts from './Girl draws an abstract picture.png'
// import VideoGames from './game controller.png'
// import Animals from './side view of dog looking up.png'


function Category(props) {
    // let images = [Science, Music, Sports, math, Computers, Arts, VideoGames, Animals]
    const style = {
        background: props.isClicked ? '#1d33ff' : 'black',
        color: props.isClicked ? 'white' : 'black'
    }

    function handleClick() {
        props.handleClick()
        props.setSelectedCategory(props.id)
    }


    return(
        <div onClick={handleClick} className="category" style={style}>
            <img style={{marginTop: "70px"}} src={props.icon.src} height={props.icon.height*0.8} width={props.icon.width*0.8} alt=""></img>
            <h3 style={{position: "relative",top: "-50px"}}>{props.name}</h3>
        </div>
    )
}


export default Category