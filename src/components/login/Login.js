import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import Loader from "../loader/Loader";
import { validateEmailPassword } from "../../utils/validators";
import { signIn } from "../../firebase/authMethods";
import { withAuth, authStates } from "../auth";
import en from "../../utils/i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0),
            width: "100%",
        },
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [values, setValues] = useState({ email: "", password: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        if (error) setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errorMsg = validateEmailPassword(values.email, values.password);

        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        signIn(values.email, values.password)
            .catch((e) => {
                setError("Nieprawidłowy adres e-mail lub hasło");
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
                    <h1 className="login-title">Zaloguj się</h1>
                    <p className="login-subtitle">Witaj ponownie! Zaloguj się do swojego konta</p>
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
                                    Zaloguj
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="login-footer">
                                    <p className="login-footer-text">{en.FORM_FIELDS.LOGIN_ALT_TEXT}</p>
                                    <Link to="/rejestracja" className="login-register-link">
                                        Zarejestruj się
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

export default withAuth(Login);