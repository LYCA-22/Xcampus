import React, {useEffect, useState} from "react";
import './css/page.css'
import { app, analytics, storage, ref, uploadBytesResumable, collection, addDoc, getDoc, getDocs, store, doc, setDoc, serverTimestamp } from './firebase'
import loadingGIF from './assets/loadingGIF.gif'
import { useLocation, Navigate } from 'react-router-dom';



function Proposal() {
    const [filter, setFilter] = useState('')
    const [activebtn, setActivebtn] = useState('')
    const ProposalProgress = () => {
        const [proposals, setProposals] = useState([]); 
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState(null); 

        
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
        }, []);
    
        const location = useLocation();
        const currentPath = window.location.pathname;
        useEffect(() => {
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
    
        })
      
        // 加載狀態
        if (loading) {
            return (        
                <div className="loadingbox hidden" id="loadingbox">
                    <div className="mainbox fade" id="mainbox">
                        <h3>載入資料中</h3>
                        <img src={loadingGIF} className="gif" id="loadingGIF"></img>
                    </div>
                </div>
            );
        }
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
                <li className="proposalli">
                    <div className="data-text">
                        <div className="datatitlebox">無資料</div>
                    </div>
                </li>
            </ul>
        );
        }
    };

    
    const BtnClass = (type) => {
        return filter === type ? 'filterbtn active' : 'filterbtn'
    };


    return (
        <section>
            <div className="filteroutbox">
                <div className="filtertoolbox">
                    <div>
                        <h1 className="ftb_title">提案進度查詢</h1>
                        <button className={BtnClass('')} onClick={() => {setFilter('')}}>全部</button>
                        <button className={BtnClass('學權')} onClick={() => {setFilter('學權')}}>學權</button>
                        <button className={BtnClass('活動')} onClick={() => {setFilter('活動')}}>活動</button>
                        <button className={BtnClass('其他')} onClick={() => {setFilter('其他')}}>其他</button>
                        <button className={BtnClass('已完成')} onClick={() => {setFilter('已完成')}}>已完成</button>
                    </div>
                </div>
            </div>
            <div className="ppbox">
                <ProposalProgress />
            </div>
        </section>
    );
};

export default Proposal;