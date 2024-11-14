import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './css/page.css'
import { app, getAuth, onAuthStateChanged, getDoc, store, doc, signInWithCustomToken } from "./firebase";
import { useAuth } from '../AuthContext';

function Index() {
    const { user, userName } = useAuth()

    return (
        <section>
            {userName ? <h1 className="sitetitle" >歡迎, {userName}</h1> : <h1 className="sitetitle" >載入資料中</h1>}
        </section>
    );
};

export default Index;