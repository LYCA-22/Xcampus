import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import './css/ov.css'
import { app } from "./firebase";


function OnVote() {
    const Changetitle = () => {
        document.title = '線上投票系統';
    }

    const changeinput = (type) => {
        const input = document.getElementById(type)
        const line = document.getElementById(type + 'line')
        const lable = document.getElementById(type + 'text')

        input.addEventListener('focus', () => {
            line.classList.remove('normal')
            line.classList.add('active')
            lable.classList.remove('normal')
            lable.classList.add('active')
        })
        input.addEventListener('blur', () => {
            if (!input.value) {
                line.classList.remove('active')
                line.classList.add('normal')
                lable.classList.remove('active')
                lable.classList.add('normal')
            }
        })
    }

    useEffect(() => {
        changeinput('name')
    })

    return (
        <section>
            <Changetitle />
            <main className="ov">
                <div className="firstbox">
                    <img src="public/lycalogo.svg" />
                    <h1 className="sitetitle">線上投票系統 v1.0</h1>
                </div>
                <div className="votebox">
                    <form>
                        <h1>10/01</h1>
                        <div className="inputbox">
                        <label className="label normal" id="nametext">姓名</label>
                        <input type="text" required id="name" />
                        <span className="line" id="nameline"></span>
                    </div>
                    </form>
                </div>
            </main>
        </section>
    );
};
export default OnVote;