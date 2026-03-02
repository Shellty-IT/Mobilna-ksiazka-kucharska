import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./Seek.css";
import { getRecipes } from "../../Api";
import Recipes from "../recipes/Recipes";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";

const Seek = () => {
    const { authState } = useAuth();
    const [state, setState] = useState({
        Jajka: false,
        Ziemniaki: false,
        Brokul: false,
        Cebula: false,
        Czosnek: false,
        Kurczak: false,
        Wolowina: false,
        Wieprzowina: false,
        Mielone: false,
        Papryka: false,
        Marchew: false,
        MakaZiemniaczana: false,
        MakaPszenna: false,
        Twarog: false,
        SerZolty: false,
        SerFeta: false,
        PomidoryZpuszki: false,
        Cukinia: false,
        Kukurydza: false,
        FasolaCzerwona: false,
    });
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState(false);
    const [recipesShow, setRecipesShow] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getRecipes();
            setRecipes(result);
        }
        fetchData();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        const selectedIngredients = Object.entries(state)
            .filter(([_, checked]) => checked)
            .map(([name]) => name);

        const helpTab = recipes.filter(recipe => {
            const matchCount = selectedIngredients.filter(ingredient =>
                recipe.ingredients.includes(ingredient)
            ).length;
            return matchCount >= 2;
        });

        if (helpTab.length < 1) {
            setAlert(true);
        } else {
            setAlert(false);
        }

        handleSort(helpTab, selectedIngredients);
    };

    const handleSort = (helpTab, selectedIngredients) => {
        const sorted = [...helpTab].sort((a, b) => {
            const countA = a.ingredients.filter(ing => selectedIngredients.includes(ing)).length;
            const countB = b.ingredients.filter(ing => selectedIngredients.includes(ing)).length;
            return countB - countA;
        });

        setRecipesShow(sorted);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setAlert(false);
    };

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_OUT) {
        return <Redirect to="/logowanie" />;
    }

    return (
        <div className="seek-wrapper">
            <Container className="seek-container" maxWidth={"lg"}>
                <div className="seek-header">
                    <h2 className="seek-title">
                        Proszę wybrać składniki, z których zamierzasz stworzyć danie
                    </h2>
                    <p className="seek-subtitle">Wybierz co najmniej 2 składniki, aby znaleźć przepisy</p>
                </div>

                <div className="seek-cards-grid">
                    <Card className="seek-card">
                        <div className="seek-card-image-container">
                            <img
                                className="seek-card-image"
                                src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2104&q=80"
                                alt="Warzywa"
                            />
                            <div className="seek-card-gradient"></div>
                            <Typography className="seek-card-header-title" variant="h4">
                                Warzywa
                            </Typography>
                        </div>

                        <CardContent className="seek-card-content">
                            <div className="seek-checkbox-grid">
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Brokul}
                                            onChange={handleChange}
                                            name="Brokul"
                                        />
                                    }
                                    label="Brokuł"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Papryka}
                                            onChange={handleChange}
                                            name="Papryka"
                                        />
                                    }
                                    label="Papryka"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Czosnek}
                                            onChange={handleChange}
                                            name="Czosnek"
                                        />
                                    }
                                    label="Czosnek"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Cebula}
                                            onChange={handleChange}
                                            name="Cebula"
                                        />
                                    }
                                    label="Cebula"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.PomidoryZpuszki}
                                            onChange={handleChange}
                                            name="PomidoryZpuszki"
                                        />
                                    }
                                    label="Pomidory z puszki"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Cukinia}
                                            onChange={handleChange}
                                            name="Cukinia"
                                        />
                                    }
                                    label="Cukinia"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Marchew}
                                            onChange={handleChange}
                                            name="Marchew"
                                        />
                                    }
                                    label="Marchew"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Ziemniaki}
                                            onChange={handleChange}
                                            name="Ziemniaki"
                                        />
                                    }
                                    label="Ziemniaki"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Kukurydza}
                                            onChange={handleChange}
                                            name="Kukurydza"
                                        />
                                    }
                                    label="Kukurydza"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.FasolaCzerwona}
                                            onChange={handleChange}
                                            name="FasolaCzerwona"
                                        />
                                    }
                                    label="Czerwona fasola"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="seek-card">
                        <div className="seek-card-image-container">
                            <img
                                className="seek-card-image"
                                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                alt="Mięso"
                            />
                            <div className="seek-card-gradient"></div>
                            <Typography className="seek-card-header-title" variant="h4">
                                Mięso
                            </Typography>
                        </div>
                        <CardContent className="seek-card-content">
                            <div className="seek-checkbox-grid">
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Wolowina}
                                            onChange={handleChange}
                                            name="Wolowina"
                                        />
                                    }
                                    label="Wołowina"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Wieprzowina}
                                            onChange={handleChange}
                                            name="Wieprzowina"
                                        />
                                    }
                                    label="Wieprzowina"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Kurczak}
                                            onChange={handleChange}
                                            name="Kurczak"
                                        />
                                    }
                                    label="Pierś z kurczaka"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Mielone}
                                            onChange={handleChange}
                                            name="Mielone"
                                        />
                                    }
                                    label="Mięso mielone"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="seek-card">
                        <div className="seek-card-image-container">
                            <img
                                className="seek-card-image"
                                src="https://images.unsplash.com/photo-1591981131950-2ed961d0490e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                alt="Inne"
                            />
                            <div className="seek-card-gradient"></div>
                            <Typography className="seek-card-header-title" variant="h4">
                                Inne
                            </Typography>
                        </div>
                        <CardContent className="seek-card-content">
                            <div className="seek-checkbox-grid">
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Jajka}
                                            onChange={handleChange}
                                            name="Jajka"
                                        />
                                    }
                                    label="Jajka"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.SerZolty}
                                            onChange={handleChange}
                                            name="SerZolty"
                                        />
                                    }
                                    label="Ser żółty"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.MakaPszenna}
                                            onChange={handleChange}
                                            name="MakaPszenna"
                                        />
                                    }
                                    label="Mąka pszenna"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.MakaZiemniaczana}
                                            onChange={handleChange}
                                            name="MakaZiemniaczana"
                                        />
                                    }
                                    label="Mąka ziemniaczana"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.Twarog}
                                            onChange={handleChange}
                                            name="Twarog"
                                        />
                                    }
                                    label="Twaróg"
                                />
                                <FormControlLabel
                                    className="seek-checkbox-label"
                                    control={
                                        <Checkbox
                                            className="seek-checkbox"
                                            checked={state.SerFeta}
                                            onChange={handleChange}
                                            name="SerFeta"
                                        />
                                    }
                                    label="Ser feta"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {recipesShow && <Recipes recipes={recipesShow} />}
                {alert && window.alert("Proszę zaznaczyć większą ilość składników")}

                <div className="seek-buttons">
                    <Button
                        className="seek-button seek-button-primary"
                        variant="contained"
                        onClick={handleClick}
                        color="primary"
                    >
                        Wyszukaj przepisy
                    </Button>

                    <Link to="/funkcje/znajdz/sosy" className="seek-link">
                        <Button
                            className="seek-button seek-button-secondary"
                            variant="contained"
                            color="primary"
                        >
                            Sosy, które często występują w przepisach
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Seek;