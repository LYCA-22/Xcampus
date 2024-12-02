import React, { useRef, useState, useEffect } from 'react';
import './css/page.css'
import './css/admin.css'
import { useAuth } from '../AuthContext';
import {Link} from "react-router-dom";

function Admin() {
    const { userName, adminAccess, loading, userLevel } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // 用于获取菜单元素的引用
    const [word, setWord] = useState("");

    // 根據時間決定顯示的詞語
    const updateWord = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setWord("早安");
        } else if (hour >= 12 && hour < 18) {
            setWord("下午好");
        } else {
            setWord("晚安");
        }
    };

    const handleOutsideClick = (e) => {
        // 如果点击的目标不是菜单本身或菜单的子元素，则关闭菜单
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.title = 'Xcampus 管理中心';
        document.addEventListener('click', handleOutsideClick);
        updateWord();
        const interval = setInterval(updateWord, 1000 * 60); // 每分鐘更新一次

        // 清理事件监听器
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            clearInterval(interval); // 清除定時器
        };
    }, [menuOpen]);

    if (adminAccess){
        return (
            <section>
                <div className='admin_contentbox'>
                    <nav className='admin_nav'>
                        <div className='userInf' ref={menuRef}>
                            <button className='userInf_Btn' onClick={() => setMenuOpen((prev) => !prev)}>
                                <div className="userIcon">
                                    <p className='userNa'>
                                        {userName && userName.toString().split(' ').length > 1
                                            ? userName.split(' ')[0][0] + userName.split(' ')[1][0]
                                            : userName[0] || ''}
                                    </p>
                                </div>
                                {userName}
                            </button>
                            {menuOpen &&
                                <div className='user_Mdiv open'>
                                    <div>用戶等級 {userLevel}</div>
                                    <Link to='/account' className='admin_navBtn'>
                                        <p className='menu_p'>管理我的帳戶</p>
                                    </Link>
                                </div>
                            }
                        </div>
                    </nav>
                    <div className="funbox">
                        <h1 className="sitetitle" id='admin_title'>{word}，今天要做什麼呢？</h1>
                        <div className='funbox-intobox'>
                            <Link to="/admin" className='admin_funbtn' id='addnewsBtn'>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                                發佈公告
                            </Link>
                            {userLevel === 'L04' &&
                                <Link to="/ADregister" className='admin_funbtn' id='adduserBtn'>
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
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
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                                    <path
                                        d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                管理學權信箱
                            </Link>
                            <Link to="/admin" className='admin_funbtn'>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                                    <path
                                        d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V21L17.25 19L14.75 21L12 19L9.25 21L6.75 19L4 21V7.8Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                投票管理
                            </Link>
                            <Link to="https://doc.lyhsca.org" className='admin_funbtn'>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className='funbtn_svg'>
                                    <path
                                        d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7ZM10.1 17.5H13.9C14.4601 17.5 14.7401 17.5 14.954 17.391C15.1422 17.2951 15.2951 17.1422 15.391 16.954C15.5 16.7401 15.5 16.4601 15.5 15.9V15.1C15.5 14.5399 15.5 14.2599 15.391 14.046C15.2951 13.8578 15.1422 13.7049 14.954 13.609C14.7401 13.5 14.4601 13.5 13.9 13.5H10.1C9.53995 13.5 9.25992 13.5 9.04601 13.609C8.85785 13.7049 8.70487 13.8578 8.60899 14.046C8.5 14.2599 8.5 14.5399 8.5 15.1V15.9C8.5 16.4601 8.5 16.7401 8.60899 16.954C8.70487 17.1422 8.85785 17.2951 9.04601 17.391C9.25992 17.5 9.53995 17.5 10.1 17.5ZM13.75 13.5V11.75C13.75 10.7835 12.9665 10 12 10C11.0335 10 10.25 10.7835 10.25 11.75V13.5H13.75Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                檔案中心
                            </Link>
                        </div>
                        <p className='admin_p_text'>功能會依據您的帳戶等級而變化。</p>
                    </div>
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
                <h1 className="sitetitle">Xcampus 管理中心</h1>
                <GoHome/>
                <div style={{margin: '30px 5px 10px 15px'}}>
                    <div className='loader'></div>
                </div>
            </section>
        );
    }

};

export default Admin;