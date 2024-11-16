import React, {useEffect, useState} from "react";
import './css/page.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Menu, Button, styled, Switch } from "@mui/material";
import { useAuth } from '../AuthContext';

function Register() {
    const {userLevel} = useAuth()
    const [adminAccess, setAdminAccess] = useState(false);
    useEffect(() => {
        document.title = 'LIP 內部帳號註冊'
        // 檢測用戶層級是否可以創建帳號
        if (userLevel === 'L04') {
            setAdminAccess(true);
        } else {
            setAdminAccess(false);
        }
    })

    //新用戶資訊狀態管理
    const [new_name, setName] = useState('')
    const [new_email, setEmail] = useState('')
    const [grade, setGrade] = useState('')
    const [role, setRole] = useState('')
    const [Class, setClass] = useState('')
    const [new_password, setPassword] = useState('')
    const [adac, setAdac] = useState(false)
    const [newuserLevel, setNewUserLevel] = useState('')
    const [ckreadpaper, setCkreadpaper] = useState(false)
    const [ad, setAd] = useState('0')

    //註冊狀態管理
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (adac === true) {
            setAd('1')
        }

        const loadingbox = document.getElementById('loadingbox');
        const mainbox = document.getElementById('mainbox');
        if (loading === true || message !== ''){
            loadingbox.classList.remove('hidden')
            loadingbox.classList.add('fadeIn')
            setTimeout(() => {
                mainbox.classList.remove('fade')
                mainbox.classList.add('show')
                loadingbox.classList.remove('fadeIn')
                loadingbox.classList.add('show')
            },200)
        }
    }, [adac, loading, message]);

    const closebox = () => {
        const loadingbox = document.getElementById('loadingbox');
        const mainbox = document.getElementById('mainbox');
        loadingbox.classList.remove('fadeIn')
        loadingbox.classList.add('hidden')
        setTimeout(() => {
            mainbox.classList.remove('show')
            mainbox.classList.add('fade')
            loadingbox.classList.remove('show')
            loadingbox.classList.remove('fadeIn')
        },200)
    }


    const Loadingbox = () => {
        if (loading === false && message !== '') {
            return (
                <div className="loadingbox hidden" id="loadingbox">
                    <div className="mainbox fade" id="mainbox">
                        <h3 style={{margin:'0'}}>系統通知</h3>
                        <p>{message}</p>
                        <button className='close_box_btn' onClick={closebox}>關閉</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="loadingbox hidden" id="loadingbox">
                    <div className="mainbox fade" id="mainbox">
                        <div className='loader'></div>
                        <h3>註冊中</h3>
                    </div>
                </div>
            );
        }
    }

    //元件樣式設定
    const CFormControl = styled(FormControl)({
        margin: '10px',
        maxWidth: '500px',
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
        backgroundColor: 'white',
        boxShadow: '0px 0px 4px 1px #e5e5e5',
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

    const regAuth = async (event) => {
        event.preventDefault();
        console.log('執行中')
        try {
            setLoading(true);
            const creatNewUser = await fetch('https://lycaapis.zhicheng-gong.workers.dev/userRegister', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: new_email,
                    password: new_password,
                    name: new_name,
                    admin_access: ad,
                    user_level: newuserLevel,
                    user_class: Class,
                    user_grade: grade,
                    user_role: role
                })
            })

            const result = await creatNewUser.json()

            if (creatNewUser.ok){
                setLoading(false);
                setMessage('創建成功')
                setTimeout(() => {
                    window.location.herf = '/'
                }, 500)
            } else {
                setLoading(false);
                setTimeout(() => {
                    setMessage(result.error)
                }, 200)
            }
        } catch (e){
            setLoading(false);
            console.log(e)
        }
    }

    return(
        <>
            <Loadingbox />
            {!adminAccess ? <h1 className="sitetitle">權限不足</h1>:
                <div>
                    <div className="reg_titlebox">
                        <h1 className="sitetitle" id="reg_sitetitle">LIP 內部帳號註冊</h1>
                        <p className="type_text">限幹部</p>
                    </div>
                    <form className="reg_formbox" id="reg_formbox" onSubmit={regAuth}>
                        <TextField id='name' label="姓名" type="text" required onChange={(e) => setName(e.target.value)} fullWidth variant="filled" sx={{margin: '10px', maxWidth: '500px', '.MuiInputBase-root': {borderRadius: '10px', border: '1px solid #e5e5e5', backgroundColor: 'transparent'}, '.Mui-focused input': {backgroundColor: 'transparent'}, '.MuiInputBase-root::after, .MuiInputBase-root::before, .MuiInputBase-root:hover::before': {borderBottomWidth: '0px'}, '.MuiInputBase-root::before': {borderBottomWidth: '0px'}, '.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC',fontWeight: '500',},'.MuiFilledInput-root': {borderTopRightRadius: '10px',borderTopLeftRadius: '10px',},'.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}}}/>
                        <TextField id='email' label="電子郵件" type="email" required onChange={(e) => setEmail(e.target.value)} fullWidth variant="filled" sx={{margin: '10px', maxWidth: '500px', '.MuiInputBase-root': {borderRadius: '10px', border: '1px solid #e5e5e5', backgroundColor: 'transparent'}, '.Mui-focused input': {backgroundColor: 'transparent'}, '.MuiInputBase-root::after, .MuiInputBase-root::before, .MuiInputBase-root:hover::before': {borderBottomWidth: '0px'}, '.MuiInputBase-root::before': {borderBottomWidth: '0px'}, '.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC',fontWeight: '500',},'.MuiFilledInput-root': {borderTopRightRadius: '10px',borderTopLeftRadius: '10px',},'.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}}}/>
                        <TextField id='password' label="密碼" type="password" required onChange={(e) => setPassword(e.target.value)} fullWidth variant="filled" sx={{margin: '10px', maxWidth: '500px', '.MuiInputBase-root': {borderRadius: '10px', border: '1px solid #e5e5e5', backgroundColor: 'transparent'}, '.Mui-focused input': {backgroundColor: 'transparent'}, '.MuiInputBase-root::after, .MuiInputBase-root::before, .MuiInputBase-root:hover::before': {borderBottomWidth: '0px'}, '.MuiInputBase-root::before': {borderBottomWidth: '0px'}, '.MuiInputBase-input, .MuiFormLabel-root': {fontFamily: 'NotoSansTC',fontWeight: '500',},'.MuiFilledInput-root': {borderTopRightRadius: '10px',borderTopLeftRadius: '10px',},'.MuiFilledInput-underline::before': {borderBottomColor: '#e5e5e5'}}}/>
                        <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="grade-label">年級</InputLabel>
                            <Select labelId="grade-label" id='grade' value={grade} onChange={(e) => setGrade(e.target.value)} className="select-input" MenuProps={{PaperProps: {component: CMenuPaper}}} >
                                <CMenuItem value='G01'>1年級</CMenuItem>
                                <CMenuItem value='G02'>2年級</CMenuItem>
                                <CMenuItem value='G03'>3年級</CMenuItem>
                            </Select>
                        </CFormControl>
                        <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="class-label">班級</InputLabel>
                            <Select labelId="class-label" id='class' value={Class} onChange={(e) => setClass(e.target.value)} className="select-input" MenuProps={{PaperProps: {component: CMenuPaper}}} >
                                <CMenuItem value='C01'>忠</CMenuItem>
                                <CMenuItem value='C02'>孝</CMenuItem>
                                <CMenuItem value='C03'>仁</CMenuItem>
                                <CMenuItem value='C04'>愛</CMenuItem>
                                <CMenuItem value='C05'>義</CMenuItem>
                                <CMenuItem value='C06'>信</CMenuItem>
                            </Select>
                        </CFormControl>
                        <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="role-label">身份</InputLabel>
                            <Select labelId="role-label" id='role' value={role} onChange={(e) => setRole(e.target.value)} className="select-input" MenuProps={{PaperProps: {component: CMenuPaper}}} >
                                <CMenuItem value='R04'>學權組長</CMenuItem>
                                <CMenuItem value='R05'>活動組長</CMenuItem>
                                <CMenuItem value='R06'>公關組長</CMenuItem>
                                <CMenuItem value='R07'>美宣組長</CMenuItem>
                                <CMenuItem value='R14'>學權</CMenuItem>
                                <CMenuItem value='R15'>活動</CMenuItem>
                                <CMenuItem value='R16'>公關</CMenuItem>
                                <CMenuItem value='R17'>美宣</CMenuItem>
                                <CMenuItem value='R08'>文書</CMenuItem>
                                <CMenuItem value='R09'>事務</CMenuItem>
                            </Select>
                        </CFormControl>
                        <span className="reg_line"></span>
                        <div className="switchbox">
                            <p className="switch_text">管理中心存取權限</p>
                            <Switch className='switchbtn' inputProps={{ 'aria-label': 'controlled' }} checked={adac} onChange={(e) => setAdac(e.target.checked)} sx={{padding: "5px",display:'flex',alignItems:"center",justifyItems: 'center', justifyContent: 'center','.MuiSwitch-track': {backgroundColor: '#a9a9a9',opacity: '0.38',borderRadius: '100px',},'.MuiSwitch-thumb': {backgroundColor: '#808080',boxShadow: '0px 0px 0px 0px',transform: 'scale(0.8)'},'.Mui-checked': {'.MuiSwitch-thumb': {backgroundColor: 'white',boxShadow: '0px 0px 0px 0px',transform: 'scale(1)'}}, '.MuiButtonBase-root': {padding:'3.5px', margin:'5px'}}} />
                        </div>
                        
                        {adac && <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="userlevel-label">用戶權限等級</InputLabel>
                            <Select labelId="userlevel-label" id='role' value={newuserLevel} onChange={(e) => setNewUserLevel(e.target.value)} className="select-input" MenuProps={{PaperProps: {component: CMenuPaper}}} >
                                <CMenuItem value='L01'>L01</CMenuItem>
                                <CMenuItem value='L02'>L02</CMenuItem>
                                <CMenuItem value='L03'>L03</CMenuItem>
                                <CMenuItem value='L04'>L04 (最高權限)</CMenuItem>
                            </Select>
                        </CFormControl>}
                       
                        <span className="reg_line"></span>
                        <div className="switchbox">
                            <p className="switch_text">已詳閱帳號建立規定</p>
                            <Switch className='switchbtn' required inputProps={{ 'aria-label': 'controlled' }} checked={ckreadpaper} onChange={(e) => setCkreadpaper(e.target.checked)} sx={{padding: "5px",display:'flex',alignItems:"center",justifyItems: 'center', justifyContent: 'center','.MuiSwitch-track': {backgroundColor: '#a9a9a9',opacity: '0.38',borderRadius: '100px',},'.MuiSwitch-thumb': {backgroundColor: '#808080',boxShadow: '0px 0px 0px 0px',transform: 'scale(0.8)'},'.Mui-checked': {'.MuiSwitch-thumb': {backgroundColor: 'white',boxShadow: '0px 0px 0px 0px',transform: 'scale(1)'}}, '.MuiButtonBase-root': {padding:'3.5px', margin:'5px'}}} />
                        </div>
                        <button disabled={!ckreadpaper} className="reg_formbtn" id='reg_submitbtn' type="submit">建立帳號</button>
                        <p className="alertText">▸ 注意：創建帳號為L04層級者才可創建 ◂</p>
                        <p className="alertText">▸ 如有任何問題請洽本會資訊組 ◂</p>
                    </form>
                </div>
            }
        </>
    )
}


export default Register;