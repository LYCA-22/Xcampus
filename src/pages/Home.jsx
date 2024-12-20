import React, { useState, useEffect } from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import './css/page.css'
import { useAuth } from '../AuthContext';

function Index() {
    const { user, userName } = useAuth()

    return (
        <section className='home'>
            <div>
                <h1 className="sitetitle" id='home-site-title'>{!user ? '歡迎使用' : `Hey,${userName}`}</h1>
                {!navigator.onLine && <h2>目前無網際網路連線</h2>}
                {!user && <Link to='/login'>立刻登入</Link>}
            </div>
            <div>
                <h3>常用功能</h3>
                <ul>
                    <li>成績系統</li>
                    <li>Ailead</li>
                </ul>
            </div>
        </section>
    );
};

export default Index;