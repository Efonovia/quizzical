import React from "react";
import questionsData from './questions'
import Question from "./Question";
import {nanoid} from "nanoid"


function App() {
    const [showHomePage, setShowHomePage] = React.useState(true)
    const [showQuestionsPage, setShowQuestionsPage] = React.useState(false)
    const [checkAnswersClicked, setCheckAnswersClicked] = React.useState(false)
    const [answerSheet, setAnswerSheet] = React.useState([])
    const [score, setScore] = React.useState(0)

    function handleStartClicked() {
        setShowHomePage(false)
        setShowQuestionsPage(true)
    }

    let playerAnswers = {}
    for(let i = 0; i < questionsData.results.length; i++) {
        playerAnswers[`question${i}`] = `answer${i}`
    }

    const getAnswers = (answer, key) => playerAnswers[key] = answer

    function showAnswers() {
        setCheckAnswersClicked(true)
        let correctAnswers = []
        questionsData.results.forEach(question => {
            correctAnswers.push(question.correct_answer)
        })

        for(let i=0; i < questionsData.results.length; i++) {
            if(playerAnswers[`question${i}`] === correctAnswers[i]) {
                setScore(prevScore => prevScore += 1)
                setAnswerSheet(prevState => {
                    return [
                        ...prevState,
                        {
                            playerAnswer: playerAnswers[`question${i}`],
                            correctAnswer: correctAnswers[i],
                            isPlayerCorrect: true,
                        }
                    ]
                })
            } else {
                setAnswerSheet(prevState => {
                    return [
                        ...prevState,
                        {
                            playerAnswer: playerAnswers[`question${i}`],
                            correctAnswer: correctAnswers[i],
                            isPlayerCorrect: false,
                        }
                    ]
                })  
            }
        }
    }


    function setID(index) {
        let idArr = []
        for(let i = 0; i < questionsData.results.length; i++) {
            idArr.push(`question${i}`)
        }
        return idArr[index]
    }

    function determineScoreColor(num) {
        if(num <= 2) return {color: '#ff1b1b'}
        if(num >= 3 && num <= 5) return {color: '#ff8800'}
        if(num >= 6 && num <= 8) return {color: '#d9ff00'}
        if(num === 9 || num === 10) return {color: '#00ff37'}
    }

    const questionElements = questionsData.results.map((questionData, i) => {
        return <Question 
                key={nanoid()}
                id={setID(i)}
                questionData={questionData}
                getAnswers={getAnswers}
                checkAnswersClicked={checkAnswersClicked}
                answerSheet={answerSheet[i]}
            />
    })
    return(
        <div>
            <div className="top-right-blob"></div>
            <div className="bottom-left-blob"></div>
            {showHomePage && <div className="start-page">
                <div className="info-container">
                    <div className="title">Quizzical</div>
                    <div className="instructions">Some description if needed</div>
                    <div onClick={handleStartClicked} className="start-quiz-button">Start Quiz</div>
                </div>
            </div>}
            {showQuestionsPage && <div>
                <div className="questions-page">
                    {questionElements}
                </div>
                {checkAnswersClicked && <div className="remarks">You scored <span style={determineScoreColor(score)} class="score">{score}</span>/{questionsData.results.length} correct questions</div>}                
                {<div onClick={showAnswers} style={{left: checkAnswersClicked && '920px'}} className="check-answers-button">{checkAnswersClicked ? 'Play Again' : 'Check Answers'}</div>}
            </div>}
        </div>
    )
}


export default App