import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputForm, SubmitForm } from "../../components";
import axios from "axios";

const content = {
    linkUrl: "/login",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
  };

const initial = { email: "", password: "", name: "" };

const Register = () => {

  const [displayError, setDisplayError] = useState(false);
  const [formState, setFormState] = useState({ ...initial });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);

    axios.post('http://localhost:3000/api/register', formState)
      .then((res) => {
        console.log(res)
        if(res.status == 200){
          setFormState({ ...initial });
          setDisplayError(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error)
        setDisplayError(true);
      })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {content.header}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {content.subheader}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputForm label='Name' type='text' value={formState.name} onChange={handleChange} />
            <InputForm label='Email' type='email' value={formState.email} onChange={handleChange} />
            <InputForm label='Password' type='password' value={formState.password} onChange={handleChange} />

            {displayError && (
              <div className="flex items-center justify-center">
                <div className="text-sm text-red-500">
                    That email already exists!
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={content.linkUrl}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {content.linkText}
                </Link>
              </div>
            </div>

            <SubmitForm text={content.buttonText} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;