import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../css/page.css'
import { useAuth } from '../services/AuthContext.jsx';
import { version } from "../services/version.js";
import { apiService } from "../services/api.js";

function Index() {
    const { user, userName } = useAuth();
    const [ weatherData, setWeatherData ] = useState(null);

    const openIdLogin = () => {
        // 建立一個隱藏表單
        var form = document.createElement("form");
        form.action = "https://highschool.kh.edu.tw/OpenIdLogin.action";  // 修改為新的 URL
        form.method = "post";

        // 建立隱藏輸入框
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "school";
        input.value = "124311D";

        // 將輸入框加到表單中，並提交表單
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await apiService.getWeatherInfo();
                setWeatherData(data);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        fetchWeatherData();
    }, []);


    return (
        <section className='home'>
            <div className='home-page-top-box'>
                <h1 className="sitetitle" id='home-site-title'>{!user ? '歡迎使用' : `Hey, ${userName}`}</h1>
                {!user &&
                    <Link to='/login' className='home-loginbtn'>
                        立刻登入，啟用個人化服務
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" className='home-arrow-to-right'>
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                }
                {!navigator.onLine &&
                    <div className='no-internet-box'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" className='errorsvg'>
                            <path
                                d="M15.3119 10C16.6802 10.4263 17.9624 11.1191 19.08 12.05M22.5799 8.49997C19.6575 5.92394 15.8956 4.50262 11.9999 4.50262C11.3949 4.50262 10.7931 4.5369 10.1972 4.60447M8.52979 15.61C9.54499 14.8888 10.7595 14.5013 12.0048 14.5013C13.2501 14.5013 14.4646 14.8888 15.4798 15.61M12 19.5H12.01M1.19336 8.70076C2.52697 7.47869 4.06839 6.47975 5.75851 5.76306M4.73193 12.243C6.12934 11.012 7.84172 10.1302 9.73265 9.73393M15.6983 15.7751C14.6792 14.9763 13.3952 14.5 11.9999 14.5C10.5835 14.5 9.28172 14.9908 8.25537 15.8116M3 3L21 21"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div>
                            <p className='no-internet-title'>目前無網際網路連線</p>
                            <p className='no-internet-subtitle'>失去網路，部分功能將無法使用</p>
                        </div>
                    </div>
                }
            </div>
            <div className='school-weather-box'>
                {weatherData &&
                    <>
                        <div>
                            <div className='location-box'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                                     viewBox="0 0 64 64">
                                    <path
                                        d="M 32 7 C 30.896 7 30 7.896 30 9 L 30 10.09375 C 19.446442 11.045143 11.045143 19.446442 10.09375 30 L 9 30 C 7.896 30 7 30.896 7 32 C 7 33.104 7.896 34 9 34 L 10.09375 34 C 11.045143 44.553558 19.446442 52.954857 30 53.90625 L 30 55 C 30 56.104 30.896 57 32 57 C 33.104 57 34 56.104 34 55 L 34 53.90625 C 44.553558 52.954857 52.954857 44.553558 53.90625 34 L 55 34 C 56.104 34 57 33.104 57 32 C 57 30.896 56.104 30 55 30 L 53.90625 30 C 52.954857 19.446442 44.553558 11.045143 34 10.09375 L 34 9 C 34 7.896 33.104 7 32 7 z M 30 14.117188 L 30 14.5 C 30 15.604 30.896 16.5 32 16.5 C 33.104 16.5 34 15.604 34 14.5 L 34 14.117188 C 42.340957 15.040541 48.959459 21.659043 49.882812 30 L 49.5 30 C 48.396 30 47.5 30.896 47.5 32 C 47.5 33.104 48.396 34 49.5 34 L 49.882812 34 C 48.959459 42.340957 42.340957 48.959459 34 49.882812 L 34 49.5 C 34 48.396 33.104 47.5 32 47.5 C 30.896 47.5 30 48.396 30 49.5 L 30 49.882812 C 21.659043 48.959459 15.040541 42.340957 14.117188 34 L 14.5 34 C 15.604 34 16.5 33.104 16.5 32 C 16.5 30.896 15.604 30 14.5 30 L 14.117188 30 C 15.040541 21.659043 21.659043 15.040541 30 14.117188 z M 32 25 C 28.141 25 25 28.14 25 32 C 25 35.86 28.141 39 32 39 C 35.859 39 39 35.86 39 32 C 39 28.14 35.859 25 32 25 z"></path>
                                </svg>
                                <p className='location-text'>高雄市林園區</p>
                            </div>
                            <h1 className='temp_text'>{weatherData.AirTemperature}°C</h1>
                            <p className='weather-deText'>{weatherData.Weather}</p>
                        </div>
                    </>
                }
            </div>
            <div className='home-functionBox'>
                <h3 className='functionBox-title'>常用功能</h3>
                <ul className='function-list'>
                    <li aria-label='to-score-system' className='function-item'>
                        <button className='function-item-link' onClick={openIdLogin}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" color='#2ab1ad'>
                                <path
                                    d="M20 20V13M12 20V10M4 20L4 16M13.4067 5.0275L18.5751 6.96567M10.7988 5.40092L5.20023 9.59983M21.0607 6.43934C21.6464 7.02513 21.6464 7.97487 21.0607 8.56066C20.4749 9.14645 19.5251 9.14645 18.9393 8.56066C18.3536 7.97487 18.3536 7.02513 18.9393 6.43934C19.5251 5.85355 20.4749 5.85355 21.0607 6.43934ZM5.06066 9.43934C5.64645 10.0251 5.64645 10.9749 5.06066 11.5607C4.47487 12.1464 3.52513 12.1464 2.93934 11.5607C2.35355 10.9749 2.35355 10.0251 2.93934 9.43934C3.52513 8.85355 4.47487 8.85355 5.06066 9.43934ZM13.0607 3.43934C13.6464 4.02513 13.6464 4.97487 13.0607 5.56066C12.4749 6.14645 11.5251 6.14645 10.9393 5.56066C10.3536 4.97487 10.3536 4.02513 10.9393 3.43934C11.5251 2.85355 12.4749 2.85355 13.0607 3.43934Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            成績系統
                        </button>
                    </li>
                    <li aria-label='to-ailead-system' className='function-item'>
                        <a className='function-item-link' href={'https://lykh.ailead365.com/auth/login'}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" color='#2ab1ad'>
                                <path
                                    d="M12 20H5.2C4.07989 20 3.51984 20 3.09202 19.782C2.71569 19.5903 2.40973 19.2843 2.21799 18.908C2 18.4802 2 17.9201 2 16.8V7.2C2 6.07989 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.71569 4.40973 3.09202 4.21799C3.51984 4 4.07989 4 5.2 4H5.6C7.84021 4 8.96031 4 9.81596 4.43597C10.5686 4.81947 11.1805 5.43139 11.564 6.18404C12 7.03968 12 8.15979 12 10.4M12 20V10.4M12 20H18.8C19.9201 20 20.4802 20 20.908 19.782C21.2843 19.5903 21.5903 19.2843 21.782 18.908C22 18.4802 22 17.9201 22 16.8V7.2C22 6.07989 22 5.51984 21.782 5.09202C21.5903 4.71569 21.2843 4.40973 20.908 4.21799C20.4802 4 19.9201 4 18.8 4H18.4C16.1598 4 15.0397 4 14.184 4.43597C13.4314 4.81947 12.8195 5.43139 12.436 6.18404C12 7.03968 12 8.15979 12 10.4"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            AILEAD
                        </a>
                    </li>
                    <li aria-label='to-ailead-system' className='function-item'>
                        <Link className='function-item-link' to='/pdfViewer'>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" color='#2ab1ad'>
                                <path
                                    d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            行事曆
                        </Link>
                    </li>
                    <li aria-label='to-ailead-system' className='function-item'>
                        <Link className='function-item-link'>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" color='#2ab1ad'>
                                <path
                                    d="M22.7 11.5L20.7005 13.5L18.7 11.5M20.9451 13C20.9814 12.6717 21 12.338 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.8273 21 17.35 19.6963 19 17.6573M12 7V12L15 14"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            段考考程
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='system-inf-box'>
                <h3 className='system-name'>LYHS+</h3>
                <p className='ver-text'>{version.number}</p>
            </div>
        </section>
    );
};

export default Index;
