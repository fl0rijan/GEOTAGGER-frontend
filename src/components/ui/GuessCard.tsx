import type {LocationResponseDto} from "../../types/api";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import {formatDistance} from "../../lib/distance-utils.ts";

interface GuessCardProps {
    location: LocationResponseDto;
    isOwner?: boolean;
    onDelete?: (id: string) => void;
    onEdit?: (auction: LocationResponseDto) => void;
}

const GuessCard = ({location, isOwner = false, onDelete, onEdit}: GuessCardProps) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/location/${location.id}`);
    };

    const distance = location.userGuessDistance;
    const isGuessed = distance !== null && distance !== undefined;

    return (
        <div onClick={handleCardClick}
             className={isOwner ? "guess-card guess-card-hover-owner" : "guess-card guess-card-hover-normal"}>
            <div className={"image-section"}>
                <img src={location.imageUrl} alt="Location"/>

                {isGuessed && (
                    <div className={"guessed-overlay"}>
                        {formatDistance(distance)}
                    </div>
                )}
            </div>
            {isOwner ? (
                    <div className="guess-card-owner">
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(location.id);
                        }} variant={"primary-icon"} icon={"edit"} className={"icon-button-size-40"}/>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(location);
                        }} variant={"primary-icon"} icon={"delete"} iconBg={"danger"} className={"icon-button-size-40"}/>
                    </div>

                )
                : (
                    <div className={"bottom-section"}>

                        <Button
                            variant={"secondary"}
                        >
                            Guess
                        </Button>

                    </div>)}
        </div>
    );
};

export default GuessCard;