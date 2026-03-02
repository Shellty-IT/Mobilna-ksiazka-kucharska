import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import Loader from "../loader/Loader";
import { validateEmailPassword } from "../../utils/validators";
import { signIn } from "../../firebase/authMethods";
import { useAuth, authStates } from "../../provider/AuthProvider";
import en from "../../utils/i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0),
            width: "100%",
        },
    },
}));

const Login = () => {
    const classes = useStyles();
    const { authState } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ email: "", password: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Login handleSubmit called");
        console.log("Email:", values.email);

        const errorMsg = validateEmailPassword(values.email, values.password);
        if (errorMsg) {
            console.log("Validation error:", errorMsg);
            setError(errorMsg);
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Calling signIn...");
            const result = await signIn(values.email, values.password);
            console.log("SignIn result:", result);
        } catch (e) {
            console.log("SignIn error:", e.code, e.message);
            const errorMessages = {
                "auth/user-not-found": "Nie znaleziono użytkownika",
                "auth/wrong-password": "Nieprawidłowe hasło",
                "auth/invalid-email": "Nieprawidłowy adres e-mail",
                "auth/invalid-credential": "Nieprawidłowy e-mail lub hasło",
                "auth/too-many-requests": "Zbyt wiele prób. Spróbuj później",
                "auth/network-request-failed": "Błąd sieci. Sprawdź połączenie",
            };
            setError(errorMessages[e.code] || `Błąd logowania: ${e.message}`);
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
                    <h1 className="login-title">Zaloguj się</h1>
                    <p className="login-subtitle">Witaj ponownie! Zaloguj się do swojego konta</p>
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
                                    {loading ? "Logowanie..." : "Zaloguj"}
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

export default Login;