import React, { createContext, useContext, useState, useEffect } from 'react';

// 創建 AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userClass, setUserClass] = useState('');
    const [adminAccess, setAdminAccess] = useState(false);
    const [userGrade, setUserGrade] = useState('');
    const [userID, setUserID] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [loading, setLoading] = useState(true)
    const IsBeta = import.meta.env.VITE_IS_MODE === 'true';

    useEffect(() => {
        const token = getCookie("token"); // 獲取 cookie 中的 token
        if (token) {
            fetchUserData(token);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    }, []);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    async function fetchUserData(token) {
        const response = await fetch(`https://lycaapis.zhicheng-gong.workers.dev/checkToken?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            setUser(true);
            setUserName(data.name);
            setUserEmail(data.email);
            setUserClass(data.user_class);
            if (data.admin_access === 1){
                setAdminAccess(true);
            } else {
                setAdminAccess(false);
            };
            setUserGrade(data.user_grade);
            setUserID(data.id);
            setUserRole(data.user_role);
            setUserLevel(data.user_level);
        } else {
            document.cookie = `token=; path=/; domain=lyhsca.org`;
            setUser(false);
            setUserName('');
            setUserEmail('');
            setUserClass('');
            setAdminAccess(false);
            setUserGrade('');
            setUserID('');
            setUserRole('');
            window.location.href = 'http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org';
        }
    }

    const logoutUser = () => {
        // 清除 token
        document.cookie = `token=; path=/; domain=lyhsca.org`;
        setUser(false);
        setUserName('');
        setUserEmail('');
        setUserClass('');
        setAdminAccess(false);
        setUserGrade('');
        setUserID('');
        setUserRole('');
    };

    return (
        <AuthContext.Provider value={{ user, userName, userEmail, userClass, adminAccess, userGrade, userID, loading, userRole, logoutUser, userLevel, IsBeta }}>
            {children}
        </AuthContext.Provider>
    );
};

// 創建一個自定義 Hook 來使用 AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};