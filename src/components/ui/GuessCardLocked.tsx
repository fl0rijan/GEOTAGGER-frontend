import LockIcon from '../../assets/icons/LockOutlined.svg?react';

interface GuessCardLockedProps {
    img: string;
}

const GuessCardLocked = ({img}: GuessCardLockedProps) => {
    return (
        <div className={"guess-card"}>
            <div className={"image-section"}>
                <img src={img} alt="Location"/>

                <div className={"guessed-overlay"}>
                    <LockIcon/>
                </div>
            </div>
        </div>
    );
};

export default GuessCardLocked;