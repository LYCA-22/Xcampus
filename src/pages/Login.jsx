import React, { useEffect, useState } from "react";
import { app, auth, analytics, onAuthStateChanged, CheckAuth } from "./firebase";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import './css/accountsystem.css'
import logo from './assets/web_logo.svg'
import loadingGIF from './assets/loadingGIF.gif'
import { TextField, InputLabel } from "@mui/material";

function LoadingBox() {
    return (
        <div className="loadingbox hidden" id="loadingbox">
            <div className="mainbox fade" id="mainbox">
                <h3>登入中</h3>
                <img src={loadingGIF} className="gif" id="loadingGIF"></img>
            </div>
        </div>
    )
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const currentPath = window.location.pathname;
    useEffect(() => {
        const loadingbox = document.getElementById('loadingbox');
        const mainbox = document.getElementById('mainbox');
        if (loading === true && currentPath === '/login'){
            loadingbox.classList.remove('hidden')
            loadingbox.classList.add('fadeIn')
            setTimeout(() => {
                mainbox.classList.remove('fade')
                mainbox.classList.add('show')
                loadingbox.classList.remove('fadeIn')
                loadingbox.classList.add('show') 
            },200)
        } else {
            loadingbox.classList.remove('show')
            loadingbox.classList.add('fadeIn')
            setTimeout(() => {
                loadingbox.classList.remove('fadeIn')
                loadingbox.classList.add('hidden')
            },200)
        }
    })
    

    // 登入函數設定
    const signIn = (email, password) => {
        setTimeout(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/'); // 登入成功後導向首頁
            })
            .catch((error) => {
                setLoading(false);
                setTimeout(() => {
                    window.alert('帳號或密碼錯誤')
                },500)
            })
            .finally(() => {
                setLoading(false);
            })
        }, 1000)
    };

    // 登入提交
    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        setTimeout(() => {
            signIn(email, password);
        },1000)

    };


    return (
        <div className="loginbox">
            <CheckAuth />
            <LoadingBox />
            <form id='loginform' onSubmit={handleSubmit} className="loginform">
                <img src={logo} className='loginpage-applogo'></img>
                <h1 className="formtitle">登入</h1>

                <TextField id="email" label="電子郵件" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth variant="filled" sx={{margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC',fontWeight: '500',},'.MuiFilledInput-root': {borderTopRightRadius: '10px',borderTopLeftRadius: '10px',},'.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}}}/>
                <TextField id="password" label="密碼" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth variant="filled" sx={{margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC',fontWeight: '500',},'.MuiFilledInput-root': {borderTopRightRadius: '10px',borderTopLeftRadius: '10px',},'.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}}}/>

                {/*
                <div className='inputbox' id='emailbox' >
                    <label htmlFor="email" className="label normal" id="emailtext">電子郵件</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span className="line" id="emailline"></span>
                </div>
                 
                <div className="inputbox" id="passwordbox">
                    <label htmlFor="password" className="label normal" id="passwordtext">密碼</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span className="line" id="passwordline"></span>
                </div>
                */}
                <div className="login-btnbox">
                    <button className="loginpagebtn" type="button" disabled>
                        忘記密碼
                    </button>
                    <button type="submit" className="loginpagebtn" disabled={loading} >
                        登入
                    </button>
                </div>
                <button className="loginpagebtn" id='toproposalbtn' type="button">
                    <a href="/proposal" style={{textDecoration:'none', color:'black'}}>提案進度查詢</a>
                </button>
            </form>
        </div>
    );
}

export default Login;