import Button from "../components/ui/Button.tsx";

import {Col, Row} from "react-bootstrap";
import {
    useDeleteLocationMutation,
    useGetMyLocationsQuery,
    useGetMyPersonalBestQuery
} from "../store/api/locationApi.ts";
import GuessCard from "../components/ui/GuessCard.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import Avatar from "../components/ui/Avatar.tsx";
import {Link} from "react-router-dom";
import {closeFeedbackModal, openFeedbackModal} from "../store/slices/uiSlice.ts";

const UserProfilePage = () => {
    const [locationsLimit, setLocationsLimit] = useState(8);
    const [bestLimit, setBestLimit] = useState(3);
    const {user} = useAppSelector((state) => state.auth);

    const {
        data: personalBest,
        isLoading: isLoadingPersonal
    } = useGetMyPersonalBestQuery({page: 1, limit: bestLimit});


    const {
        data: allLocations,
        isLoading: isLoadingAll,
        isFetching: isFetchingAll
    } = useGetMyLocationsQuery({page: 1, limit: locationsLimit});

    const hasMoreUploads = allLocations?.meta
        ? allLocations.data.length < allLocations.meta.totalItems
        : false;

    const hasMorePersonalBest = personalBest?.meta
        ? personalBest.data.length < personalBest.meta.totalItems
        : false;

    const handleLoadMore = () => {
        setLocationsLimit((prev) => prev + 4);
    };

    const handleLoadMoreBest = () => {
        setBestLimit((prev) => prev + 3);
    }

    const dispatch = useAppDispatch();
    const [deleteLocation] = useDeleteLocationMutation();

    const handleDeleteClick = (id: string) => {
        dispatch(openFeedbackModal({
            title: "Are you sure?",
            message: "This location will be deleted. There is no undo of this action.",
            variant: "confirm",
            onConfirm: async () => {
                try {
                    await deleteLocation(id).unwrap();

                    dispatch(closeFeedbackModal());

                    setTimeout(() => {
                        dispatch(openFeedbackModal({
                            message: "Your location was deleted",
                            variant: "quote"
                        }));
                    })
                } catch { /* empty */
                }
            }
        }));
    }

    return (
        <div className={"profile-page"}>
            <div className={"align-items-start profile-page-header-container"}>
                <div className={"profile-page-header d-flex flex-row align-items-center"}>
                    <Avatar src={user?.image} size={"default"}/>
                    <span>{user?.firstName}&nbsp;{user?.lastName}</span>
                </div>
            </div>
            <div className="home-page-text-signed profile-page-text">
                <h2>My best guesses</h2>

                <Row className="home-page-all-container gy-3 gx-3">
                    {personalBest?.data.length === 0 && !isLoadingPersonal ? (
                            <div className={"profile-page"}>
                                <div className={"nothing-yet-text"}>
                                    <p>No best guesses yet!</p>
                                    <p>Start new game and guess the location of the picture to get the results here!</p>
                                </div>
                                <Link to={"/"}>
                                    <Button className={"home-page-btn"}>Go to locations</Button>
                                </Link>
                            </div>
                        ) :
                        personalBest?.data.map((location) => (
                            <Col key={location.id} xs={12} md={12} lg={4} xl={3}>
                                <GuessCard location={location}/>
                            </Col>
                        ))
                    }
                </Row>


                {hasMorePersonalBest && (
                    <div className={"w-100 text-center mt-4"}>
                        <Button
                            variant={"secondary"}
                            onClick={handleLoadMoreBest}
                            isLoading={isFetchingAll}
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </div>
            <div className="home-page-text-signed profile-page-text">
                <h2>My uploads</h2>

                <Row className="home-page-all-container gy-3 gx-3">
                    {allLocations?.data.length === 0 && !isLoadingAll ? (
                            <div className={"profile-page"}>
                                <div className={"nothing-yet-text"}>
                                    <p>No uploads yet!</p>
                                    <p>Upload new location with the click on button bellow or in navigation bar press the
                                        “+” button.</p>
                                </div>
                                <Link to={"/location/create"}>
                                    <Button className={"home-page-btn"}>Add location</Button>
                                </Link>
                            </div>
                        ) :
                        allLocations?.data.map((location) => (
                            <Col key={location.id} xs={12} md={12} lg={4} xl={3}>
                                <GuessCard isOwner={true} location={location}
                                           onDelete={() => handleDeleteClick(location.id)}/>
                            </Col>
                        ))
                    }
                </Row>

                {hasMoreUploads && (
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
    );
};

export default UserProfilePage;