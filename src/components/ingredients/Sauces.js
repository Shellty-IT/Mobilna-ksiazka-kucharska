import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Loader from "../loader/Loader";
import "./Sauces.css";

const SAUCES = [
    { id: 3, name: "Sos serowy", path: "/funkcje/znajdz/przepisy/3" },
    { id: 2, name: "Sos czosnkowy", path: "/funkcje/znajdz/przepisy/2" },
    { id: 6, name: "Sos winegret", path: "/funkcje/znajdz/przepisy/6" },
    { id: 8, name: "Sos tzaziki", path: "/funkcje/znajdz/przepisy/8" },
];

const Sauces = () => {
    const { authState } = useAuth();

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_OUT) {
        return <Redirect to="/logowanie" />;
    }

    return (
        <div className="sauces-container">
            <h1 className="sauces-title">Jakiego sosu potrzebujesz do przepisu?</h1>
            <ul className="sauces-list">
                {SAUCES.map((sauce) => (
                    <li key={sauce.id} className="sauce-item">
                        <Link to={sauce.path} className="sauce-link">
                            {sauce.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sauces;