import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import './css/accountsystem.css'
import { TextField, Select, MenuItem, FormControl, InputLabel, Menu, Button, styled } from "@mui/material";
import { useAuth } from '../AuthContext';

function LoadingBox() {
    return (
        <div className="loadingbox hidden" id="loadingbox">
            <div className="mainbox fade" id="mainbox">
                <div className='loader'></div>
                <h3>登出中</h3>
            </div>
        </div>
    )
}


const ACHome = () => {
    const { user, userName, userEmail, userClass, adminAccess, userGrade, userID, loading, logoutUser, userRole, userLevel } = useAuth()

    useEffect(() => {
        const loadingbox = document.getElementById('loadingbox');
        const mainbox = document.getElementById('mainbox');
        if (false){
            loadingbox.classList.remove('hidden')
            loadingbox.classList.add('fadeIn')
            setTimeout(() => {
                mainbox.classList.remove('fade')
                mainbox.classList.add('show')
                loadingbox.classList.remove('fadeIn')
                loadingbox.classList.add('show') 
            },200)
        }
    })

    // css 設定
    const class_all = {
        C01: '忠',
        C02: '孝',
        C03: '仁',
        C04: '愛',
        C05: '義',
        C06: '信',
        T01: '測試用'
    }
    const grade_all = {
        G01: '高一',
        G02: '高二',
        G03: '高三',
        T01: '測試用'
    }
    const role_all = {
        T00:'無資料',
        T01:'測試帳號',
        R01:'本校學生',
        R11:'本校學生(已認證)',
        R02:'系統管理員',
        R12:'系統管理員(已認證)',
        R03:'學生',
        R04:'班聯會學權組長',
        R14:'班聯會學權',
        R05:'班聯會活動組長',
        R15:'班聯會活動',
    }

    const logout = () => {
        logoutUser();
        setTimeout(() => {
            window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org';
        }, 500)
    }


    return (
        <>
            <div>
                <h1 className="acc_pageTitle" id="mctitle">總覽</h1>
                <p className="acc_pageSubTitle" id="mctitle">管理你的基本資料</p>
            </div>
            <div className="userCard">
                <div className="userPhoto">
                    <p className='un_ab'>
                    {userName && userName.toString().split(' ').length > 1
                            ? userName.split(' ')[0][0] + userName.split(' ')[1][0]
                            : userName[0] || ''}
                    </p>
                </div>
                <div className="userInformation">
                    <h1 className="userName">{userName}</h1>
                    <p className="userText">{grade_all[userGrade] + class_all[userClass]}</p>
                </div>
            </div>
            <h1 className="list_title">基本資料 Basic Information</h1>
            <div className='page_content'>
                <ul className='mc_ul'>
                    <li className="mc_list_item" id="list-userIn-name">
                        <button className="list-btn flex-column">
                            <p className="lu-title">姓名</p>
                            <div className="lu-fc">
                                <p className="lu_p">{userName}</p>
                            </div>
                        </button>
                    </li>
                    <li className="mc_list_item">
                        <button className="list-btn flex-column">
                            <p className="lu-title">電子郵件</p>
                            <div className="lu-fc">
                                <p className="lu_p">{userEmail}</p>
                            </div>
                        </button>
                    </li>
                    <li className="mc_list_item">
                        <button className="list-btn flex-column">
                            <p className="lu-title">年級</p>
                            <div className="lu-fc">
                                <p className="lu_p">{grade_all[userGrade]}</p>
                            </div>
                        </button>
                    </li>
                    <li className="mc_list_item">
                        <button className="list-btn flex-column">
                            <p className="lu-title">班級</p>
                            <div className="lu-fc">
                                <p className="lu_p">{class_all[userClass]}</p>
                            </div>
                        </button>
                    </li>
                    {adminAccess &&
                        <li className="mc_list_item">
                            <button className="list-btn flex-column" disabled>
                                <p className="lu-title">管理中心存取權限</p>
                                <div className="lu-fc">
                                    <p className="lu_p">{adminAccess ? '有權限' : '無權限'}</p>
                                </div>
                            </button>
                        </li>
                    }
                    <li className="mc_list_item">
                        <button className="list-btn flex-column" disabled>
                            <p className="lu-title">身份</p>
                            <div className="lu-fc">
                                <p className="lu_p">{role_all[userRole]}</p>
                            </div>
                        </button>
                    </li>
                    <li className="mc_list_item">
                        <button className="list-btn flex-column" disabled>
                            <p className="lu-title">權限等級</p>
                            <div className="lu-fc">
                                <p className="lu_p">{userLevel}</p>
                            </div>
                        </button>
                    </li>
                    <li className="mc_list_item">
                        <button className="list-btn flex-column" disabled>
                            <p className="lu-title">帳戶ID</p>
                            <div className="lu-fc">
                                <p className="lu_p">{userID}</p>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
            <div className='page_content'>
                <ul className='mc_ul'>
                    <li>
                        <button className="list-btn" onClick={logout}>
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight:'15px'}}>
                                    <path
                                        d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">登出帳戶</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight:'15px'}}>
                                    <path
                                        d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">認證身份</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

