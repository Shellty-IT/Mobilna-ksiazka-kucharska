import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login/Login.css";
import Loader from "./loader/Loader";
import { validateEmailPassword } from "../utils/validators";
import { signUp } from "../firebase/authMethods";
import { useAuth, authStates } from "../provider/authProvider";
import en from "../utils/i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0),
            width: "100%",
        },
    },
}));

const Register = () => {
    const classes = useStyles();
    const { authState } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (values.password !== values.confirmPassword) {
            setError(en.ERRORS.PASSWORD_MISMATCH);
            return;
        }

        const errorMsg = validateEmailPassword(values.email, values.password);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setLoading(true);
        setError("");

        try {
            await signUp(values.email, values.password);
        } catch (e) {
            const errorMessages = {
                "auth/email-already-in-use": "Ten adres e-mail jest już zajęty",
                "auth/invalid-email": "Nieprawidłowy adres e-mail",
                "auth/weak-password": "Hasło jest za słabe (min. 6 znaków)",
                "auth/operation-not-allowed": "Rejestracja jest wyłączona",
                "auth/network-request-failed": "Błąd sieci. Sprawdź połączenie",
            };
            setError(errorMessages[e.code] || `Błąd rejestracji: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (authState === authStates.LOGGED_IN) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-wrapper">
            <Container className="login-container" maxWidth={false}>
                <div className="login-header">
                    <h1 className="login-title">Zarejestruj się</h1>
                    <p className="login-subtitle">Utwórz nowe konto i zacznij gotować!</p>
                </div>
                <div className="login-card">
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleInputChange}
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    id="email-input"
                                    label="Adres e-mail"
                                    variant="outlined"
                                    fullWidth
                                    disabled={loading}
                                    className="login-input"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleInputChange}
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    id="password-input"
                                    label="Hasło"
                                    variant="outlined"
                                    fullWidth
                                    disabled={loading}
                                    className="login-input"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleInputChange}
                                    name="confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    id="confirm-password-input"
                                    label="Potwierdź hasło"
                                    variant="outlined"
                                    fullWidth
                                    disabled={loading}
                                    className="login-input"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <div className="login-error">
                                        <p>{error}</p>
                                    </div>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    className="login-button"
                                >
                                    {loading ? "Rejestracja..." : "Zarejestruj się"}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="login-footer">
                                    <p className="login-footer-text">{en.FORM_FIELDS.SIGNUP_ALT_TEXT}</p>
                                    <Link to="/logowanie" className="login-register-link">
                                        Zaloguj się
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Register;