import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { register } from './serviceWorkerRegistration';
import logo from './pages/assets/applogo_noback.png'
import loadingGIF from './pages/assets/loadingGIF.gif'
import { useAuth } from './AuthContext';

/* 頁面 */
import Index from './pages/Home';
import Announcement from './pages/announcement';
import Proposal from './pages/proposal';
import Login from './pages/Login';
import Menbercenter  from './pages/Menbercenter';
import OnVote from './pages/onlinevoting';
import Register from './pages/register';

/* icon */
import { HomeIcon, NewsIcon, ProposalIcon, McIcon } from './icons/Graphic control'
import './App.css';

function LoadingBox() {
  return (
      <div className="loadingbox hidden" id="loadingbox">
          <div className="mainbox fade" id="mainbox">
              <h3>登出中</h3>
              <img src={loadingGIF} className="gif" id="loadingGIF"></img>
          </div>
      </div>
  )
}

//側邊欄
function SideBar(){
  const { adminAccess, user, logoutUser } = useAuth()
  const location = useLocation();
  const currentPath = location.pathname;

  function changemenu(){
    var Nav = document.getElementById('sidebar')
    var btn = document.getElementById('changemenu')
    var btn_p = document.querySelectorAll('.link_p')
    if (Nav.classList.contains('open')){
      btn_p.forEach((link_a) => {
        link_a.classList.add('hidden')
      })
      Nav.classList.remove('open')
      Nav.classList.add('close')
      btn.classList.remove('normal')
      btn.classList.add('open')

    } else if (Nav.classList.contains('close')){
      Nav.classList.add('open')
      Nav.classList.remove('close')
      setTimeout(()=>{
        btn.classList.add('normal')
        btn.classList.remove('open')
        btn_p.forEach((link_a) => {
          link_a.classList.remove('hidden')
        })
      },200)
      
    }
  }

  const logout = () => {
    logoutUser();
    setTimeout(() => {
      window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.app.lyhsca.org';
    }, 500)
  }

  return (
    <div className={currentPath === '/login' ? 'displaynone':'show'}>
      <nav className='sidebar open' id='sidebar'>
        <img src={logo} className='applogo'></img>
        <Link to="/">
          <div className={currentPath === '/' ? 'isin sidebtn':'sbtn sidebtn'}>
            <HomeIcon />
            <p className='link_p' id='link_home'>首頁</p>
          </div>
        </Link>
        <Link to="/announcement">
          <div className={currentPath === '/announcement' ? 'isin sidebtn':'sbtn sidebtn'}>
            <NewsIcon />
            <p className='link_p' id='link_ac'>校園公告</p>
          </div>
        </Link>
        <Link to="/proposal">
          <div className={currentPath === '/proposal' ? 'isin sidebtn':'sbtn sidebtn'}>
            <ProposalIcon />
            <p className='link_p'  id='link_pr'>政見進度</p>
          </div>
        </Link>
        <Link to="/account">
          <div className={currentPath.startsWith('/account') ? 'isin sidebtn':'sbtn sidebtn'}>
            <McIcon />
            <p className='link_p'  id='link_mc'>我的帳戶</p>
          </div>
        </Link>
        <div className='ftbox'>
          <span className='ftbox_line'></span>
          {adminAccess && (
            <Link to='/admin' id='btn_adcenter'>
              <div className={currentPath === '/admin' ? 'isin sidebtn':'sbtn sidebtn'}>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill={currentPath === '/admin' ? '#2b2b2b':"rgba(124, 124, 124, 0.745)"}><path d="M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z"/></svg>
                <p className='link_p'>管理中心</p>
              </div>
            </Link>)}
          <button className='ft_btn' id='btn_logout' onClick={logout} >
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="rgba(124, 124, 124, 0.745)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"/></svg>
            {user ? <p className='link_p'>登出</p> : <p className='link_p'>登入</p>}
          </button>
        </div>
      </nav>
      <button className='sidechangebtn normal' id='changemenu' onClick={changemenu}>
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#34495D"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
      </button>
    </div>
  )
}

function Mobliebar(){
  const location = useLocation();
  const currentPath = window.location.pathname;

  return (
    <div className={currentPath === '/login' ? 'displaynone':'moblieshow'}>
      <nav className='mobliebar'>
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/announcement">
          <NewsIcon />
        </Link>
        <Link to="/proposal">
          <ProposalIcon />
        </Link>
        <Link to="/account">
          <McIcon />
        </Link>
      </nav>
    </div>
  )
}


function App(){
  const { user, loading } = useAuth()

  const CheckUser = () => {
    if (user === true && loading !== true) {
      console.log('用戶資料載入完成')
      console.log('已登入帳戶')
    } else {
      console.log('載入中')
    }
  }

  useEffect(() => {
    CheckUser();
    register();
    const isBeta = process.env.VITE_IS_BETA === 'true';
    if (isBeta) {
      console.log('This is the Beta version!');
    } else {
      console.log('This is the Stable version!');
    }

    // 當視窗寬度變更至小於1100px時，自動合上側邊欄
    const handleResize = () => {
      document.body.style.height = window.innerHeight + 'px';
      if (window.innerWidth < 1100) {
        const Nav = document.getElementById('sidebar');
        const btn = document.getElementById('changemenu');
        const btn_p = document.querySelectorAll('.link_p');
        btn_p.forEach((link_a) => {
          link_a.classList.add('hidden');
        });
        Nav.classList.remove('open');
        Nav.classList.add('close');
        btn.classList.remove('normal');
        btn.classList.add('open');
      }
    };


    window.addEventListener('resize', handleResize);
  }, [user, loading]);

  const Footer = () => {
    return(
        <footer>
          <p>Copyright © 2024 LYCA 保留一切權利。</p>
          <div className='footer-linkbox'>
            <a>官方網站</a>
            <a>聯絡我們</a>
            <a>學權信箱</a>
          </div>
        </footer>
    )
  };

  return (
    <>
      <Router>
        <Mobliebar />
        <main>
          <SideBar />
          <div className='section'>
            <div>
              <Routes baseName='/'>
                <Route path='/' element={<Index />}></Route>
                <Route path='/announcement' element={<Announcement />}></Route>
                <Route path='/proposal' element={<Proposal />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/account/*' element={<Menbercenter />}></Route>
                <Route path='/online-voting' element={<OnVote />}></Route>
                <Route path='/ADregister' element={<Register />}></Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
