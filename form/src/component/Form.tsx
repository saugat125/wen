import React, { useState } from 'react'

export default function Form() {

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errorDetails, setErrorDetails] = useState({
    nameError: "",
    emailError: "",
    passwordError: ""
  });

    const isFormValid =
      userDetails.name && userDetails.email && userDetails.password &&
      !errorDetails.nameError && !errorDetails.emailError && !errorDetails.passwordError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      const { value } = e.target;
      setUserDetails({...userDetails, [key]: value });
      
      if(key === 'name'){
        if (value.length < 3) {
          setErrorDetails({
            ...errorDetails,
            nameError: 'Name must be at least 3 characters',
          });
        } else {
          setErrorDetails({ ...errorDetails, nameError: '' });
        }
      }
      
      if(key === 'email'){
        if (!/\S+@\S+\.\S+/.test(value)) {
          setErrorDetails({ ...errorDetails, emailError: 'Email is invalid' });
        } else {
          setErrorDetails({ ...errorDetails, emailError: '' });
        }
      }
      
      if(key === 'password'){
        if (value.length < 6) {
          setErrorDetails({
            ...errorDetails,
            passwordError: 'Password must be at least 6 characters',
          });
        } else {
          setErrorDetails({ ...errorDetails, passwordError: '' });
        }
      }  
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        setUserDetails({name:"", email:"", password:""});
        setErrorDetails({nameError:"", emailError:"", passwordError:""})
    }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Form</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="p-2 border rounded-lg"
            value={userDetails.name}
            onChange={(e)=>handleChange(e, 'name')}
          /> 
          {errorDetails.nameError && (
            <p className="text-red-500 text-sm mt-1">{errorDetails.nameError}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-2 border rounded-lg"
            value={userDetails.email}
            onChange={(e) => handleChange(e, 'email')}
          />
          {errorDetails.emailError && (
            <p className="text-red-500 text-sm mt-1">{errorDetails.emailError}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 border rounded-lg"
            value={userDetails.password}
            onChange={(e)=>handleChange(e, 'password')}
          />
          {errorDetails.passwordError && (
            <p className="text-red-500 text-sm mt-1">{errorDetails.passwordError}</p>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white ${
              isFormValid ? 'bg-blue-800 cursor-pointer' : 'bg-gray-400'
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
