import React, {useEffect, useState} from "react";
import './css/page.css'
import { app, storage, ref, uploadBytesResumable, collection, addDoc, getDoc, getDocs, store, doc, setDoc, onAuthStateChanged, CheckAuth, createUserWithEmailAndPassword, signOut } from './firebase'
import loadingGIF from './assets/loadingGIF.gif'
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Menu, Button, styled, Switch } from "@mui/material";

function Register() {

    const [user, setUser] = useState(null);
    const [adminAccess, setAdminAccess] = useState(false);
    useEffect(() => {
        document.title = 'LIP 內部帳號註冊'
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
            fetchUserData(currentUser);
            }
        });
        const fetchUserData = async (currentUser) => {
            const userGradeRef = doc(store, 'users', currentUser.uid);
            const docSnap = await getDoc(userGradeRef);
            if (docSnap.exists()) {
            setAdminAccess(docSnap.data().admin_access)
            }
        };
  
      // 清理事件監聽器和訂閱
      return () => {
        unsubscribe();
      };
    })

    //用戶資訊狀態管理
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [grade, setGrade] = useState('')
    const [role, setRole] = useState('')
    const [Class, setClass] = useState('')
    const [password, setPassword] = useState('')
    const [adac, setAdac] = useState(false)
    const [userLevel, setUserLevel] = useState('')
    const [ckreadpaper, setCkreadpaper] = useState(false)

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

    const navigate = useNavigate();
    const location = useLocation();

    const regAuth = (event) => {
        event.preventDefault();
        console.log('執行中')
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // 用戶成功創建後，將其他資料存入 Firestore
            return setDoc(doc(store, "users", user.uid), {
                name: name,
                admin_access: adac,
                class: Class,
                userLevel: userLevel,
                role: role,
                grade: grade,
                createdTime: new Date()  // 保存創建日期
            });
        })
        .then(() => {
            window.alert('帳號建立成功');
            signOut(auth);
        })
        .catch((error) => {
            // 錯誤處理
            window.alert('Error creating user:', error.code, error.message);
        });
    }

    return(
        <>
            <CheckAuth />
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
                            </Select>
                        </CFormControl>
                        <span className="reg_line"></span>
                        <div className="switchbox">
                            <p className="switch_text">管理中心存取權限</p>
                            <Switch className='switchbtn' inputProps={{ 'aria-label': 'controlled' }} checked={adac} onChange={(e) => setAdac(e.target.checked)} sx={{padding: "5px",display:'flex',alignItems:"center",justifyItems: 'center', justifyContent: 'center','.MuiSwitch-track': {backgroundColor: '#a9a9a9',opacity: '0.38',borderRadius: '100px',},'.MuiSwitch-thumb': {backgroundColor: '#808080',boxShadow: '0px 0px 0px 0px',transform: 'scale(0.8)'},'.Mui-checked': {'.MuiSwitch-thumb': {backgroundColor: 'white',boxShadow: '0px 0px 0px 0px',transform: 'scale(1)'}}, '.MuiButtonBase-root': {padding:'3.5px', margin:'5px'}}} />
                        </div>
                        
                        {adac && <CFormControl fullWidth variant="filled" required>
                            <InputLabel id="userlevel-label">用戶權限等級</InputLabel>
                            <Select labelId="userlevel-label" id='role' value={userLevel} onChange={(e) => setUserLevel(e.target.value)} className="select-input" MenuProps={{PaperProps: {component: CMenuPaper}}} >
                                <CMenuItem value='L1'>L1</CMenuItem>
                                <CMenuItem value='L2'>L2</CMenuItem>
                                <CMenuItem value='L3'>L3</CMenuItem>
                                <CMenuItem value='L4'>L4 (最高權限)</CMenuItem>
                            </Select>
                        </CFormControl>}
                       
                        <span className="reg_line"></span>
                        <div className="switchbox">
                            <p className="switch_text">已詳閱帳號建立規定</p>
                            <Switch className='switchbtn' required inputProps={{ 'aria-label': 'controlled' }} checked={ckreadpaper} onChange={(e) => setCkreadpaper(e.target.checked)} sx={{padding: "5px",display:'flex',alignItems:"center",justifyItems: 'center', justifyContent: 'center','.MuiSwitch-track': {backgroundColor: '#a9a9a9',opacity: '0.38',borderRadius: '100px',},'.MuiSwitch-thumb': {backgroundColor: '#808080',boxShadow: '0px 0px 0px 0px',transform: 'scale(0.8)'},'.Mui-checked': {'.MuiSwitch-thumb': {backgroundColor: 'white',boxShadow: '0px 0px 0px 0px',transform: 'scale(1)'}}, '.MuiButtonBase-root': {padding:'3.5px', margin:'5px'}}} />
                        </div>
                        <button disabled={!ckreadpaper} className="reg_formbtn" id='reg_submitbtn' type="submit">建立帳號</button>
                        <p className="alertText">▸ 為維護本平台會員權益，建立內部帳號後系統會自動登出所有帳號 ◂</p>
                        <p className="alertText">▸ 如有任何問題請洽本會資訊組 ◂</p>
                    </form>
                </div>
            }
        </>
    )
}


export default Register;