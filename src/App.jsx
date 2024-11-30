import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { register } from './serviceWorkerRegistration';
import logo from './pages/assets/web_logo.svg'
import { useAuth } from './AuthContext';

/* 頁面 */
import Index from './pages/Home';
import Announcement from './pages/announcement';
import Proposal from './pages/proposal';
import Login from './pages/Login';
import Menbercenter  from './pages/Menbercenter';
import OnVote from './pages/onlinevoting';
import Register from './pages/register';
import Admin  from "./pages/Admin.jsx";

/* icon */
import { HomeIcon, NewsIcon, ProposalIcon, McIcon } from './icons/Graphic control'
import './App.css';

//側邊欄
function SideBar(){
  const { adminAccess, user, logoutUser, IsBeta } = useAuth()
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
      setTimeout(() => {
        btn.classList.add('open')
      }, 200)


    } else if (Nav.classList.contains('close')){
      Nav.classList.add('open')
      Nav.classList.remove('close')
      btn.classList.add('normal')
      setTimeout(()=>{
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
      window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org';
    }, 500)
  }

  return (
    <div className={currentPath === '/login' ? 'displaynone':'show'}>
      <nav className='sidebar open' id='sidebar'>
        <div className='logobox'>
          <img src={logo} className='applogo'></img>
          {IsBeta &&
              <p>BETA</p>
          }
        </div>
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
              <div className={currentPath === '/admin' ? 'isin sidebtn' : 'sbtn sidebtn'}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill={currentPath === '/admin' ? '#2b2b2b' : "none"} xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11.223 2.43177C11.5066 2.27421 11.6484 2.19543 11.7985 2.16454C11.9315 2.13721 12.0685 2.13721 12.2015 2.16454C12.3516 2.19543 12.4934 2.27421 12.777 2.43177L20.177 6.54288C20.4766 6.70928 20.6263 6.79248 20.7354 6.91082C20.8318 7.01551 20.9049 7.13959 20.9495 7.27477C21 7.42756 21 7.59889 21 7.94153V16.0586C21 16.4013 21 16.5726 20.9495 16.7254C20.9049 16.8606 20.8318 16.9847 20.7354 17.0893C20.6263 17.2077 20.4766 17.2909 20.177 17.4573L12.777 21.5684C12.4934 21.726 12.3516 21.8047 12.2015 21.8356C12.0685 21.863 11.9315 21.863 11.7985 21.8356C11.6484 21.8047 11.5066 21.726 11.223 21.5684L3.82297 17.4573C3.52345 17.2909 3.37369 17.2077 3.26463 17.0893C3.16816 16.9847 3.09515 16.8606 3.05048 16.7254C3 16.5726 3 16.4013 3 16.0586V7.94153C3 7.59889 3 7.42756 3.05048 7.27477C3.09515 7.13959 3.16816 7.01551 3.26463 6.91082C3.37369 6.79248 3.52345 6.70928 3.82297 6.54288L11.223 2.43177Z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <p className='link_p'>管理中心</p>
              </div>
            </Link>)}
          <button className='ft_btn' id='btn_logout' onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                 fill="rgba(124, 124, 124, 0.745)">
              <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"/>
            </svg>
            {user ? <p className='link_p'>登出</p> : <p className='link_p'>登入</p>}
          </button>
        </div>
      </nav>
      <button className='sidechangebtn normal' id='changemenu' onClick={changemenu}>
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#34495D">
          <path
              d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
      </button>
    </div>
  )
}

function Mobliebar(){
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={currentPath === '/login' ? 'displaynone':'moblieshow'}>
      <nav className='mobliebar' >
        <Link to="/" className={currentPath === '/' ? 'navbtn-active':''}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.12602 14C8.57006 15.7252 10.1362 17 12 17C13.8638 17 15.4299 15.7252 15.874 14M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link to="/announcement" className={currentPath === '/announcement' ? 'navbtn-active':''}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.5 8V16.2C20.5 17.8802 20.5 18.7202 20.173 19.362C19.8854 19.9265 19.4265 20.3854 18.862 20.673C18.2202 21 17.3802 21 15.7 21H8.3C6.61984 21 5.77976 21 5.13803 20.673C4.57354 20.3854 4.1146 19.9265 3.82698 19.362C3.5 18.7202 3.5 17.8802 3.5 16.2V8M3.6 3H20.4C20.9601 3 21.2401 3 21.454 3.10899C21.6422 3.20487 21.7951 3.35785 21.891 3.54601C22 3.75992 22 4.03995 22 4.6V6.4C22 6.96005 22 7.24008 21.891 7.45399C21.7951 7.64215 21.6422 7.79513 21.454 7.89101C21.2401 8 20.9601 8 20.4 8H3.6C3.03995 8 2.75992 8 2.54601 7.89101C2.35785 7.79513 2.20487 7.64215 2.10899 7.45399C2 7.24008 2 6.96005 2 6.4V4.6C2 4.03995 2 3.75992 2.10899 3.54601C2.20487 3.35785 2.35785 3.20487 2.54601 3.10899C2.75992 3 3.03995 3 3.6 3ZM9.6 11.5H14.4C14.9601 11.5 15.2401 11.5 15.454 11.609C15.6422 11.7049 15.7951 11.8578 15.891 12.046C16 12.2599 16 12.5399 16 13.1V13.9C16 14.4601 16 14.7401 15.891 14.954C15.7951 15.1422 15.6422 15.2951 15.454 15.391C15.2401 15.5 14.9601 15.5 14.4 15.5H9.6C9.03995 15.5 8.75992 15.5 8.54601 15.391C8.35785 15.2951 8.20487 15.1422 8.10899 14.954C8 14.7401 8 14.4601 8 13.9V13.1C8 12.5399 8 12.2599 8.10899 12.046C8.20487 11.8578 8.35785 11.7049 8.54601 11.609C8.75992 11.5 9.03995 11.5 9.6 11.5Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <button className='sparkbtn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="icon icon-tabler icons-tabler-outline icon-tabler-flare">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3z"/>
          </svg>
        </button>
        <Link to="/proposal" className={currentPath === '/proposal' ? 'navbtn-active':''}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link to="/account" className={currentPath === '/account' ? 'navbtn-active':''}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
                d="M12 15C8.8299 15 6.01077 16.5306 4.21597 18.906C3.82968 19.4172 3.63653 19.6728 3.64285 20.0183C3.64773 20.2852 3.81533 20.6219 4.02534 20.7867C4.29716 21 4.67384 21 5.4272 21H18.5727C19.3261 21 19.7028 21 19.9746 20.7867C20.1846 20.6219 20.3522 20.2852 20.3571 20.0183C20.3634 19.6728 20.1703 19.4172 19.784 18.906C17.9892 16.5306 15.17 15 12 15Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51469 3 7.49997 5.01472 7.49997 7.5C7.49997 9.98528 9.51469 12 12 12Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </nav>
    </div>
  )
}


function App() {
  const {IsBeta, user, loading} = useAuth()

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
    if (IsBeta) {
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
  }, [user, loading, IsBeta]);

  const Footer = () => {
    return(
        <footer>
          <p>Copyright © 2024 LYCA 保留一切權利。</p>
          <div className='footer-linkbox'>
            <a href='https://lyhsca.org'>官方網站</a>
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
                <Route path='/Admin/*' element={<Admin />}></Route>
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
