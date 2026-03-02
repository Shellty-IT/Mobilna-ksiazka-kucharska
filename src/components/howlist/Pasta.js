import React, { useEffect, useState } from "react";
import { getPasta } from "../../Api";
import { Link } from "react-router-dom";
import How from "../how/How";
import "./Howlist.css";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Loader from "../loader/Loader";

const Pasta = () => {
    const { authState } = useAuth();
    const [pasta, setPasta] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getPasta();
            setPasta(result);
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
                        <h2 className="category-list-title">Wybierz makaron</h2>
                        <p className="category-list-subtitle">Kliknij, aby zobaczyć instrukcję przygotowania</p>
                    </div>
                    <Card className="category-list-card">
                        <List component="nav" className="category-list">
                            {pasta.map((data, index) => (
                                <Link key={index} to={"/funkcje/jak/makarony/" + data.number} className="category-list-link">
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

export default Pasta;