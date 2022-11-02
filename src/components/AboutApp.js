import { Link } from 'react-router-dom';

export default function AboutApp() {
    return (
        <div className="fittedCard">
            <h2>Curious about crypto?</h2>
            <p className="left">You've heard a lot about the benefits to investing in cryptocurrency, but you're also worried about investing in something in which you have little experience or knowledge.</p>
            <p className="left"><strong>Kryptokeeper</strong> is a cryptocurrency investment simulator where you can decide how much you want to invest in a variety of coins and chart their performance over time with real and current market prices, with <strong>zero risk</strong> while you're still learning.</p>
            <p><Link to="/register" className="registerLink">Sign up</Link> for a free account today and find out why people are investing!</p>
            <p><em>None of the risk, none of the reward!</em></p>
        </div>
    )
}