import React from 'react';
import { Link } from 'react-router-dom';

function Form
({
    formName,
    formId,
    onSubmit,
    title,
    children,
    isLoading,
    submitButtonText,
    isModalUp,
    path,
    loginText,
    loginLink,
    noConfirm,
    disabled,
    onClose
})
    {
        return(
            <form 
            name={formName} 
            id={formId}
            onSubmit={onSubmit}
            className={`${'auth__form'}`}>
                
                <h2 className={`${!isModalUp && 'auth__form-title'}`}>{title}</h2>
                {children}

                {!noConfirm
          && (<button type="submit" className={`${!isModalUp && 'auth__form-button'}`}
                        disabled={disabled}>
                        {isLoading ? `Сохранение...` : submitButtonText}
                </button>)}

                {isModalUp && (<button className="modal__close-button" onClick={onClose}/>)}

                {!isModalUp && (<span>{loginText}<Link to={path} className="auth__form-link">{loginLink}</Link></span>)}

            </form>
        )

}

export default Form;