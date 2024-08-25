import React from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { BASE_URL, TOAST_CONFIG } from '../../Constants';

import { FaLockOpen, FaLock } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthContext';
import { loginService, getMeDetailsService } from '../../services/account';


const LoginDiv = () => {

    const navigate = useNavigate();

    // email and password validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // store email and password
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });
    
    // store errors in email and password field
    const [errors, setErrors] = React.useState({
        email: [],
        password: []
    })

    // store state of password field (is password vieweable or not)
    const [viewPass, setViewPass] = React.useState(false);

    // store authentication context details
    const { login } = React.useContext(AuthContext);

    // called to validate email and password field
    const validateData = () => {

        const currErrors = { email: [], password: [] };

        // validate email
        if (data.email.trim().length === 0) {
            currErrors.email.push("Email cannot be empty");
        }
        else if (!emailRegex.test(data.email)) {
            currErrors.email.push("Email must be in valid format");
        }

        // validate password
        if (data.password.trim().length === 0) {
            currErrors.password.push("Password cannot be empty");
        }
        else if (data.password.trim().length < 8) {
            currErrors.password.push("Password must have at least 8 characters");
        }
        else if (!passwordRegex.test(data.password)) {
            currErrors.password.push("Password must have at least 1 number and 1 special character");
        }

        // update error state
        setErrors(currErrors);

        // return true if no errors, else false
        if (currErrors.email.length > 0 || currErrors.password.length > 0)
            return false;
        return true;
    }

    // update email/password state
    const updateData = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
    }

    // called on clicking on 'Sign In'
    const onSubmitClick = () => {
        const status = validateData();
        if (!status)
            return;

        performLogin()
    }

    // perform the login process
    // including the toast updation
    const performLogin = async () => {
        const id = toast.loading("Logging user...");
        const resp = await loginService(data);
        if (!resp.status) {
            toast.update(id, {
                ...TOAST_CONFIG,
                isLoading: false,
                render: resp.json.message,
                type: "error"
            });
        }
        else {
            toast.update(id, {
                ...TOAST_CONFIG,
                isLoading: false,
                render: "Logged in successfully...",
                type: "success"
            });

            localStorage.setItem("token", JSON.stringify(resp.json));
            console.log("Google login access token:", resp.json.access);
            const userResp = await getMeDetailsService();
            if (!userResp.status) {
                alert(userResp.json.message);
            }
            else {
                login(userResp.json);
                console.log(userResp.json);
                navigate("/dashboard");
            }
        }   
    }

    // called on clicking on 'Sign in with Google'
    const onGoogleLogin = () => {
        const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
        const REDIRECT_URI = 'api/v1/login/google/';

        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            redirect_uri: `${BASE_URL}/${REDIRECT_URI}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();
        window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
    }

    return (
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[30%]">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                        Don't have an account yet?
                        <a className="ms-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="/register">
                            Sign up here
                        </a>
                    </p>
                </div>

                <div className="mt-5">
                    <form>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                <div className="relative">
                                    <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" value={data.email} onChange={(e) => updateData('email', e.target.value)} />
                                    <div className={`${errors.email.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 bottom-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.email.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="email-error">{errors.email.join(" | ")}</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                    <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <input type={viewPass ? "text" : "password"} id="password" name="password" className="py-3 px-4 block border-2 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" value={data.password} onChange={(e) => updateData('password', e.target.value)} />
                                    <button onClick={() => setViewPass(!viewPass)} type="button" className='absolute text-slate-300 hover:text-slate-400' style={{ right: "15px", top: "15px" }}>
                                        {viewPass ? <FaLockOpen /> : <FaLock />}
                                    </button>
                                    <div className={`${errors.password.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.password.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="password-error">{errors.password.join(" | ")}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                </div>
                                <div className="ms-3">
                                    <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                                </div>
                            </div>

                            <button onClick={onSubmitClick} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                        </div>
                    </form>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>


                    <button onClick={onGoogleLogin} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                        <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginDiv