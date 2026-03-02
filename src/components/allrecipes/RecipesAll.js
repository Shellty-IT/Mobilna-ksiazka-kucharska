import React, { useState, useEffect } from "react";
import { getRecipes } from "../../Api";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Loader from "../loader/Loader";
import "./RecipesAll.css";

const RecipesAll = () => {
    const { authState } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [recipeAll, setRecipesAll] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getRecipes();
            setRecipes(result);
            setRecipesAll(result);
        }
        fetchData();
    }, []);

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_OUT) {
        return <Redirect to="/logowanie" />;
    }

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = recipeAll.filter((recipe) =>
            recipe.name.toLowerCase().includes(query)
        );
        setRecipes(filtered);
    };

    return (
        <div className="recipes-all-wrapper">
            <Container className="recipes-all-container" maxWidth="md">
                <div className="recipes-all-header">
                    <h1 className="recipes-all-title">Lista wszystkich przepisów</h1>
                    <p className="recipes-all-subtitle">Przeglądaj i wyszukuj swoje ulubione przepisy</p>
                </div>

                <div className="recipes-all-search">
                    <TextField
                        className="recipes-all-search-input"
                        id="standard-basic"
                        label="Szukaj przepisu..."
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>

                <Card className="recipes-all-card">
                    <List component="nav" className="recipes-all-list">
                        {recipes && recipes.length > 0 ? (
                            recipes.map((data, index) => (
                                <Link
                                    key={index}
                                    to={"/funkcje/znajdz/przepisy/" + data.number}
                                    className="recipes-all-link"
                                >
                                    <ListItem className="recipes-all-list-item" button>
                                        <div className="recipes-all-item-number">{index + 1}</div>
                                        <ListItemText
                                            primary={data.name}
                                            className="recipes-all-item-text"
                                        />
                                        <div className="recipes-all-item-arrow">→</div>
                                    </ListItem>
                                </Link>
                            ))
                        ) : (
                            <div className="recipes-all-empty">
                                <p>Nie znaleziono przepisów</p>
                            </div>
                        )}
                    </List>
                </Card>
            </Container>
        </div>
    );
};

export default RecipesAll;