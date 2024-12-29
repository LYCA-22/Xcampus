import { useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../css/page.css'
import { useAuth } from '../services/AuthContext.jsx';
import Logo from '../assets/logo-icon-text.svg'

function Intro(){
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    return (
        <div className="intro">
            <img src={Logo} className='intro-logo'></img>
            <p className='intro-text'>連結校園，共創未來</p>
            <Link to="/" className='intro-btn'>
                開始使用
            </Link>
        </div>
    )
}

export default Intro