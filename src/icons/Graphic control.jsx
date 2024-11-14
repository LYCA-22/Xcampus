import React from 'react'
import { Link, useLocation } from 'react-router-dom';

    export function HomeIcon() {
        const location = useLocation();
        const currentPath = location.pathname;
        const renderIcon = () => {
            if (currentPath === '/'){
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                         fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-home">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z"/>
                    </svg>
                )
            } else {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-home">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                    </svg>
                )
            }
        }
        return (
            <>
                {renderIcon()}
            </>
        );
    };

export function NewsIcon() {
    const location = useLocation();
    const currentPath = location.pathname;
    const renderIcon = () => {
        if (currentPath === '/announcement') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#2b2b2b"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h407q16 0 30.5 6t25.5 17l154 154q11 11 17 25.5t6 30.5v407q0 33-23.5 56.5T760-120H200Zm400-640v120q0 17 11.5 28.5T640-600h120L600-760Zm40 480q17 0 28.5-11.5T680-320q0-17-11.5-28.5T640-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280h320ZM440-600q17 0 28.5-11.5T480-640q0-17-11.5-28.5T440-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600h120Zm200 160q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h320Z"/></svg>
                )
            } else {
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#7c7c7cbe"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h407q16 0 30.5 6t25.5 17l154 154q11 11 17 25.5t6 30.5v407q0 33-23.5 56.5T760-120H200Zm0-80h560v-400H640q-17 0-28.5-11.5T600-640v-120H200v560Zm440-80q17 0 28.5-11.5T680-320q0-17-11.5-28.5T640-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280h320ZM440-600q17 0 28.5-11.5T480-640q0-17-11.5-28.5T440-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600h120Zm200 160q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h320ZM200-760v160-160 560-560Z"/></svg>
            
                )
                }
        }
        return (
            <>
                {renderIcon()}
            </>
        );
    };

    export function ProposalIcon() {
        const location = useLocation();
        const currentPath = location.pathname;
        const renderIcon = () => {
            if (currentPath === '/proposal'){
            return(
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#2b2b2b"><path d="M120-120q-17 0-28.5-11.5T80-160v-400q0-17 11.5-28.5T120-600h140q17 0 28.5 11.5T300-560v400q0 17-11.5 28.5T260-120H120Zm290 0q-17 0-28.5-11.5T370-160v-640q0-17 11.5-28.5T410-840h140q17 0 28.5 11.5T590-800v640q0 17-11.5 28.5T550-120H410Zm290 0q-17 0-28.5-11.5T660-160v-320q0-17 11.5-28.5T700-520h140q17 0 28.5 11.5T880-480v320q0 17-11.5 28.5T840-120H700Z"/></svg>
            )
            } else {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#7c7c7cbe"><path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240Zm-560 0v-320q0-33 23.5-56.5T160-600h160v-160q0-33 23.5-56.5T400-840h160q33 0 56.5 23.5T640-760v240h160q33 0 56.5 23.5T880-440v240q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200Z"/></svg>
                )
            }
        }
        return (
            <>
                {renderIcon()}
            </>
        );
    };

    export function McIcon() {
        const location = useLocation();
        const currentPath = location.pathname;
        const renderIcon = () => {
            if (currentPath.startsWith('/account')){
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#2b2b2b"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"/></svg>
                )
            } else {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#7c7c7cbe"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                )
            }
        }
        return (
            <>
                {renderIcon()}
            </>
        );
    };