import React from "react";
import { nanoid } from "nanoid"


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
        return <div key={nanoid()} style={{background: option.isClicked ? '#5248da' : '#f5f6fa'}} onClick={() => handleOptionClicked(option)} className="option">{option.optionText}</div>
         
    })

    let markedOptionElements = []
    
    if(props.checkAnswersClicked) {
        allOptions.forEach(option => {
            if (props.answerSheet.correctAnswer === option.optionText) {
                markedOptionElements.push(<div key={nanoid()} style={{background: '#62f362'}} className="option">{option.optionText}</div>)
            } else if((option.optionText !== props.answerSheet.correctAnswer) && (option.optionText !== props.answerSheet.playerAnswer)){
                markedOptionElements.push(<div key={nanoid()} style={{background: 'white'}} className="option">{option.optionText}</div>)
            } else if(props.answerSheet.correctAnswer !== props.answerSheet.playerAnswer){
                markedOptionElements.push(<div key={nanoid()} style={{background: '#f85151'}} className="option">{option.optionText}</div>)
            }
        })
    }


    return(
        <div>
            <div className="question-area">
                <div className="question-text">{props.questionData.question}</div>
                    <div className="option-area">
                        {props.checkAnswersClicked ? markedOptionElements : optionElements}
                    </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}


export default Question