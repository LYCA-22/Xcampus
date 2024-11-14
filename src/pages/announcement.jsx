import React, {useEffect, useState} from "react";
import './css/page.css'

function Announcement() {
    async function fetchAnnouncement() {
        try {
            // 從 Worker 端點獲取數據
            const response = await fetch('https://lycaapis.zhicheng-gong.workers.dev/getAD', {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.text(); // 獲取響應的文本內容（HTML）

                // 找到顯示內容的元素
                const contentElement = document.getElementById('announcement-content');

                // 將 HTML 內容插入到頁面中
                contentElement.innerHTML = data;
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchAnnouncement();
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