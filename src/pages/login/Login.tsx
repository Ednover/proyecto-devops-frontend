import { useState } from "react";
import { Link } from "react-router-dom";
import { InputForm, SubmitForm } from "../../components";

const content = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "" };

const Login = () => {

  const [displayError, setDisplayError] = useState(false);
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");

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

    try {
      setDisplayError(false);
    } catch (e) {
      setError(`Could not`);
    } finally {
      setFormState({ ...initial });
      setDisplayError(true);
    }
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