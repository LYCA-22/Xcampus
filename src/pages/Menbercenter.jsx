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
    const CTextField = styled(TextField)(({ theme }) => ({
        margin: '10px',
        fontFamily: 'NotoSansTC',
        fontWeight: '500',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderBottomColor: '#e5e5e5',
    }));
    const CFormControl = styled(FormControl)({
        margin: '10px',
        ':disabled .MuiFormLabel-root': {
            color: 'rgba(0, 0, 0, 0.38)',
        },
        '.MuiFilledInput-root': {
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            fontFamily: 'NotoSansTC',
            fontWeight: '500',
        },
        '.MuiFormLabel-root': {
            fontFamily: 'NotoSansTC',
            fontWeight: '500',
            
        },
        '.MuiSelect-select': {
            padding: '8px',
            paddingTop: '20px',
            paddingBottom: '4px',
        },
        '.MuiFilledInput-underline::before': {
            borderBottomColor: '#e5e5e5'
        },
        '.MuiInputBase-root': {
            padding: '5px'
        },

    })
    const CMenuPaper = styled('div')(({theme}) => ({
        borderBottomRightRadius: '15px',
        borderBottomLeftRadius: '15px',
        backgroundColor: '#efefef',
        boxShadow: '0px 0px 0px 0px #e5e5e5',
        padding: '10px',
        boxSizing: 'border-box',
        '.MuiList-root':{
            padding: '0px'
        }
    }))
    const CMenuItem = styled(MenuItem)(({theme}) => ({
        borderRadius: '10px',
        fontFamily: 'NotoSansTC',
        fontWeight: '500',
    }))
    const NormalButton = styled(Button)(({theme}) => ({
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        backgroundColor: 'transparent',
        border: '2px solid #dfdfdf',
        padding: '10px',
        color: '#1c1c1c',
        fontFamily: 'NotoSansTC',
        fontWeight: '500',
        fontSize: '15px',
        width: '100%',
        margin: '10px',
        height: '45px',
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out, transform 0.2s ease-in-out',
        ':hover':{
            backgroundColor: '#dfdfdf4c',
        },
        ':disabled':{
            border: '2px solid #dfdfdf',
        }
    }))
    const LogOutButton = styled(Button)(({theme}) => ({
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        backgroundColor: '#c64f4f',
        border: 'none',
        padding: '10px',
        color: 'white',
        fontFamily: 'NotoSansTC',
        fontWeight: '500',
        fontSize: '15px',
        width: '100%',
        margin: '10px',
        height: '45px',
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out, transform 0.2s ease-in-out',
        ':hover':{
            backgroundColor: '#9b3d3d',
        },
        ':disabled':{
            border: '2px solid #dfdfdf',
        }
    }))

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

    const [changeName, setCN] = useState(false)
    const [changeGrade, setGD] = useState(false)
    const [changeClass, setCL] = useState(false)

    const logout = () => {
        logoutUser();
        setTimeout(() => {
            window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org';
        }, 500)
    }


    return (
        <>
            <h1 className="acc_top_formtitle" id="mctitle">帳戶</h1>
            <p className="acc_top_formtext" id="mctitle">管理你的基本資料</p>
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
            <h1 className="acc_formtitle">基本資料 Basic Information</h1>
            <form id='form' className='mcform'>
                <div className="list-userIn" id="list-userIn-name">
                    <p className="lu-title">姓名</p>
                    <div className="lu-fc">
                        <p className="lu_p">{userName}</p>
                        <button className="changebtn" type="button" onClick={() => {
                            setCN(!changeName)
                        }}>{changeName ? '取消' : '更改姓名'}</button>
                        {changeName && <button className="updatebtn" type="submit">完成</button>}
                    </div>
                    {changeName &&
                        <TextField required id="name" label="新姓名" type="text" value={userName} fullWidth
                                   variant="filled" sx={{
                            margin: '10px',
                            '.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC', fontWeight: '500',},
                            '.MuiFilledInput-root': {borderTopRightRadius: '10px', borderTopLeftRadius: '10px',},
                            '.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}
                        }}/>
                    }
                </div>
                <div className="list-userIn">
                    <p className="lu-title">電子郵件</p>
                    <div className="lu-fc">
                        <p className="lu_p">{userEmail}</p>
                    </div>
                    <p className="acc_alertText">▸ 此資料為一開始綁定，無法再進行修改 ◂</p>
                </div>
                <div className="list-userIn">
                    <p className="lu-title">年級</p>
                    <div className="lu-fc">
                        <p className="lu_p">{grade_all[userGrade]}</p>
                        <button className="changebtn" type="button" onClick={() => {
                            setGD(!changeGrade)
                        }}>{changeGrade ? '取消' : '更改年級'}</button>
                        {changeGrade && <button className="updatebtn" type="submit">完成</button>}
                    </div>
                    {changeGrade &&
                        <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="grade-label">請選擇欲更改的年級</InputLabel>
                            <Select labelId="grade-label" id='grade' className="select-input"
                                    MenuProps={{PaperProps: {component: CMenuPaper}}}>
                                <CMenuItem value='T00' disabled style={{display: 'none'}}>無資料</CMenuItem>
                                <CMenuItem value='G01'>1年級</CMenuItem>
                                <CMenuItem value='G02'>2年級</CMenuItem>
                                <CMenuItem value='G03'>3年級</CMenuItem>
                                <CMenuItem value='T01' disabled style={{display: 'none'}}>測試用
                                </CMenuItem>
                            </Select>
                        </CFormControl>
                    }
                </div>

                <div className="list-userIn">
                    <p className="lu-title">班級</p>
                    <div className="lu-fc">
                        <p className="lu_p">{class_all[userClass]}</p>
                        <button className="changebtn" type="button" onClick={() => {
                            setCL(!changeClass)
                        }}>{changeClass ? '取消' : '更改班級'}</button>
                        {changeClass && <button className="updatebtn" type="submit">完成</button>}
                    </div>
                    {changeClass &&
                        <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="class-label">請選擇欲更改的班級</InputLabel>
                            <Select labelId="class-label" id='class' className="select-input"
                                    MenuProps={{PaperProps: {component: CMenuPaper}}}>
                                <CMenuItem value='T00' disabled style={{display: 'none'}}>無資料</CMenuItem>
                                <CMenuItem value='C01'>忠</CMenuItem>
                                <CMenuItem value='C02'>孝</CMenuItem>
                                <CMenuItem value='C03'>仁</CMenuItem>
                                <CMenuItem value='C04'>愛</CMenuItem>
                                <CMenuItem value='C05'>義</CMenuItem>
                                <CMenuItem value='C06'>信</CMenuItem>
                                <CMenuItem value='T01' disabled style={{display: 'none'}}>測試用</CMenuItem>
                            </Select>
                        </CFormControl>
                    }
                </div>
                {adminAccess &&
                    <div className="list-userIn">
                        <p className="lu-title">管理中心存取權限</p>
                        <div className="lu-fc">
                            <p className="lu_p">{adminAccess ? '有權限' : '無權限'}</p>
                        </div>
                        <p className="acc_alertText">▸ 如需更新此資料請聯絡本會資訊組 ◂</p>
                    </div>
                }
                <div className="list-userIn">
                    <p className="lu-title">身份</p>
                    <div className="lu-fc">
                        <p className="lu_p">{role_all[userRole]}</p>
                        <button className="changebtn" type="button" disabled>無法更改</button>
                    </div>
                    <p className="acc_alertText">▸ 如需更新此資料請聯絡本會資訊組 ◂</p>
                </div>
                <div className="list-userIn">
                    <p className="lu-title">權限等級</p>
                    <div className="lu-fc">
                        <p className="lu_p">{userLevel}</p>
                        <button className="changebtn" type="button" disabled>無法更改</button>
                    </div>
                    <p className="acc_alertText">▸ 如需更新此資料請聯絡本會資訊組 ◂</p>
                </div>
                <div className="list-userIn">
                    <p className="lu-title">帳戶ID</p>
                    <div className="lu-fc">
                        <p className="lu_p">{userID}</p>
                    </div>
                </div>
            </form>
            <div className='mcform'>
                <button className="list-btn" onClick={logout}>
                    <div className="lb-fc">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                             fill="#000">
                            <path
                                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        <p className="lb-title">登出帳戶</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
                <span className="list-btn-line"></span>
                <button className="list-btn">
                    <div className="lb-fc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
                        <p className="lb-title">認證身份</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
            </div>
        </>
    );
}

