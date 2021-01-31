import React from 'react';

function AuthInfo({ email, signOut }) {
  return (
    <div className='header__user-info'>
      <span>{email}</span>
      <a href='/sign-in' className='header__authLink' onClick={signOut}>Выйти</a>
    </div>
  );
}

export default AuthInfo;