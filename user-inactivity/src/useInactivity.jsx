import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';

export default function useInactivity(timeout = 5000) {

    const timeRef = useRef(null);

    function resetTimer(){
        clearTimeout(timeRef.current);

        timeRef.current = setTimeout(()=>{
            window.alert('Session expired');
        },timeout)
    }

    useEffect(()=>{
        const events = ['mousemove', 'movedown', 'click', 'keydown', 'touchstart'];

        const handleReset = () =>{
            resetTimer();
        }

        events.forEach((event => window.addEventListener(event,handleReset)));

        resetTimer();   

        return ()=>{
            clearTimeout(timeRef.current);
            events.forEach((event => window.removeEventListener(event,handleReset)));
        }
    },[]);

}
