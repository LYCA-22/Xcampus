import {useEffect, useState} from "react";
import { apiService } from "../services/api.js";
import '../css/page.css'

function Announcement() {

    useEffect(() => {
        (async () => {
            await apiService.getNews();
        })();
    }, []);

    const [loading, setLoading] = useState(true);

    return (
        <section>
            <h1 className="sitetitle">校園公告</h1>
            <div id='announcement-content' className='acontent'>
                {loading && navigator.onLine && <div className='loader'></div>}
                {!navigator.onLine && <div className='offline'>網路連線異常，無法取得公告資料</div>}
            </div>
        </section>
);
}

export default Announcement;