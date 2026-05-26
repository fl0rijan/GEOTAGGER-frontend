import Button from "../components/ui/Button.tsx";

import BcgWorldImage from '../assets/images/background-world-map2.png'
import Location1Image from '../assets/images/location1.jpg'
import Location2Image from '../assets/images/location2.jpg'
import Location3Image from '../assets/images/location3.jpg'

import GuessCardLocked from "../components/ui/GuessCardLocked.tsx";
import {Col, Row} from "react-bootstrap";
const HomePage = () => {
    return (
        <div className="home-page">
            <Row className={"min-vh-75 d-flex align-items-center"}>
                <Col lg={4} className={"z-3 d-flex justify-content-center"}>
                    <div className="home-page-text home-page-text-hero">
                        <h2>Explore the world with Geotagger!</h2>
                        <p>Geotagger is website that allows you to post picture and tag it on the map. Other user than try to locate it via Google Maps.</p>
                        <Button className={"home-page-btn"}>Sign up</Button>
                    </div>
                </Col>
                <Col lg={8}>
                    <img src={BcgWorldImage} className={"img-fluid world-map-image"} alt="Background world map"/>
                </Col>
            </Row>

            <div className="home-page-text home-page-intro">
                <h3>Try yourself at Geotagger!</h3>
                <p>Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</p>
            </div>

            <Row className="g-4">
                <Col md={4}>
                    <GuessCardLocked img={Location1Image}/>
                </Col>
                <Col md={4}>
                    <GuessCardLocked img={Location2Image}/>
                </Col>
                <Col md={4}>
                    <GuessCardLocked img={Location3Image}/>
                </Col>
            </Row>

            <div className="home-page-text">
                <Button className={"home-page-btn"}>Sign up</Button>
            </div>
        </div>
    );
};

export default HomePage;