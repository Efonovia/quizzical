import React from "react";
import CategoriesData from './categories.json'
import tempQuestionsData from './questions'
import FirstPage from "./FirstPage";
import CategoryPage from "./CategoryPage";
import SelectionPage from "./SelectionPage";
import QuestionPagePreview from "./QuestionPagePreview";
import Question from "./Question";
import {nanoid} from "nanoid"


function App() {
    const [categoriesData, setCategoriesData] = React.useState(JSON.parse(JSON.stringify(CategoriesData.items)))
    const [questionsData, setQuestionsData] = React.useState(tempQuestionsData)
    const [showFirstPage, setShowFirstPage] = React.useState(true)
    const [showCategoryPage, setShowCategoryPage] = React.useState(false)
    const [showSelectionPage, setShowSelectionPage] = React.useState(false)
    const [showQuestionsPage, setShowQuestionsPage] = React.useState(false)
    const [checkAnswersClicked, setCheckAnswersClicked] = React.useState(false)
    const [answerSheet, setAnswerSheet] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [banner, setBanner] = React.useState("")

    function startOver() {
        setShowFirstPage(false)
        setShowCategoryPage(true)
        setShowSelectionPage(false)
        setShowQuestionsPage(false)
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

    const [selectedCategory, setSelectedCategory] = React.useState("")

    function determineScoreColor(num) {
        let percentage = (num/questionsData.results.length)*100
        if(percentage <= 25) return {color: '#381515'}
        if(percentage <= 50 && percentage > 25) return {color: '#ff8800'}
        if(percentage <= 75 && percentage > 50) return {color: '#d9ff00'}
        if(percentage > 75) return {color: '#00ff37'}
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
            {showFirstPage && <FirstPage 
                                        setShowCategoryPage={setShowCategoryPage}
                                        setShowFirstPage={setShowFirstPage}
                                    />}
            {showCategoryPage && <CategoryPage 
                                        setShowCategoryPage={setShowCategoryPage} 
                                        setShowSelectionPage={setShowSelectionPage}
                                        setSelectedCategory={setSelectedCategory}
                                        categoriesData={categoriesData}
                                        setCategoriesData={setCategoriesData}
                                    />}
            {showSelectionPage && <SelectionPage 
                                        setShowSelectionPage={setShowSelectionPage}
                                        setShowQuestionsPage={setShowQuestionsPage} 
                                        selectedCategory={selectedCategory}
                                        setQuestionsData={setQuestionsData}
                                        categoriesData={categoriesData}
                                        setBanner={setBanner}
                                    />}
            {showQuestionsPage && <div>
                <QuestionPagePreview banner={banner}/>
                <div className="question-section">
                    <h2 style={{textAlign: "center"}}>Answer the questions below</h2>
                    <div className="questions-container">
                        {questionElements}
                    {checkAnswersClicked && <div className="remarks">You scored <span style={determineScoreColor(score)} className="score">{score}</span>/{questionsData.results.length} correct questions</div>}
                    {
                        checkAnswersClicked ? 
                        <button onClick={startOver}>{'Play again'}</button> :
                        <button onClick={showAnswers}>{'Submit Quiz'}</button> 
                        }
                    </div>
                </div>
            </div>}
        </div>
    )
}


export default App