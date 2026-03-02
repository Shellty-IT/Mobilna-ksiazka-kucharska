import React, { useState } from "react";
import Countdown from "react-countdown";
import { Container, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Loader from "../loader/Loader";
import { Redirect } from "react-router-dom";
import useSound from "use-sound";
import beep from "../../assets/alarm.mp3";
import "./Counterdown.css";

const CounterDown = () => {
    const { authState } = useAuth();
    const [start, setStart] = useState(false);
    const [value, setValue] = useState(0);
    const [play, { stop }] = useSound(beep);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            play();
            return <span className="timer-completed">Czas minął</span>;
        } else {
            return (
                <div className="timer-display">
                    <div className="timer-segment-wrapper">
                        <span className="timer-segment">{String(hours).padStart(2, '0')}</span>
                        <span className="timer-label-small">godz</span>
                    </div>
                    <span className="timer-separator">:</span>
                    <div className="timer-segment-wrapper">
                        <span className="timer-segment">{String(minutes).padStart(2, '0')}</span>
                        <span className="timer-label-small">min</span>
                    </div>
                    <span className="timer-separator">:</span>
                    <div className="timer-segment-wrapper">
                        <span className="timer-segment">{String(seconds).padStart(2, '0')}</span>
                        <span className="timer-label-small">sek</span>
                    </div>
                </div>
            );
        }
    };

    const handleClick = () => {
        if (value > 0) {
            setStart((prev) => !prev);
        } else {
            return "Błędna wartość";
        }
    };

    const handleStop = () => {
        stop();
        setStart((prev) => !prev);
    };

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_OUT) {
        return <Redirect to="/logowanie" />;
    }

    return (
        <div className="countdown-wrapper">
            <Container className="countdown-container" maxWidth="sm">
                <div className="countdown-header">
                    <h2 className="countdown-title">Funkcja minutnika</h2>
                    <p className="countdown-subtitle">Ustaw czas odliczania i śledź swoje gotowanie</p>
                </div>
                <Card className="countdown-card">
                    <div className="countdown-input-section">
                        <label className="countdown-label">
                            Wpisz czas do odliczenia w minutach
                        </label>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            name="czas"
                            type="number"
                            min="0"
                            className="countdown-input"
                            placeholder="0"
                        />
                    </div>

                    <div className="countdown-display-wrapper">
                        {start ? (
                            <Countdown
                                date={Date.now() + value * 60 * 1000}
                                renderer={renderer}
                            />
                        ) : (
                            <div className="countdown-placeholder">
                                <p>Wprowadź czas i naciśnij Start</p>
                            </div>
                        )}
                    </div>

                    <div className="countdown-controls">
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            color="primary"
                            className="countdown-button countdown-button-start"
                        >
                            Start
                        </Button>
                        <Button
                            onClick={handleStop}
                            variant="contained"
                            color="primary"
                            className="countdown-button countdown-button-stop"
                        >
                            Stop
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default CounterDown;