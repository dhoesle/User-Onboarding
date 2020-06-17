import React from 'react'
import './App.css';


export default function Form(props) {
    const {
        values,
        onSubmit,
        onInputChange,
        onCheckboxChange,
        disabled,
        errors
    } = props

    return (
        <form className='form-container' onSubmit={onSubmit}>

            <div className='form-group-inputs'>
                <h3>User Info</h3>
                <label>Name
                    <input
                        value={values.first_name}
                        onChange={onInputChange}
                        name='first_name'
                        text='text'
                    />
                </label>
                <label>Email
                    <input
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        text='text'
                    />
                </label>
                <label>Password
                    <input
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        text='text'
                    />
                </label>
            </div>
            <div className='form-group-checkboxes'>
                <h4>Terms of Service</h4>
                <label>Agree:
                    <input
                        name='agree'
                        type='checkbox'
                        onChange={onCheckboxChange}
                        checked={values.terms.agree}
                        />
                </label>

            </div>
            <div className='form-group-submit'>
                <button disabled={disabled}>submit user</button>
                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.agree}</div>
                </div>
            </div>

        </form>
    )
}