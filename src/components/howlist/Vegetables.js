import React, { useState, useEffect } from "react";
import { getVegetables } from "../../Api";
import { Link } from "react-router-dom";
import How from "../how/How";
import "./Howlist.css";
import { Card } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";

const Vegetables = () => {
    const { authState } = useAuth();
    const [vegetables, setVegetables] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getVegetables();
            setVegetables(result);
        }
        fetchData();
    }, []);

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    return (
        <div className="howlist-page">
            <How />
            <div className="category-list-wrapper">
                <Container maxWidth={"md"} className="category-list-container">
                    <div className="category-list-header">
                        <h2 className="category-list-title">Wybierz warzywo</h2>
                        <p className="category-list-subtitle">Kliknij, aby zobaczyć instrukcję przygotowania</p>
                    </div>
                    <Card className="category-list-card">
                        <List component="nav" className="category-list">
                            {vegetables.map((data, index) => (
                                <Link key={index} to={"/funkcje/jak/warzywa/" + data.number} className="category-list-link">
                                    <ListItem className="category-list-item" button>
                                        <div className="category-list-item-number">{index + 1}</div>
                                        <ListItemText
                                            primary={data.name}
                                            className="category-list-item-text"
                                        />
                                        <div className="category-list-item-arrow">→</div>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default Vegetables;