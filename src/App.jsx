import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import logo from './assets/logo.png'
import { useAuth } from './services/AuthContext.jsx';

/* 頁面 */
import Index from './components/Home';
import Announcement from './components/announcement';
import Proposal from './components/proposal';
import Login from './components/Login';
import Account  from './components/Account';
import OnVote from './components/onlinevoting';
import Register from './components/register';
import Admin  from "./components/Admin.jsx";
import PdfViewer from './components/pdfviewer';
import Intro from "./components/Intro.jsx";

/* icon & CSS */
import { HomeIcon, NewsIcon, ProposalIcon, McIcon } from './components/Graphic control.jsx'
import './App.css';
import {registerSW} from "virtual:pwa-register";

//側邊欄
function SideBar(){
  const { adminAccess, user, logoutUser, IsBeta } = useAuth()
  const location = useLocation();
  const currentPath = location.pathname;

  // 登出
  const logout = () => {
    logoutUser();
    setTimeout(() => {
      window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org';
    }, 500)
  }

  // 依據螢幕寬度來決定側邊欄的顯示
  const [ viewportWidth, setViewportWidth] = useState(501)
  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // 添加事件監聽器
    window.addEventListener('resize', handleResize);
    // 在組件卸載時移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // `[]` 確保 effect 僅在初始渲染時執行

  // 側邊欄的開啟和關閉
  const [isOpen, setIsOpen] = useState(true);
  // 控制函數
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <>
        {viewportWidth > 500 && (
        <div className='sidebar'>
          <nav className={isOpen ? 'menu-open' : 'menu-close'} id='sidebar'>
            <div className='appLogo'>
              <img src={logo} className='applogo-img'></img>
              {IsBeta &&
                  <p className='beta-text'>BETA</p>
              }
            </div>
            <ul className='sidebar-btnlist'>
              <li aria-label='home-page-btn'>
                <Link to="/" className={`sidebar-btn ${currentPath === '/' && 'libtn-active'}`}>
                  <HomeIcon/>
                  <p className='libtn-text'>首頁</p>
                </Link>
              </li>
              <li aria-label='news-page-btn'>
                <Link to="/announcement" className={`sidebar-btn ${currentPath === '/announcement' && 'libtn-active'}`}>
                  <NewsIcon/>
                  <p className='libtn-text'>校園公告</p>
                </Link>
              </li>
              <li aria-label='proposal-page-btn'>
                <Link to="/proposal" className={`sidebar-btn ${currentPath === '/proposal' && 'libtn-active'}`}>
                  <ProposalIcon/>
                  <p className='libtn-text'>政見進度</p>
                </Link>
              </li>
              <li aria-label='account-page-btn'>
                <Link to="/account" className={`sidebar-btn ${currentPath.startsWith('/account') && 'libtn-active'}`}>
                  <McIcon/>
                  <p className='libtn-text'>我的帳戶</p>
                </Link>
              </li>
              <div className='sidebar-bottom-box'>
                {adminAccess && (
                    <Link to='/admin' id='btn_adcenter'
                          className={`sidebar-btn ${currentPath.startsWith('/admin') && 'libtn-active'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32"
                           viewBox="0 0 64 64">
                        <path
                            d="M 15 14 C 11.691 14 9 16.691 9 20 L 9 44 C 9 47.309 11.691 50 15 50 L 49 50 C 52.309 50 55 47.309 55 44 L 55 20 C 55 16.691 52.309 14 49 14 L 15 14 z M 15 18 L 49 18 C 50.103 18 51 18.897 51 20 L 51 44 C 51 45.103 50.103 46 49 46 L 15 46 C 13.897 46 13 45.103 13 44 L 13 20 C 13 18.897 13.897 18 15 18 z M 23.5 23 C 20.483 23 18 25.483 18 28.5 C 18 31.517 20.483 34 23.5 34 C 26.517 34 29 31.517 29 28.5 L 23.5 28.5 L 23.5 23 z M 34.5 24 C 33.672 24 33 24.671 33 25.5 C 33 26.329 33.672 27 34.5 27 L 44.5 27 C 45.328 27 46 26.329 46 25.5 C 46 24.671 45.328 24 44.5 24 L 34.5 24 z M 34.5 30 C 33.672 30 33 30.671 33 31.5 C 33 32.329 33.672 33 34.5 33 L 44.5 33 C 45.328 33 46 32.329 46 31.5 C 46 30.671 45.328 30 44.5 30 L 34.5 30 z M 30.5 36 C 29.672 36 29 36.671 29 37.5 L 29 38 L 19.5 38 C 18.67 38 18 38.67 18 39.5 C 18 40.33 18.67 41 19.5 41 L 29 41 L 29 41.5 C 29 42.329 29.672 43 30.5 43 C 31.328 43 32 42.329 32 41.5 L 32 37.5 C 32 36.671 31.328 36 30.5 36 z M 34 38 L 34 41 L 44.5 41 C 45.33 41 46 40.33 46 39.5 C 46 38.67 45.33 38 44.5 38 L 34 38 z"></path>
                      </svg>
                      <p className='libtn-text'>管理中心</p>
                    </Link>)}
                <button className='sidebar-btn' id='btn_logout' onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                       fill="rgba(124, 124, 124, 0.745)">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"/>
                  </svg>
                  {user ? <p className='libtn-text'>登出</p> : <p className='libtn-text'>登入</p>}
                </button>
                <button className='sidechangebtn normal' id='changemenu' onClick={toggleSidebar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="icon-xl-heavy">
                  <path fillRule="evenodd" clipRule="evenodd"
                          d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                          fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </ul>
          </nav>
        </div>
        )}
      </>
  )
}

function Mobliebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
      <div className={currentPath === '/login' ? 'displaynone' : 'moblieshow'}>
        <nav className='mobliebar'>
          <Link to="/" className={currentPath === '/' ? 'navbtn-active' : ''}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M8.12602 14C8.57006 15.7252 10.1362 17 12 17C13.8638 17 15.4299 15.7252 15.874 14M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/announcement" className={currentPath === '/announcement' ? 'navbtn-active' : ''}>
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
          <Link to="/proposal" className={currentPath === '/proposal' ? 'navbtn-active' : ''}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/account" className={currentPath === '/account' ? 'navbtn-active' : ''}>
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
    console.log(`App Version Build Time: ${import.meta.env.VITE_BUILD_TIME}`);

    // 註冊 Service Worker
    const updateSW = registerSW({
      onNeedRefresh() {
        // 創建更新提示 UI
        const updatePrompt = document.createElement('div')
        updatePrompt.className = 'update-prompt'
        updatePrompt.innerHTML = `
          <div class="update-content">
            <h3>新版本可用</h3>
            <p>當前版本: ${version.number}</p>
            <p>建置時間: ${version.buildTime}</p>
            <button id="updateButton">立即更新</button>
            <button id="laterButton">稍後再說</button>
          </div>
        `
        document.body.appendChild(updatePrompt)
        // 處理更新按鈕點擊
        document.getElementById('updateButton')?.addEventListener('click', () => {
          updateSW()
        })
        // 處理稍後按鈕點擊
        document.getElementById('laterButton')?.addEventListener('click', () => {
          updatePrompt.remove()
        })
      },
      onOfflineReady() {
        console.log('應用程式已可離線使用')
      }
    })

  }, []);  // 空陣列，意味著只有在組件掛載時執行一次

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

  const isPWAMode = window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches;

  const Sidebar_control = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    if (currentPath != '/home' && currentPath != '/login'){
      return (
          <>
              <SideBar/>
              <Mobliebar/>
          </>
      )
    }
  }

  return (
    <>
      <Router>
        <main>
          <Sidebar_control />
          <div className='main-section' aria-label='main-aria'>
            <Routes baseName='/'>
              <Route path='/' element={<Index/>}></Route>
              <Route path='/announcement' element={<Announcement/>}></Route>
              <Route path='/proposal' element={<Proposal/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/account/*' element={<Account/>}></Route>
              <Route path='/online-voting' element={<OnVote/>}></Route>
              <Route path='/ADregister' element={<Register/>}></Route>
              <Route path='/Admin/*' element={<Admin/>}></Route>
              <Route path='/pdfViewer' element={<PdfViewer/>}></Route>
              <Route path='/home' element={<Intro />}></Route>
            </Routes>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
