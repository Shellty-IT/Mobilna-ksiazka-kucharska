import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroats } from "../../Api";
import "./Single.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import How from "../how/How";
import { useAuth, authStates } from "../../provider/authProvider";
import Loader from "../loader/Loader";
import { PageTitle, Section, ExpandableSection } from "../common/DetailsParts";

const GroatDetails = ({ item }) => (
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
                <ExpandableSection title="Wartości zdrowotne">
                    <Typography paragraph>
                        Pod względem wartości odżywczej kasze przewyższają ryż, makaron i ziemniaki.
                        Są bogatym źródłem skrobi, która w organizmie rozkłada się powoli na glukozę
                        – paliwo potrzebne do pracy mózgu i wszystkich innych komórek.
                        100 g ugotowanej kaszy manny pokrywa niemal całkowicie dzienne zapotrzebowanie na węglowodany.
                    </Typography>
                    <Typography paragraph>
                        W skład kasz wchodzą witaminy z grupy B: B1 (tiamina), B2 (ryboflawina), PP (niacyna),
                        B6 (pirydoksyna), kwas foliowy i witamina E. Sporo jest również składników mineralnych,
                        głównie potasu obniżającego ciśnienie, żelaza zapobiegającego niedokrwistości oraz magnezu
                        korzystnie działającego na układ nerwowy i pracę mięśni (w tym sercowego).
                        Kasze są też całkiem dobrym źródłem wapnia, miedzi, cynku, manganu i krzemu.
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: 8 }}>Kaszę powinni jeść:</Typography>
                    <ul className="tips">
                        <li>nadciśnieniowcy i cierpiący na choroby serca i układu krążenia</li>
                        <li>osoby zagrożone anemią – np. kasza jaglana i gryczana zawierają żelazo, kwas foliowy i witaminę E</li>
                        <li>osoby żyjące w ciągłym napięciu – witaminy z grupy B łagodzą objawy stresu</li>
                        <li>diabetycy – kasze zawierają dużo skrobi, która łagodnie podnosi poziom glukozy i insuliny</li>
                        <li>dzieci, kobiety w ciąży i karmiące, osoby starsze, rekonwalescenci – kasze są lekko strawne</li>
                    </ul>
                </ExpandableSection>
            </CardContent>
        </Card>
    </Container>
);

const SingleGroat = () => {
    const { authState } = useAuth();
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const list = await getGroats();
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
            <GroatDetails item={item} />
        </div>
    );
};

export default SingleGroat;