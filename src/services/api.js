const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'https://api.lyhsca.org';

export const apiService = {
    // 使用者登入
    async userLogin(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/userLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const sessionId = result.sessionId;
                document.cookie = `sessionId=${sessionId}; path=/; domain=lyhsca.org; Secure; SameSite=Strict; max-age=172800`;
            } else {
                const result = await response.json();
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error in userLogin:', error);
            throw error;
        }
    },
    async getUserData(sessionId){
        try {
            const response = await fetch(`${API_BASE_URL}/veritySession?sessionId=${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                const result = await response.json();
                throw new Error(result.error);
            }
        } catch (e) {
            console.error('Error in getUserData:', e);
            throw e;
        }
    },
    async getNews() {
        try {
            // 從 Worker 端點獲取數據
            const response = await fetch(`${API_BASE_URL}/getAD`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.text(); // 獲取響應的文本內容（HTML）
                // 找到顯示內容的元素
                const contentElement = document.getElementById('announcement-content');
                // 將 HTML 內容插入到頁面中
                contentElement.innerHTML = data;
            } else {
                const result = await response.json();
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error in userLogin:', error);
            throw error;
        }
    },
    async getWeatherInfo() {
        try {
            const API_KEY = 'CWA-C2C5DCE1-4A66-4FE8-9918-CA244456227F';

            const response = await fetch(
                `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=${API_KEY}&format=JSON&StationName=%E6%9E%97%E5%9C%92`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const weatherElement = data?.records?.Station?.[0]?.WeatherElement;
            console.log('WeatherElement:', weatherElement);

            let weatherData = {};

            if (Array.isArray(weatherElement)) {
                weatherData = weatherElement.reduce((acc, el) => {
                    acc[el.elementName] = el.elementValue;
                    return acc;
                }, {});
            } else if (typeof weatherElement === 'object' && weatherElement !== null) {
                weatherData = weatherElement;
            }
            return weatherData

        } catch (err) {
            console.error('Error details:', err);
        }
    }
};