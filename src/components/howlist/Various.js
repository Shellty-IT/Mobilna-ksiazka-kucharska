import React, { useEffect, useState } from "react";
import { getVarious } from "../../Api";
import { Link } from "react-router-dom";
import How from "../how/How";
import "./Howlist.css";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Loader from "../loader/Loader";

const Various = () => {
    const { authState } = useAuth();
    const [various, setVarious] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getVarious();
            setVarious(result);
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
                        <h2 className="category-list-title">Inne produkty</h2>
                        <p className="category-list-subtitle">Kliknij, aby zobaczyć instrukcję przygotowania</p>
                    </div>
                    <Card className="category-list-card">
                        <List component="nav" className="category-list">
                            {various.map((data, index) => (
                                <Link key={index} to={"/funkcje/jak/inne/" + data.number} className="category-list-link">
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

export default Various;