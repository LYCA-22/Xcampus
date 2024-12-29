import React, {useEffect, useState} from "react";
import '../css/page.css'
import { collection, getDocs, store } from './firebase'
import { useLocation } from 'react-router-dom';

function Proposal() {
    const [filter, setFilter] = useState('')
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const currentPath = window.location.pathname;

    const Loadingbox = () => {
        return (
            <div className="loadingbox hidden" id="loadingbox">
                <div className="mainbox fade" id="mainbox">
                    <div className='loader'></div>
                    <h1>載入中</h1>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const querySnapshot = await getDocs(collection(store, 'schedule'));
                const proposalsData = [];
                querySnapshot.forEach((doc) => {
                    proposalsData.push({
                        id: doc.id, ...doc.data()
                    });
                });

                setProposals(proposalsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        };
        fetchProposals();

        const loadingbox = document.getElementById('loadingbox');
        const mainbox = document.getElementById('mainbox');

        if (loading === true && currentPath === '/proposal'){
            loadingbox.classList.remove('hidden')
            loadingbox.classList.add('fadeIn')
            setTimeout(() => {
                loadingbox.classList.remove('fadeIn')
                loadingbox.classList.add('show')
                mainbox.classList.remove('fade')
                mainbox.classList.add('show')
            },50)
        }
    }, []);

    const ProposalProgress = React.memo(() => {
        if (error) {
          console.log(error)
        }

        const changeboxstate = (id) => {
            const btn = document.getElementById(id + 'btn')
            const detailsbox = document.getElementById(id + '-ps-modelbox')
            const ps_contain = document.getElementById(id + '-ps-contain')
            if (detailsbox.classList.contains('show')){
                detailsbox.classList.remove('fadeIn')
                setTimeout(() => {
                    detailsbox.classList.remove('show')
                    detailsbox.classList.add('hidden')
                }, 200)
                ps_contain.classList.remove('show')
                ps_contain.classList.add('normal')
                
            } else {
                detailsbox.classList.add('show')
                setTimeout(() => {
                    detailsbox.classList.add('fadeIn')
                }, 100)
                detailsbox.classList.remove('hidden')
                setTimeout(() => {
                    ps_contain.classList.remove('normal')
                    ps_contain.classList.add('show')
                }, 100)
            }
        }

        const filteredProposals = filter ? proposals.filter(proposal => proposal.type === filter) : proposals;
        if (filteredProposals.length >= 1) {
            return (
            <>
                <ul className="dataul">
                    {filteredProposals.map((filteredProposals) => (
                        <li key={filteredProposals.id} className="pp-libox" id={filteredProposals.id} aria-label="政見進度">
                            <div className="numbox">{filteredProposals.序號}</div>
                            <div className="datatitlebox">{filteredProposals.名稱}</div>
                            <div className="progressbox">
                                <span className="progressbar-bottom"></span>
                                <span className="progressbar-top" style={{width:`${filteredProposals.進度}%`}}></span>
                                <div className="progressnum" id="progressnum">{filteredProposals.進度}%</div>
                            </div>
                            <button className="box-control-btn open-svg" onClick={() => changeboxstate(filteredProposals.id)}  id={filteredProposals.id + 'btn'}>
                                <p>瞭解更多</p>
                                <svg fill='#656565' height="20px" version="1.1" viewBox="0 0 512 512" width="20px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z"/></svg>
                            </button>
                        </li>
                    ))}
                </ul>
                {filteredProposals.map((filteredProposals) => (
                    <div key={filteredProposals.id + 'detailbox'} id={filteredProposals.id + '-ps-modelbox'} className="detail-box hidden" aria-label="關於此政見詳細說明" tabIndex="-1" role="dialog" aria-modal="true">
                        <div id={filteredProposals.id + '-ps-contain'} className="-ps-contain normal">
                            <button className="box-control-btn close-svg" onClick={() => changeboxstate(filteredProposals.id)}  id={filteredProposals.id + 'btn'}>
                                <svg fill='#656565' height="25px" version="1.1" viewBox="0 0 512 512" width="25px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z"/></svg>
                            </button>
                            <div className="stateline">{filteredProposals.目前狀態 || '無資料'}</div>
                            <div className="textbox" id={filteredProposals.id + '-ps-textbox'}>
                                <table className="table-detail" id={filteredProposals.id + '-ps-table'}>
                                    <tbody>
                                        <tr>
                                            <th>提案緣由</th>
                                            <td>{filteredProposals.提案緣由 || '無資料'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="ps-itbox">
                                    <p className="ps-itbox-title">更新時間</p>
                                    <p className="ps-itbox-text" id={filteredProposals.id + 'updatetime'}>
                                    {filteredProposals.updateTime
                                    ? new Intl.DateTimeFormat('zh-TW', {
                                        year: 'numeric',
                                        month: 'long', // 完整的月份名稱
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: false // 使用 24 小時制
                                    }).format(filteredProposals.updateTime.toDate())
                                    : '無資料'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            
          );
        } else {
          return (
            <ul className="dataul">
                <div className="error-message">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 10.5V7M12 14H12.01M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="datatitlebox">無資料</div>
                </div>
            </ul>
          );
        }
    });

    const [menu, setMenu] = useState(false);
    const [selected, setSelected] = useState('');
    const setType = (type) => {
        setFilter(type)
        setSelected(type)
        setMenu(false)
    }


    return (
        <section>
            <Loadingbox/>
            <div>
                <h1 className="sitetitle" id='p_title'>提案進度查詢</h1>
            </div>
            <div className='p_content'>
                <div className="filteroutbox">
                    <div className={ menu ? 'search_type_box menu-is-open' : 'search_type_box'}>
                        <div className='fun-box' onClick={() => {setMenu(!menu)}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className='p_inputbox'>
                                <p className='se_label'>選擇類別</p>
                                <div className='p_select' id='choose_type'>{selected ? selected : '依據政見類別查詢'}</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className={ menu ? 'se_arrow menu-is-open' : 'se_arrow'}>
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </div>
                        {menu &&
                            <div className='se_menu'>
                                <ul className="options_ul">
                                    <li key='' onClick={() => setType('')} className='option'>
                                        全部
                                        {selected === '' &&
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" className='done_icon'>
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }
                                    </li>
                                    <li key='學權' onClick={() => setType('學權')} className='option'>
                                        學權
                                        {selected === '學權' &&
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" className='done_icon'>
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }
                                    </li>
                                    <li key='活動' onClick={() => setType('活動')} className='option'>
                                        活動
                                        {selected === '活動' &&
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" className='done_icon'>
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }
                                    </li>
                                    <li key='已完成' onClick={() => setType('已完成')} className='option'>
                                        已完成
                                        {selected === '已完成' &&
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" className='done_icon'>
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }
                                    </li>
                                </ul>
                            </div>
                        }

                    </div>

                </div>
                <div className="ppbox">
                    <ProposalProgress/>
                </div>
            </div>
        </section>
    );
};

export default Proposal;