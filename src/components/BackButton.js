import { Link } from 'react-router-dom';
import backButton from '../assets/images/circle-left-solid.svg';

export default function BackButton({destination}) {
    return (
        <div className="BuySell-backButtonContainer">
            <Link to={destination}><img src={backButton} className="navIcon backButton" alt="back button" /></Link>
        </div>
    )
}