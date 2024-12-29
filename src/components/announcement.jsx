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
                {loading && <div className='loader'></div>}
            </div>
        </section>
    );
}

export default Announcement;