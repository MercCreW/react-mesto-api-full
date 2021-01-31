import React, { useState } from 'react';
import Form from './Form';

function AuthForm({title, submitButtonText, path,
    loginText, loginLink, onSubmit}) {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        function handleChange(evt) {
          const { value } = evt.target;
          evt.target.name === 'email'
            ? setEmail(value)
            : setPassword(value);

        }
      
        function handleSubmit(evt) {
            evt.preventDefault();
            if (!email && !password) return;
            onSubmit(password, email);
            setEmail('');
            setPassword('');
        }

    return (
        <section className="auth__form">
            <Form className='sdfasd'
                id='authForm'
                formName='signin'
                title={title}
                submitButtonText={submitButtonText}
                path={path}
                isModalUp={false}
                loginText={loginText}
                loginLink={loginLink}
                onSubmit={handleSubmit}
            >
            <input className='auth__form-input'
                name='email'
                type="email" 
                placeholder="Email"
                minLength='6'
                maxLength='40'
                required
                onChange={handleChange}
            
            
            />
            <input className='auth__form-input'
                name='password'
                type="password" 
                placeholder="Пароль"
                minLength='8'
                maxLength='30'
                required
                onChange={handleChange}
            />

            </Form>

        </section>
    )
}

export default AuthForm;