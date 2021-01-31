import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {

    function submitForm(password, email) {
        onLogin(password, email);
      }
      
    return (
        <AuthForm
            title='Вход'
            submitButtonText='Войти'
            path='/sign-up'
            onSubmit={submitForm}
        />
    );
}

export default Login;