import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form'
import User from './User'

import formSchema from './validation/formSchema'

import axios from 'axios'
import * as Yup from 'yup'

const initialFormValues = {
  first_name: '',
  email: '',
  password: '',
  terms: {
    agree: false,
  }
}

const initialFormErrors = {
  first_name: '',
  email: '',
  password: '',
}

const initalUsers = []
const initalDisabled = true


function App() {

  const [users, setUsers] = useState(initalUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initalDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data)
        console.log("getUsers -> response.data", response.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data])
        console.log("App -> users", users)
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
      
  }
  const onInputChange = evt => {
    const { name, value } = evt.target

    Yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
    
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]: checked,
      }
    })
  }

  const onSubmit = evt => {
    
    evt.preventDefault()
    
    const newUser = {
      first_name: formValues.first_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      agree: formValues.terms.agree,
    }
    // 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewUser(newUser)
  }
  
  useEffect(() => {
    getUsers()
  }, [])
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Onboarding</h1>
      </header>

      <Form
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          console.log("App ->  users",  users)

          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
