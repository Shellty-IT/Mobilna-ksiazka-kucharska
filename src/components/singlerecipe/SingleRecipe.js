import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipes } from "../../Api";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";
import "./SingleRecipe.css";

const SingleRecipe = () => {
    const { authState } = useAuth();
    const { slug } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getRecipes();
            setRecipes(result);
        }
        fetchData();
    }, []);

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    const recipe = recipes.find((r) => r.number === parseInt(slug, 10));

    if (!recipe) return null;

    return (
        <div className="single-recipe-wrapper">
            <Container key={recipe.number} maxWidth={"md"} className="single-recipe-container">
                <Card className="single-recipe-card">
                    <div className="single-recipe-header">
                        <h1 className="single-recipe-title">{recipe.name}</h1>
                    </div>
                    <div className="single-recipe-content">
                        <div className="single-recipe-section">
                            <div className="single-recipe-section-header">
                                <span className="single-recipe-icon" role="img" aria-label="Pot">🥘</span>
                                <h2 className="single-recipe-section-title">Składniki</h2>
                            </div>
                            <ul className="single-recipe-ingredients">
                                {recipe.composition.map((ingredient, index) => (
                                    <li key={index} className="single-recipe-ingredient-item">
                                        <span className="single-recipe-ingredient-bullet">•</span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="single-recipe-section">
                            <div className="single-recipe-section-header">
                                <span className="single-recipe-icon" role="img" aria-label="Chef">👨‍🍳</span>
                                <h2 className="single-recipe-section-title">Sposób przygotowania</h2>
                            </div>
                            <div className="single-recipe-description">
                                {recipe.description}
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default SingleRecipe;