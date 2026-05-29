import Button from "../components/ui/Button.tsx";

import BcgWorldImage from '../assets/images/background-world-map2.png'
import Location1Image from '../assets/images/location1.jpg'
import Location2Image from '../assets/images/location2.jpg'
import Location3Image from '../assets/images/location3.jpg'

import GuessCardLocked from "../components/ui/GuessCardLocked.tsx";
import {Col, Row} from "react-bootstrap";
import {useAppSelector} from "../store/hooks.ts";
import {useGetLocationsQuery, useGetMyPersonalBestQuery} from "../store/api/locationApi.ts";
import GuessCard from "../components/ui/GuessCard.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
    const {isAuthenticated} = useAppSelector((state) => state.auth);
    const [locationsLimit, setLocationsLimit] = useState(8);

    const {
        data: personalBest,
        isLoading: isLoadingPersonal
    } = useGetMyPersonalBestQuery({page: 1, limit: 3});

    const {
        data: allLocations,
        isLoading: isLoadingAll,
        isFetching: isFetchingAll
    } = useGetLocationsQuery({page: 1, limit: locationsLimit});

    const hasMore = allLocations?.meta
        ? allLocations.data.length < allLocations.meta.totalItems
        : false;

    const handleLoadMore = () => {
        setLocationsLimit((prev) => prev + 4);
    };


    return (
        <div>
            {isAuthenticated ? (
                <div className={"home-page-signed"}>
                    <div className="home-page-text-signed">
                        <h2>Personal best guesses</h2>
                        <p>Your personal best guesses appear here. Go on and try to beat your personal records or set a
                            new one!</p>

                        <Row className="home-page-personal-best-container gy-3 gx-3">
                            {personalBest?.data.length === 0 && !isLoadingPersonal ? (
                                    <div className={"nothing-yet-text"}>
                                        <p>No best guesses yet!</p>
                                        <p>Start new game and guess the location of the picture to get the results here!</p>
                                    </div>
                                ) :
                                personalBest?.data.map((location) => (
                                    <Col key={location.id} xs={12} md={12} lg={4} xl={3}>
                                        <GuessCard location={location}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                    <div className="home-page-text-signed">
                        <h2>New locations</h2>
                        <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>

                        <Row className="home-page-all-container gy-3 gx-3">
                            {allLocations?.data.length === 0 && isLoadingAll ? (
                                    <div>No locations yet</div>
                                ) :
                                allLocations?.data.map((location) => (
                                    <Col key={location.id} xs={12} md={12} lg={4} xl={3} className="flex-shrink-0">
                                        <GuessCard location={location}/>
                                    </Col>
                                ))
                            }
                        </Row>

                        {hasMore && (
                            <div className={"w-100 text-center mt-4"}>
                                <Button
                                    variant={"secondary"}
                                    onClick={handleLoadMore}
                                    isLoading={isFetchingAll}
                                >
                                    Load more
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="home-page">
                    <Row className={"min-vh-75 d-flex align-items-center"}>
                        <Col lg={4} className={"z-3 d-flex justify-content-center"}>
                            <div className="home-page-text home-page-text-hero">
                                <h2>Explore the world with Geotagger!</h2>
                                <p>Geotagger is website that allows you to post picture and tag it on the map. Other
                                    user
                                    than try to locate it via Google Maps.</p>
                                <Link to={"/register"}>
                                    <Button className={"home-page-btn"}>Sign up</Button>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <img src={BcgWorldImage} className={"img-fluid world-map-image"}
                                 alt="Background world map"/>
                        </Col>
                    </Row>

                    <div className="home-page-text home-page-intro">
                        <h3>Try yourself at Geotagger!</h3>
                        <p>Try to guess the location of image by selecting position on the map. When you guess it, it
                            gives
                            you the error distance.</p>
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
                        <Link to={"/register"}>
                            <Button className={"home-page-btn"}>Sign up</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;