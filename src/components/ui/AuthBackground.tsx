import MapsImage from '../../assets/images/maps.png';
import Pattern from '../../assets/images/GeotaggerPattern.png';
import LogoWhite from '../../assets/AuthBgLogo.svg?react';

const AuthBackground = () => {
    return (
        <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
            <div className={"w-100 h-100 position-absolute z-1"}>
                <img src={MapsImage} alt="GoogleMaps" className={"auth-image auth-image-maps"}/>

                <div className={"auth-bg-overlay"}>
                </div>
            </div>

            <img src={Pattern} alt="Pattern" className={"auth-image  position-absolute z-2 opacity-15"}/>
            <LogoWhite className={"position-absolute z-3"}/>
        </div>
    );
};

export default AuthBackground;