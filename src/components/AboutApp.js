import { Link } from 'react-router-dom';

export default function AboutApp() {
    return (
        <div className="aboutApp">
            <h2>Curious about crypto?</h2>
            <p>You've probably heard a lot about the benefits to investing in cryptocurrency. But you're probably also worried about getting into something you haven't had any experience with.</p> 
            <p><strong>Kryptokeeper</strong> is a cryptocurrency investing simulator where you can try investing in different coins and chart your gains and losses, all with NO RISK.</p>
            <p><Link to="/register" className="registerLink">Sign up</Link> for a free account today and find out why people are investing!</p>
        </div>
    )
}