import React from "react";
import { nanoid } from "nanoid"
import './new-questionpage.css'


function Question(props) {
    const [allOptions, setAllOptions] = React.useState(props.questionData.allOptions)

    function handleOptionClicked(opt) {
        setAllOptions(prevAllOptions => prevAllOptions.map(option => {
            if(opt === option) {
                return {
                    ...opt,
                    isClicked: !opt.isClicked
                }
            }
            return {
                ...option,
                isClicked: false,
            }
        }))
        props.getAnswers(opt.optionText, props.id)
    }

    let optionElements = allOptions.map(option => {
        return <div key={nanoid()} 
        style={{
            background: option.isClicked ? 'black' : 'rgb(132, 133, 241)',
            color: 'white',
        }} 
        onClick={() => handleOptionClicked(option)} 
        className="option">{decodeURIComponent(option.optionText)}</div>
         
    })

    let markedOptionElements = []
    
    if(props.checkAnswersClicked) {
        allOptions.forEach(option => {
            if (props.answerSheet.correctAnswer === option.optionText) {
                markedOptionElements.push(<div key={nanoid()} style={{background: '#62f362'}} className="option">{decodeURIComponent(option.optionText)}</div>)
            } else if((option.optionText !== props.answerSheet.correctAnswer) && (option.optionText !== props.answerSheet.playerAnswer)){
                markedOptionElements.push(<div key={nanoid()} style={{background: 'gray'}} className="option">{decodeURIComponent(option.optionText)}</div>)
            } else if(props.answerSheet.correctAnswer !== props.answerSheet.playerAnswer){
                markedOptionElements.push(<div key={nanoid()} style={{background: '#f85151'}} className="option">{decodeURIComponent(option.optionText)}</div>)
            }
        })
    }


    return(
        <div>
            <div className="question">
                <h3>{parseInt(props.id[props.id.length-1])+1}.{decodeURIComponent(props.questionData.question)}</h3>
                    <div className="option-container">
                        {props.checkAnswersClicked ? markedOptionElements : optionElements}
                    </div>
                <hr></hr>
            </div>
        </div>
    )
}


export default Question