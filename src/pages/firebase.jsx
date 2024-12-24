// src/firebase.js
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDoc, doc, updateDoc, setDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-lyswzvlHwJZOPCwoaChpr9qJWJmdIkE",
    authDomain: "lysa-proposal.firebaseapp.com",
    projectId: "lysa-proposal",
    storageBucket: "lysa-proposal.appspot.com",
    messagingSenderId: "1002845769614",
    appId: "1:1002845769614:web:2484d18263915a09fe9edf",
    measurementId: "G-E9W2MT3606"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const store = getFirestore(app);

// 檢查是否登入
const CheckAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && currentPath === '/login') {
                navigate('/'); // 如果已登入，導向首頁
            } else if (!user) {
                navigate('/login'); // 如果未登入，導向首頁
            }
        });
        return () => unsubscribe(); // 清理訂閱
    }, [auth, currentPath, navigate]);
};

export { app, analytics, auth, getAuth, onAuthStateChanged, storage, ref, uploadBytesResumable, getDownloadURL, updateProfile, signOut, CheckAuth, collection, addDoc, getDoc, store, doc, updateDoc, setDoc, getDocs, serverTimestamp, createUserWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithCustomToken };