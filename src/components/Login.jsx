import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/accountsystem.css'
import { apiService } from "../services/api.js";

function LoadingBox() {
    return (
        <div className="loadingbox hidden" id="loadingbox">
            <div className="mainbox fade" id="mainbox">
                <h3>登入中</h3>
                <div className="loader" id="loadingGIF"></div>
            </div>
        </div>
    )
}

function Login() {
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const submit = async (e) => {
        e.preventDefault();
        try {
            await apiService.userLogin(email, password)
            window.alert('測試成功')
        } catch (e) {
            console.log(e)
            setErrorMessage(e)
        }
    }

    return (
        <section className='login-page'>
            <form onSubmit={submit}>
                <ul>
                    <li>
                        <label>帳號</label>
                        <input type={'text'} onChange={(e) => {setEmail(e.target.value)}}></input>
                    </li>
                    <li>
                        <label>密碼</label>
                        <input type={'password'} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </li>
                </ul>
                <button>登入</button>
            </form>
        </section>
    )
}

export default Login;