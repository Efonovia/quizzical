import React from "react";
import { nanoid } from "nanoid"
import Category from "./Category";
import './categorypage.css'


function CategoryPage(props) {
    let categoriesData = props.categoriesData

    function goToNextPage() {
        props.setShowCategoryPage(false)
        props.setShowSelectionPage(true)
        window.scrollTo(0, 0);
    }

    function selectCategory(thisCategory) {
        props.setCategoriesData(prevCategoriesData => prevCategoriesData.map(category => {
            if(category === thisCategory) {
                return {
                    ...category,
                    isClicked: true,
                }
            } else {
                return {
                    ...category,
                    isClicked: false,
                }
            }
        }))
    }

    let categoryElements = categoriesData.map(category => {
        return <Category
            id={category.id}
            key={nanoid()}
            name={category.title}
            isClicked={category.isClicked}
            handleClick={() => selectCategory(category)}
            setSelectedCategory={props.setSelectedCategory}
            icon={category.icon}
        />
    })

    return(
        <div>
            <img className="bg-img" style={{opacity: 1, filter: "brightness(70%)", height: "95%"}} src="https://images.pexels.com/photos/4126712/pexels-photo-4126712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""></img>
            <div className="navbar">
                <div className="logo"><img src={require("./quizzicallogo.png")} alt=""></img></div>
                {/* <div className="more-info">
                    <div className="about">About</div>
                    <div className="contact">Contact us</div>
                </div> */}
            </div>

            <main>
                <h1 style={{color: "white"}}>Test Your Knowledge on a wide range of Questions</h1>
                <p>Put your trivia skills to the test with our wide variety of fun and challenging quizzes in every category, from science and history to pop culture and entertainment. Prove you know it all and have a blast doing it!</p>
            </main>

            <div className="category-section">
                <h2 style={{textAlign: 'center'}}>Select a category below</h2>
                <div className="categories-box">{categoryElements}</div>
                <div onClick={goToNextPage} className="next">Next</div>
            </div>
        </div>
    )
}


export default CategoryPage