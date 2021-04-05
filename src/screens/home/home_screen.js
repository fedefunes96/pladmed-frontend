import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Row,
    Col,    
    Image
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Context } from '../../controllers/context_provider'
import WorldNetwork from "../../assets/world_network.jpg";
import { Popup } from 'react-leaflet'
import Map from '../../components/map/map'

function HomeScreen() {
    const { getAllProbes } = useContext(Context);

    const [probes, setProbes] = useState([])

    useEffect(() => {
        async function init() {
            try {
                const data = await getAllProbes();

                setProbes(data)
            } catch (e) {

            }
        }
        
        init();
    }, [getAllProbes]);

    const renderPopup = (probe) => {
        if (probe["connected"]) {
            return (
                <Popup>
                    Sonda conectada <br/> Disponibilidad: {probe["availability"] * 100}%
                </Popup>  
            )
        }

        return (
            <Popup>
                Sonda desconectada
            </Popup>  
        )
    }

    return (
        <Container
            fluid
            className={styles.mainContainer}
        >
            <Row className={[styles.title, "h2"]}>
                <Col>
                    Sobre el sistema de medición
                </Col>
            </Row>
            <Row className={styles.descriptionContainer}>
                <Col
                    xl={6} lg={6} md={12} sm={12} xs={12}
                    className={[styles.textContainer, "h4"]}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis at turpis et consectetur. Sed sit amet ultrices elit. Quisque accumsan libero non laoreet placerat. Phasellus blandit tellus eget suscipit mattis. Aliquam at eros urna. Proin placerat massa accumsan suscipit laoreet. Nulla suscipit fermentum ipsum, in vehicula neque luctus in.
                </Col>
                <Col
                    xl={6} lg={6} md={12} sm={12} xs={12}
                    className={styles.imageContainer}
                >
                    <Image className={styles.image} src={WorldNetwork} rounded />
                </Col>
            </Row>
            <Row>
                <Col
                    xl={12} lg={12} md={12} sm={12} xs={12}
                    className={styles.mapContainer}
                >
                    <Row className={[styles.title, "h2"]}>
                        Tenemos varias sondas disponibles para tus mediciones
                    </Row>
                    <Map
                        className={styles.map}
                        markers={probes}
                        renderPopup={renderPopup}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default HomeScreen;
