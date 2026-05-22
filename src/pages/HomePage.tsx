import Button from "../components/ui/Button.tsx";

import BcgWorldImage from '../assets/images/background-world-map.png'
import Locaion1Image from '../assets/images/location1.jpg'
import Locaion2Image from '../assets/images/location2.jpg'
import Locaion3Image from '../assets/images/location3.jpg'

import GuessCardLocked from "../components/ui/GuessCardLocked.tsx";
const HomePage = () => {
    return (
        <div className="home-page">
            <div className="home-page-text">
                <h2>Explore the world with Geotagger!</h2>
                <p>Geotagger is website that allows you to post picture and tag it on the map. Other user than try to locate it via Google Maps.</p>
                <Button className={"home-page-btn"}>Sign up</Button>
            </div>

            <img src={BcgWorldImage} alt="Background world map"/>

            <div className="home-page-text">
                <h3>Try yourself at Geotagger!</h3>
                <p>Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</p>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <GuessCardLocked img={Locaion1Image}/>
                <GuessCardLocked img={Locaion2Image}/>
                <GuessCardLocked img={Locaion3Image}/>
            </div>

            <div className="home-page-text">
                <Button className={"home-page-btn"}>Sign up</Button>
            </div>
        </div>
    );
};

export default HomePage;