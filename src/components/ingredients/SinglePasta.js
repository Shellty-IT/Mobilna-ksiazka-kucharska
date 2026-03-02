import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasta } from "../../Api";
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

const ExpandableSection = ({ title, intro, tips }) => {
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
                <CardContent style={{ paddingLeft: 0 }}>
                    {intro && <Typography paragraph>{intro}</Typography>}
                    {Array.isArray(tips) && tips.length > 0 && (
                        <ul className="tips">
                            {tips.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Collapse>
        </div>
    );
};

const PastaDetails = ({ item }) => (
    <Container maxWidth="sm">
        <Card className="description">
            <CardContent>
                <PageTitle>{item.name}</PageTitle>
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", maxWidth: 400, display: "block", margin: "0 auto 16px" }}
                    />
                )}
                <Section title="Sposób przygotowania">{item.description}</Section>
                <ExpandableSection
                    title="Wskazówki"
                    intro={item.values}
                    tips={[
                        "nie dodawaj oliwy do wody!",
                        "makaron wrzucaj jedynie do wrzącej wody!",
                        "sól dorzuć dopiero wówczas, kiedy woda zacznie wrzeć!",
                        "nie gotuj makaronu na wolnym ogniu!",
                        "nie łam suchego makaronu w krótsze nitki!",
                        "aby dowiedzieć się, czy makaron się ugotował po prostu go ugryź i sprawdź!",
                        "nie przepłukuj makaronu zimną wodą!",
                        "nie zwlekaj z podawaniem!",
                    ]}
                />
            </CardContent>
        </Card>
    </Container>
);

const SinglePasta = () => {
    const { authState } = useAuth();
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const list = await getPasta();
            const found = list.find((v) => v.number === parseInt(slug, 10));
            if (active) {
                setItem(found || null);
                setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [slug]);

    if (authState === authStates.INITIAL_VALUE || loading) return <Loader />;
    if (!item) return <Container maxWidth="sm"><Typography variant="h6">Nie znaleziono</Typography></Container>;

    return (
        <div className="single-page">
            <How />
            <PastaDetails item={item} />
        </div>
    );
};

export default SinglePasta;