const SE = () => {

    return (
        <>
            <h1 className="acc_top_formtitle" id="mctitle">安全性</h1>
            <p className="acc_top_formtext" id="mctitle">管理你的帳戶安全</p>
            <div className="mcform" id="se_mcbox">
                <Link className="list-btn" to='/account/security/updatepassword'>
                    <div className="lb-fc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                        <p className="lb-title">密碼</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </Link>
                <span className="list-btn-line"></span>
                <button className="list-btn">
                    <div className="lb-fc">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>    
                        <div className="se_libtn_textbox">
                            <p className="lb-title">電子郵件</p>
                            <p className="lb-p"></p>
                        </div>
                    </div>
                </button>
                <span className="list-btn-line"></span>
                <button className="list-btn">
                    <div className="lb-fc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
                        <p className="lb-title">手機</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
                
            </div>
            <div className="mcform">
                <button className="list-btn">
                    <div className="lb-fc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
                        <p className="lb-title">認證身份</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
                <span className="list-btn-line"></span>
                <button className="list-btn" >
                    <div className="lb-fc">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        <p className="lb-title">登出帳戶</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
                <span className="list-btn-line"></span>
                <button className="list-btn">
                    <div className="lb-fc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>
                        <p className="lb-title">刪除帳號</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#828282"><path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z"/></svg>
                </button>
            </div>
            <p>有其他問題？請聯絡本會資訊組</p>
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
            <h1 className="acc_top_formtitle" id="mctitle">更新密碼</h1>
            <p className="acc_top_formtext" id="mctitle">更新密碼使您的帳戶更安全</p>
            <form className="changepassword_form" onSubmit={handleChangePassword}>
                <TextField required id="currentPassword" label="當前密碼" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} fullWidth variant="filled" sx={{ margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': { fontFamily: 'NotoSansTC', fontWeight: '500' },'.MuiFilledInput-root': { borderTopRightRadius: '10px', borderTopLeftRadius: '10px' },'.MuiFilledInput-underline::before': { borderBottomColor: '#e5e5e5' }}}/>
                <TextField required id="newPassword" label="新密碼" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth variant="filled" sx={{ margin: '10px','.MuiInputBase-input, .MuiFormLabel-root': { fontFamily: 'NotoSansTC', fontWeight: '500' },'.MuiFilledInput-root': { borderTopRightRadius: '10px', borderTopLeftRadius: '10px' },'.MuiFilledInput-underline::before': { borderBottomColor: '#e5e5e5' }}}/>
                <button className="changebtn cpw-pagebtn" type="submit">更新</button>
            </form>
        </>
    );
};

const Menbercenter = () => {
    const location = useLocation();
    const currentPath = window.location.pathname;

    return (
        <>
            <LoadingBox />
            <div className="mcbox">
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
                <div className="acc_NavBar">
                    <p className="acc_nav_formtext">選單</p>
                    <Link to='/account' className={currentPath === '/account' ? 'acc_navbtn active':'acc_navbtn'}>
                        {currentPath != '/account' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4d4d4d"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        }
                        總覽
                    </Link>
                    <Link to='/account/security' className={currentPath.startsWith('/account/security') ? 'acc_navbtn active':'acc_navbtn'}>
                        {!currentPath.startsWith('/account/security') ? 
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4d4d4d"><path d="M480-874q8 0 14.5 1t13.5 4l240 90q23 9 37.5 29t14.5 45v125q0 17-11.5 28.5T760-540q-17 0-28.5-11.5T720-580v-124l-240-90-240 90v188q0 50 14.5 100t40 95q25.5 45 62 81t79.5 59q15 8 21.5 23t.5 30q-7 16-22.5 22t-30.5-2q-113-56-179-169t-66-239v-189q0-25 14.5-45t37.5-29l240-90q7-3 14-4t14-1ZM680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Zm200 214q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q25 0 47-9.5t39-27.5q5-6 4-13.5t-9-11.5q-19-9-39.5-13.5T680-240q-21 0-41.5 4.5T599-222q-8 4-9 11.5t4 13.5q17 18 39 27.5t47 9.5Z"/></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v122q0 17-15 27.5t-32 5.5q-18-5-36-7.5t-37-2.5q-116 0-198 82t-82 198q0 32 7.5 62.5T429-156q9 19-5.5 34t-33.5 6q-42-22-77-54t-62-70q-43-59-67-129.5T160-516Zm520 236q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q25 0 47-9.5t39-27.5q5-6 4-13.5t-9-11.5q-19-9-39.5-13.5T680-240q-21 0-41.5 4.5T599-222q-8 4-9 11.5t4 13.5q17 18 39 27.5t47 9.5Z"/></svg>
                        }
                        安全性
                    </Link>
                    <Link to='/account/profile' className="acc_navbtn"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4d4d4d"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg> 用戶公告</Link>
                </div>
                <div className="contentbox">
                    <Routes>
                        <Route path='' element={<ACHome />}></Route>
                        <Route path='security' element={<SE />}></Route>
                        <Route path='security/updatepassword' element={<ChangePassword />}></Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Menbercenter;