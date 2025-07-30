import React, { useReducer} from 'react';

const initialUserState = {name:"", email:"", password:""};
const initialErrorState = { nameError: '', emailError: '', passwordError: '' };

function userDetailsReducer(userDetails : any, action: any){
  switch(action.type){
      case 'updateField':
          return {...userDetails, [action.key] : action.value};
      case 'reset':
          return {...userDetails, name: '', email: '', password: ''};
      default:
          throw new Error();
  }
}

function errorDetailsReducer(errorDetails : any, action: any){
  switch(action.type){

    case 'nameError':
      return {
        ...errorDetails,
        nameError: "Name must be at least 3 characters",
      };

    case 'emailError':
      return {
        ...errorDetails,
        emailError: 'Email is invalid',
      };

    case 'passwordError':
      return {
        ...errorDetails,
        passwordError: 'Password must be at least 6 characters',
      };

    case 'clearError':
      return {
        ...errorDetails, [`${action.key}Error`] : '',
      };
  }
}

export default function Form() {

    const [userDetails, dispatchUser] = useReducer(userDetailsReducer, initialUserState);
    const [errorDetails, dispatchError] = useReducer(errorDetailsReducer, initialErrorState);

    const isFormValid =
      userDetails.name &&
      userDetails.email &&
      userDetails.password &&
      !errorDetails.nameError &&
      !errorDetails.emailError &&
      !errorDetails.passwordError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: String) =>{
        dispatchUser({
            type : "updateField",
            key : key,
            value : e.target.value
        });

        const {value} = e.target;

        if (key === 'name'){
            if (value.length < 3){
                dispatchError({
                    type : 'nameError'
                })
            }
            else{
              dispatchError({
                type : 'clearError',
                key : 'name'
              })
            }
        }

        if (key === 'email'){
          if(!/\S+@\S+\.\S+/.test(value)){
            dispatchError({
              type : 'emailError'
            })
          }
          else{
            dispatchError({
              type : 'clearError',
              key : 'email'
            })
          }
        }

        if (key === 'password'){
          if (value.length < 6){
            dispatchError({
              type : 'passwordError'
            })
          }
          else{
            dispatchError({
              type : 'clearError',
              key : 'password'
            })
          }
        }
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submitted successfully!');

    dispatchUser({
      type : 'reset'
    })
  };

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
            onChange={(e) => handleChange(e, 'name')}
          />
          {errorDetails.nameError && (
            <p className="text-red-500 text-sm mt-1">
              {errorDetails.nameError}
            </p>
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
            <p className="text-red-500 text-sm mt-1">
              {errorDetails.emailError}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 border rounded-lg"
            value={userDetails.password}
            onChange={(e) => handleChange(e, 'password')}
          />
          {errorDetails.passwordError && (
            <p className="text-red-500 text-sm mt-1">
              {errorDetails.passwordError}
            </p>
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
