import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div className="posY">
            <div className="fittedCard">
                <h2>Whoops!</h2>
                <p>Sorry, looks like the page you're looking for doesn't exist.</p>
                <Link to="/"><button className="button AccountInfo-button">Take me home!</button></Link>
            </div>
        </div>
    )
}