const SE = () => {

    return (
        <>
            <h1 className="acc_pageTitle">安全性</h1>
            <p className="acc_pageSubTitle" id="mctitle">管理你的帳戶安全</p>
            <div className="page_content" id="se_mcbox">
                <ul className='mc_ul'>
                    <li>
                        <Link className="list-btn" to='/account/security/updatepassword'>
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" color='#000' style={{marginRight:'15px'}}>
                                    <path
                                        d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">密碼</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight:'15px'}}>
                                    <path
                                        d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="se_libtn_textbox">
                                    <p className="lb-title">電子郵件</p>
                                    <p className="lb-p"></p>
                                </div>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" color='#000' style={{marginRight:'15px'}}>
                                    <path
                                        d="M12 17.5H12.01M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.07989 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.0799 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.0799 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22ZM12.5 17.5C12.5 17.7761 12.2761 18 12 18C11.7239 18 11.5 17.7761 11.5 17.5C11.5 17.2239 11.7239 17 12 17C12.2761 17 12.5 17.2239 12.5 17.5Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">手機</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="page_content">
                <ul className='mc_ul'>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight: '15px'}}>
                                    <path
                                        d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">認證身份</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight: '15px'}}>
                                    <path
                                        d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">登出帳戶</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button className="list-btn">
                            <div className="lb-fc">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" style={{marginRight: '15px'}} color='#000'>
                                    <path
                                        d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="lb-title">刪除帳號</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

const ChangePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
      e.preventDefault();
      try {
        // 從 cookie 或 localStorage 中獲取 token
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
  
        if (!token) {
          setMessage('未偵測到用戶已登入');
          return;
        }
  
        // 發送 POST 請求以更改密碼
        const response = await fetch('https://lycaapis.zhicheng-gong.workers.dev/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
        });
  
        const result = await response.json();
        if (response.ok) {
          setMessage(result.message);
          window.alert('更新成功')
          window.location.href = '/account/security'
        } else {
          setMessage(result.error);
          window.alert(message)
        }
      } catch (error) {
        setMessage('發生錯誤，請稍後再試');
        console.error(error);
      }
    };



    return (
        <>
            <Link to='/account/security' className="backbtn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                    <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/>
                </svg>
            </Link>
            <h1 className="acc_pageTitle">更新密碼</h1>
            <p className="acc_pageSubTitle" id="mctitle">更新密碼使您的帳戶更安全</p>
            <form className="changepassword_form" onSubmit={handleChangePassword}>
                <TextField required id="currentPassword" label="當前密碼" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} fullWidth variant="filled" sx={{ margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': { fontFamily: 'NotoSansTC', fontWeight: '500' },'.MuiFilledInput-root': { borderTopRightRadius: '10px', borderTopLeftRadius: '10px' },'.MuiFilledInput-underline::before': { borderBottomColor: '#e5e5e5' }}}/>
                <TextField required id="newPassword" label="新密碼" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth variant="filled" sx={{ margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': { fontFamily: 'NotoSansTC', fontWeight: '500' },'.MuiFilledInput-root': { borderTopRightRadius: '10px', borderTopLeftRadius: '10px' },'.MuiFilledInput-underline::before': { borderBottomColor: '#e5e5e5' }}}/>
                <button className="changebtn cpw-pagebtn" type="submit">更新</button>
            </form>
        </>
    );
};

const Account = () => {
    const location = useLocation();
    const currentPath = window.location.pathname;

    return (
        <section>
            <LoadingBox />
            <div className="main_box">
                <div className="acc_phone_nav">
                    <Link to='/account' className={currentPath === '/account' ? 'acc_p_navbtn active':'acc_p_navbtn'}>
                    總覽
                    </Link>
                    <Link to='/account/security' className={currentPath.startsWith('/account/security') ? 'acc_p_navbtn active':'acc_p_navbtn'}>
                    安全性
                    </Link>
                    <Link to='/account' className='acc_p_navbtn'>
                    用戶通知
                    </Link>
                </div>
                <div className="acc_sideBar">
                    <p className="acc_sideBar_title">帳號中心</p>
                    <Link to='/account' className={currentPath === '/account' ? 'acc_navbtn active':'acc_navbtn'}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        總覽
                    </Link>
                    <Link to='/account/security'
                          className={currentPath.startsWith('/account/security') ? 'acc_navbtn active' : 'acc_navbtn'}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 7.49987L10 10.4999L14 12.4999L11 15.4999M20 11.9999C20 16.9083 14.646 20.4783 12.698 21.6147C12.4766 21.7439 12.3659 21.8085 12.2097 21.842C12.0884 21.868 11.9116 21.868 11.7903 21.842C11.6341 21.8085 11.5234 21.7439 11.302 21.6147C9.35396 20.4783 4 16.9083 4 11.9999V7.21747C4 6.41796 4 6.0182 4.13076 5.67457C4.24627 5.37101 4.43398 5.10015 4.67766 4.8854C4.9535 4.64231 5.3278 4.50195 6.0764 4.22122L11.4382 2.21054C11.6461 2.13258 11.75 2.0936 11.857 2.07815C11.9518 2.06444 12.0482 2.06444 12.143 2.07815C12.25 2.0936 12.3539 2.13258 12.5618 2.21054L17.9236 4.22122C18.6722 4.50195 19.0465 4.64231 19.3223 4.8854C19.566 5.10015 19.7537 5.37101 19.8692 5.67457C20 6.0182 20 6.41796 20 7.21747V11.9999Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        安全性
                    </Link>
                </div>
                <div className="contentBox">
                    <Routes>
                        <Route path='' element={<ACHome/>}></Route>
                        <Route path='security' element={<SE/>}></Route>
                        <Route path='security/updatepassword' element={<ChangePassword />}></Route>
                    </Routes>
                </div>
            </div>
        </section>
    )
}

export default Account;