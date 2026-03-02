import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";
import "./Intro.css";

const Intro = () => {
    const { authState } = useAuth();

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_OUT) {
        return <Redirect to="/logowanie" />;
    }

    return (
        <>
            <div className="intro-container">
                <div className="intro-content">
                    <div className="intro-header">
                        <h1 className="intro-title">Witamy w Mobilnej Książce Kucharskiej!</h1>
                        <div className="intro-divider"></div>
                    </div>

                    <div className="intro-description">
                        <p className="intro-text">
                            Przed Tobą aplikacja, która służy jako niezastąpione narzędzie w kuchni.
                        </p>
                        <p className="intro-text">
                            Znajdziesz tutaj funkcję do wyszukiwania przepisów za pomocą wybranych
                            składników, zalecenia i porady odnośnie przygotowywania wielu produktów oraz
                            minutnik.
                        </p>
                    </div>

                    <div className="intro-tips">
                        <h2 className="intro-tips-title">W trakcie gotowania pamiętaj o tym, że:</h2>
                        <div className="intro-tips-list">
                            <div className="intro-tip-item">
                                <span className="intro-tip-number">1</span>
                                <p className="intro-tip-text">
                                    Każdy rodzaj mięsa możesz zastąpić innym rodzajem mięsa (np.
                                    polędwicę wieprzową piersią z kurczaka).
                                </p>
                            </div>
                            <div className="intro-tip-item">
                                <span className="intro-tip-number">2</span>
                                <p className="intro-tip-text">
                                    Możesz zmieniać ilość składników w przepisach zachowując ich
                                    proporcje.
                                </p>
                            </div>
                            <div className="intro-tip-item">
                                <span className="intro-tip-number">3</span>
                                <p className="intro-tip-text">
                                    Nie obawiaj się eksperymentować.
                                </p>
                            </div>
                            <div className="intro-tip-item">
                                <span className="intro-tip-number">4</span>
                                <p className="intro-tip-text">
                                    Nie zawsze to co smaczne, musi pięknie wyglądać.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Intro;