"use client"
import RegistrationForm from '../Register/page';
import Login from '../Login/page';
// import '../styles/CommonLoginSignUp.css';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function CommonLoginSignUp() {
  const searchParams = useSearchParams();
  const isSignInL = searchParams.get('startwith') === 'signIn';
  const isSignUpL = searchParams.get('startwith') === 'signUp';
  useEffect(() => {
    document.body.style.backgroundColor = "#080710";
    
    return () => {
      document.body.style.backgroundColor = ""; // ✅ Cleanup on unmount
    };
  }, []);

  return (
    <div className="Common-container">
      <div className="button-group">
        <Link
          href="?startwith=signIn"
          className={`toggle-button ${isSignInL ? 'active' : ''}`}
        >
          Sign In
        </Link>
        <Link
          href="?startwith=signUp"
          className={`toggle-button ${isSignUpL ? 'active' : ''}`}
        >
          Sign Up
        </Link>
      </div>
      <div className="form-container">
        {isSignUpL ? <RegistrationForm /> : <Login />}
      </div>
    </div>
  );
}

export default CommonLoginSignUp;
