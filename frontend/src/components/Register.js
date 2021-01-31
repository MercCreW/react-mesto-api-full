import React from 'react';
import AuthForm from './AuthForm';

function Register({ onRegister }){
    function submitForm(password, email) {
        onRegister(password, email);
      }
    

    return(
        <AuthForm
            title='Регистрация'
            submitButtonText='Зарегистрироваться'
            path='/sign-in'
            loginText='Уже зарегистрированы? '
            loginLink='Войти'
            onSubmit={submitForm}
        />
    )
}

export default Register;