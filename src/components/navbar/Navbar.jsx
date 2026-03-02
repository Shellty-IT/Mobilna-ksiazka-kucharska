import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { useAuth, authStates } from "../../provider/AuthProvider";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import { signOut } from "../../firebase/authMethods";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menu: {
        flexGrow: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: 20,
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const { authState } = useAuth();
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [mobileView, setMobileView] = useState(false);
    const [open, setOpen] = useState(false);
    const isMenuOpen = Boolean(anchorEl1);

    useEffect(() => {
        const setResponsive = () => {
            setMobileView(window.innerWidth < 900);
        };
        setResponsive();
        window.addEventListener("resize", setResponsive);
        return () => window.removeEventListener("resize", setResponsive);
    }, []);

    const handleSignOut = () => {
        signOut().catch((e) => {
        });
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl1(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        handleSignOut();
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl1}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            className="navbar-user-menu"
        >
            <MenuItem onClick={handleLogout} className="navbar-menu-item-logout">
                Wyloguj
            </MenuItem>
        </Menu>
    );

    const displayMobile = () => {
        return (
            <Toolbar className="navbar-toolbar-mobile">
                <div className="navbar-mobile-header">
                    <IconButton
                        edge="start"
                        className="navbar-menu-button"
                        color="inherit"
                        onClick={handleDrawerOpen}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className="navbar-logo-mobile">Książka Kucharska</Typography>
                </div>
                <Drawer
                    variant="persistent"
                    anchor="top"
                    open={open}
                    className="navbar-drawer"
                >
                    <div className="navbar-drawer-content">
                        <IconButton
                            onClick={handleDrawerClose}
                            className="navbar-close-button"
                        >
                            ✕
                        </IconButton>
                        <Link to="/" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Wstęp
                            </MenuItem>
                        </Link>
                        <Link to="/funkcje/znajdz" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Znajdź przepis
                            </MenuItem>
                        </Link>
                        <Link to="/funkcje/jak" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Jak ugotować
                            </MenuItem>
                        </Link>
                        <Link to="/funkcje/znajdz/przepisy" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Wszystkie przepisy
                            </MenuItem>
                        </Link>
                        <Link to="/minutnik" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Minutnik
                            </MenuItem>
                        </Link>
                        <Link to="/logowanie" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Zaloguj
                            </MenuItem>
                        </Link>
                        <Link to="/rejestracja" className="navbar-drawer-link">
                            <MenuItem onClick={handleDrawerClose} className="navbar-drawer-item">
                                Zarejestruj
                            </MenuItem>
                        </Link>
                    </div>
                </Drawer>
            </Toolbar>
        );
    };

    const displayDesktop = () => {
        return (
            <Toolbar className="navbar-toolbar-desktop">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logo-link">
                        Książka Kucharska
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        <Button className="navbar-button">Wstęp</Button>
                    </Link>
                    <Link to="/funkcje/znajdz" className="navbar-link">
                        <Button className="navbar-button">Znajdź przepis</Button>
                    </Link>
                    <Link to="/funkcje/jak" className="navbar-link">
                        <Button className="navbar-button">Jak ugotować</Button>
                    </Link>
                    <Link to="/funkcje/znajdz/przepisy" className="navbar-link">
                        <Button className="navbar-button">Wszystkie przepisy</Button>
                    </Link>
                    <Link to="/minutnik" className="navbar-link">
                        <Button className="navbar-button">Minutnik</Button>
                    </Link>
                </div>

                <div className="navbar-user-section">
                    {authState === authStates.LOGGED_IN ? (
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            className="navbar-user-icon"
                        >
                            <AccountCircle />
                        </IconButton>
                    ) : null}
                </div>
                {renderMenu}
            </Toolbar>
        );
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className="navbar-appbar">
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </div>
    );
};

export default Navbar;