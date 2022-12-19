let questions = {
    response_code:0,
    results:[
        {
            category:"Art",
            type:"multiple",
            difficulty:"hard",
            question:"What French sculptor designed the Statue of Liberty? ",
            correct_answer:"Fr&eacute;d&eacute;ric Auguste Bartholdi",
            incorrect_answers:[
                "Jean-L&eacute;on G&eacute;r&ocirc;me",
                "Auguste Rodin",
                "Henri Matisse"
                ]
        },
        {
            category:"Entertainment: Music",
            type:"multiple",
            difficulty:"medium",
            question:"Which of these is the name of an American psychedelic rock band formed in 2002 by Benjamin Goldwasser and Andrew VanWyngarden?",
            correct_answer:"MGMT",
            incorrect_answers:[
                "MSTRKRFT",
                "STRFKR",
                "SBTRKT"
                ]
        },
        {
            category:"Politics",
            type:"multiple",
            difficulty:"hard",
            question:"Which letter do you need to have on a European driver license in order to ride any motorbikes?",
            correct_answer:"A",
            incorrect_answers:[
                "X",
                "D",
                "B"
            ]
        },
                
        {
            category:"General Knowledge",
            type:"multiple",
            difficulty:"easy",
            question:"The New York Times slogan is,&ldquo;All the News That&rsquo;s Fit to&hellip;&rdquo;",
            correct_answer:"Print",
            incorrect_answers:[
                "Digest",
                "Look",
                "Read"
            ]
        },
                
        {
            category:"Entertainment: Board Games",
            type:"boolean",
            difficulty:"hard",
            question:"The board game Go has more possible legal positions than the number of atoms in the visible universe.",
            correct_answer:"True",
            incorrect_answers:["False"]
        },
                
        {
            category:"Sports",
            type:"multiple",
            difficulty:"medium",
            question:"What year was hockey legend Wayne Gretzky born?",
            correct_answer:"1961",
            incorrect_answers:[
                "1965",
                "1959",
                "1963"
            ]
        },
                
        {
            category:"History",
            type:"multiple",
            difficulty:"easy",
            question:"How old was Adolf Hitler when he died?",
            correct_answer:"56",
            incorrect_answers:[
                "43",
                "65",
                "47"
            ]
        },
                
        {
            category:"Entertainment: Television",
            type:"multiple",
            difficulty:"medium",
            question:"Which WWF wrestler had the nickname &quot;The Ayatollah of Rock &#039;N&#039; Rolla&quot;?",
            correct_answer:"Chris Jericho",
            incorrect_answers:[
                "Marty Jannetty",
                "Scott Hall",
                "Shawn Michaels"
            ]
        },
                
        {
            category:"Entertainment: Books",
            type:"multiple",
            difficulty:"hard",
            question:"Which author co-wrote &quot;The Communist Manifesto&quot; alongside Karl Marx?",
            correct_answer:"Friedrich Engels",
            incorrect_answers:[
                "Robert Owen",
                "Alexander Kerensky",
                "Paul Lafargue"
            ]
        },
                
        {
            category:"Science: Computers",
            type:"boolean",
            difficulty:"hard",
            question:"The T-Mobile Sidekick smartphone is a re-branded version of the Danger Hiptop.",
            correct_answer:"True",
            incorrect_answers:["False"]
        }
    ]
}

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

questions.results.forEach(result => {
    result.allOptions = arrangeOptions(result.correct_answer, result.incorrect_answers)
})

export default questions