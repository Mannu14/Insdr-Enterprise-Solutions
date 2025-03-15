"use client"

import React from 'react';
const GoogleLoginUse = () => {
    const apiUrlProcess = `http://localhost:4000`;
    const loginWithGoogle =()=>{
        window.open(`${apiUrlProcess}/auth/google/callback`,"_self")
    }
    return (<>
        <div onClick={loginWithGoogle}>Sign in with Google</div>
    </>)
}
export default GoogleLoginUse