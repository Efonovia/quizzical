import React from "react";
import './selectionpage.css'


function SelectionPage(props) {
    const [questionSpecs, setQuestionSpecs] = React.useState({
        questionAmount: "",
        questionDifficulty: "",
        questionType: ""
    })

    function arrangeOptions(rightOptions, wrongOptions) {
        let optionArray = []
        optionArray.push({
            optionText: rightOptions,
            isClicked: false,
        })
        wrongOptions.forEach(option => optionArray.push({
            optionText: option,
            isClicked: false,
        }))
        let currentIndex = optionArray.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [optionArray[currentIndex], optionArray[randomIndex]] = [optionArray[randomIndex], optionArray[currentIndex]]
        }
        return optionArray;
    }
    
    

    function goToNextPage() {     
        let questions
        console.log(generateUrl());
        fetch(generateUrl())
        .then(res => res.json())
        .then(data => {
                questions = JSON.parse(JSON.stringify(data))
                questions.results.forEach(result => {
                    result.allOptions = arrangeOptions(result.correct_answer, result.incorrect_answers)
                })
                console.log(questions)
                props.setQuestionsData(questions)
            }
        )

        props.setBanner([
            bannerImage,
            title,
            description,
        ])

        if(questionSpecs.questionAmount >= 5) {
            props.setShowSelectionPage(false)
            props.setShowQuestionsPage(true)
        } 

        window.scrollTo(0, 0);
    } 

    
    
    function handleChange(event) {
        const {value, name} = event.target;
        setQuestionSpecs(prevQuestionSpecs => {
            return {
                ...prevQuestionSpecs,
                [name]: value,
            }
        })
        console.log(questionSpecs, props.selectedCategory)
    }

    function generateUrl() {
        console.log(questionSpecs)
        let amount, difficulty, type, selectedCategory

        difficulty = questionSpecs.questionDifficulty === "" ? "" : `&difficulty=${questionSpecs.questionDifficulty}`
        type = questionSpecs.questionType === "" ? "" : `&type=${questionSpecs.questionType}`
        amount = questionSpecs.questionAmount === "" ? `&amount=${10}` : `&amount=${questionSpecs.questionAmount}`
        selectedCategory = props.selectedCategory === "" ? "" : `&category=${props.selectedCategory}`
        
        return `https://opentdb.com/api.php?${amount}${selectedCategory}${difficulty}${type}&encode=url3986`
    }

    let title, bannerImage, description

    props.categoriesData.forEach(category => {
        if(category.id === props.selectedCategory) {
            title = category.title
            bannerImage = category.bannerImage
            description = category.description  
             
        }
    })
    

    
    return (
        <div>
            <img style={{opacity: 1, height: "90%"}} className="bg-img" src={bannerImage} alt=""></img>
            <div className="navbar">
                <div className="logo"><img src={require("./quizzicallogo.png")} alt=""></img></div>
                {/* <div className="more-info">
                    <div className="about">About</div>
                    <div className="contact">Contact us</div>
                </div> */}
            </div>

            <main>
                <h1 style={{color: "white", fontSize: 54}}>{title}</h1>
                <p>{description}</p>
            </main>

            <div className="selection-section">
                <h2 style={{textAlign: "center"}}>Customize questions below</h2>
                <form>
                    <label htmlFor="questionAmount">Select number of questions: </label>
                    <input required
                        type="number" 
                        name="questionAmount" 
                        min="5" 
                        max="50" 
                        id="questionAmount"
                        onChange={handleChange}
                    ></input><br/>

                    <label htmlFor="questionDifficulty">Select questions difficulty: </label>
                    <select name="questionDifficulty" id="questionDifficulty" onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select><br/>

                    <label htmlFor="questionType">Select questions type:</label>
                    <select name="questionType" id="questionType" onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select><br/>

                </form>
                    <button style={{top: "-245px"}} onClick={goToNextPage}>Confirm</button>
            </div>
        </div>
    )
}


export default SelectionPage