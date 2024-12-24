import { useState, useEffect } from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import './css/page.css'
import { useAuth } from '../AuthContext';
import Logo from './assets/logo-icon-text.svg'

function Intro(){
    const {user} = useAuth();
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