import LogoWhite from '../../assets/LogoWhite.svg?react';
import LogoTitle from '../../assets/LogoTitle.svg?react';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className={"d-lg-none"}>
                    <LogoWhite/>
                </div>
                <div className={"d-none d-lg-flex"}>
                    <LogoTitle/>
                </div>

                <p>All Rights Reserved | skillupmentor.com</p>
            </div>
        </div>
    );
};

export default Footer;