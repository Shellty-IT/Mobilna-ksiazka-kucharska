import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVarious } from "../../Api";
import "./Single.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import How from "../how/How";
import { useAuth, authStates } from "../../provider/AuthProvider";
import Loader from "../loader/Loader";

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    section: {
        marginTop: theme.spacing(3),
    },
}));

const PageTitle = ({ children }) => (
    <Typography variant="h4" component="h1" gutterBottom>
        {children}
    </Typography>
);

const Section = ({ title, children }) => {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body1" color="textSecondary">{children}</Typography>
        </div>
    );
};

const ExpandableSection = ({ title, children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.section}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: open })}
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label="pokaż więcej"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Typography variant="body1" color="textSecondary">{children}</Typography>
            </Collapse>
        </div>
    );
};

const VariousDetails = ({ item }) => (
    <Container maxWidth="md">
        <Card>
            <CardContent>
                <PageTitle>{item.name}</PageTitle>
                <Section title="Sposób przygotowania">{item.description}</Section>
                {(item.values || item.values2) && (
                    <ExpandableSection title="Wartości zdrowotne">
                        <>
                            {item.values && <div>{item.values}</div>}
                            {item.values2 && <div style={{ marginTop: 8 }}>{item.values2}</div>}
                        </>
                    </ExpandableSection>
                )}
            </CardContent>
        </Card>
    </Container>
);

const SingleVarious = () => {
    const { authState } = useAuth();
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const list = await getVarious();
            const found = list.find((v) => v.number === parseInt(slug, 10));
            if (active) {
                setItem(found || null);
                setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [slug]);

    if (authState === authStates.INITIAL_VALUE || loading) return <Loader />;
    if (!item) return <Container maxWidth="md"><Typography variant="h6">Nie znaleziono</Typography></Container>;

    return (
        <div className="single-page">
            <How />
            <VariousDetails item={item} />
        </div>
    );
};

export default SingleVarious;