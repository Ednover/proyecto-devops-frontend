import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputForm, SubmitForm } from "../../components";
import axios from "axios";
import { useAuthUser } from "../../hooks";

const content = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "" };

const Login = () => {

  const { setAuthUser } = useAuthUser();
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

    axios.post('http://localhost:3000/api/auth', formState)
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        const accessToken = res.data.accessToken;
        const context = {
          "user": user,
          "accessToken": accessToken,
        }
        if(res.status == 200){
          window.sessionStorage.setItem("Context",JSON.stringify(context))
          setAuthUser({ user, accessToken });
          setFormState({ ...initial });
          setDisplayError(false);
          navigate("/");
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
            <InputForm label='Email' type='email' value={formState.email} onChange={handleChange} />
            <InputForm label='Password' type='password' value={formState.password} onChange={handleChange} />

            {displayError && (
              <div className="flex items-center justify-center">
                <div className="text-sm text-red-500">
                  Invalid email or password!
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

export default Login;