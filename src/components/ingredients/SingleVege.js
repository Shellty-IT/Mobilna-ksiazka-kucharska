import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVegetables } from "../../Api";
import "./Single.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import How from "../how/How";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";
import { PageTitle, Section, ExpandableSection } from "../common/DetailsParts";

const VegeDetails = ({ item }) => (
    <Container maxWidth="sm">
        <Card className="description">
            <CardContent>
                <PageTitle>{item.name}</PageTitle>
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", display: "block", margin: "0 auto 16px" }}
                    />
                )}
                <Section title="Sposób przygotowania">{item.description}</Section>
                {(item.values || item.values2) && (
                    <ExpandableSection title="Wartości zdrowotne oraz ciekawostki">
                        {item.values && <Typography paragraph>{item.values}</Typography>}
                        {item.values2 && <Typography paragraph>{item.values2}</Typography>}
                    </ExpandableSection>
                )}
            </CardContent>
        </Card>
    </Container>
);

const SingleVege = () => {
    const { authState } = useAuth();
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const list = await getVegetables();
            const found = list.find((v) => v.number === parseInt(slug, 10));
            if (active) {
                setItem(found || null);
                setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [slug]);

    if (authState === authStates.INITIAL_VALUE || loading) return <Loader />;
    if (!item) return <Container maxWidth="sm"><Typography variant="h6">Nie znaleziono</Typography></Container>;

    return (
        <div className="single-page">
            <How />
            <VegeDetails item={item} />
        </div>
    );
};

export default SingleVege;