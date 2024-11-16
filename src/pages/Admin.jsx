import React, { createContext, useContext, useState, useEffect } from 'react';
import './css/page.css'
import './css/admin.css'
import { useAuth } from '../AuthContext';
import {Link} from "react-router-dom";

function Admin() {
    const { user, userName, adminAccess, loading, userLevel } = useAuth()

    useEffect(() => {
        document.title = 'Xcampus 管理中心';
    }, []);

    if (adminAccess){
        return (
            <section>
                <h1 className="sitetitle" >歡迎來到 Xcampus 管理中心</h1>
                <p className="funbox_title">常用功能</p>
                <div className="funbox">
                    { userLevel === 'L04' &&
                        <Link to="/ADregister" className='admin_funbtn'>
                            <svg width="28" height="28"  viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                                <path
                                    d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            註冊會內部帳號
                        </Link>
                    }
                    <Link to="/admin" className='admin_funbtn'>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                            <path
                                d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                        管理學權信箱
                    </Link>
                    <Link to="/admin" className='admin_funbtn'>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                            <path
                                d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V21L17.25 19L14.75 21L12 19L9.25 21L6.75 19L4 21V7.8Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                        投票管理
                    </Link>
                </div>
            </section>
        );
    } else {
        const GoHome = () => {
            if (!loading) {
                window.location.herf = '/'
            }
        }
        return (
            <section>
                <GoHome/>
                <div style={{margin: '30px 5px 10px 15px'}}>
                    <div className='loader'></div>
                </div>
                <h1 className="sitetitle">驗證資料中</h1>
            </section>
        );
    }

};

export default Admin;