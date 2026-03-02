import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login/Login.css";
import Loader from "./loader/Loader";
import { validateEmailPassword } from "../utils/validators";
import { signUp } from "../firebase/authMethods";
import { withAuth, authStates } from "./auth";
import en from "../utils/i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0),
            width: "100%",
        },
    },
}));

const Register = (props) => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValues({
            ...values,
            [name]: value
        });

        if (error) setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("=== handleSubmit wywołany ===");
        console.log("Email:", values.email);
        console.log("Password length:", values.password.length);

        if (values.password !== values.confirmPassword) {
            setError(en.ERRORS.PASSWORD_MISMATCH);
            return;
        }

        const errorMsg = validateEmailPassword(values.email, values.password);

        if (errorMsg) {
            console.log("Błąd walidacji:", errorMsg);
            setError(errorMsg);
            return;
        }

        console.log("=== Wywołuję signUp ===");

        signUp(values.email, values.password)
            .then((result) => {
                console.log("=== SUKCES ===", result);
            })
            .catch((e) => {
                console.error("=== BŁĄD FIREBASE ===");
                console.error("Kod:", e.code);
                console.error("Wiadomość:", e.message);
                console.error("Cały błąd:", e);
                setError(`Błąd: ${e.code} - ${e.message}`);
            });
    };

    if (props.authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (props.authState === authStates.LOGGED_IN) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <div className="login-wrapper">
            <Container className="login-container" maxWidth={false}>
                <div className="login-header">
                    <h1 className="login-title">Zarejestruj się</h1>
                    <p className="login-subtitle">Utwórz nowe konto i zacznij gotować!</p>
                </div>
                <div className="login-card">
                    <form className={classes.root} noValidate autoComplete="off">
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
                                    onClick={handleSubmit}
                                    variant="contained"
                                    fullWidth
                                    className="login-button"
                                >
                                    Zarejestruj się
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

export default withAuth(Register);