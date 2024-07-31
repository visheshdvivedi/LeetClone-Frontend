import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerService } from "../../services/account";

import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../Constants';

import { FaLockOpen, FaLock } from 'react-icons/fa';

const RegisterDiv = () => {

    const navigate = useNavigate();

    // email and password validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // store email and password
    const [data, setData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // store errors in email and password field
    const [errors, setErrors] = React.useState({
        username: [],
        email: [],
        password: [],
        confirmPassword: []
    })

    // store state of password field (is password vieweable or not)
    const [viewPass, setViewPass] = React.useState(false);
    const [viewConfirmPass, setViewConfirmPass] = React.useState(false);

    // called to update data (username/email/password/confirm password)
    const updateData = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
    }

    // called to validate all fields
    const validateData = () => {
        const currErrors = {
            username: [],
            email: [],
            password: [],
            confirmPassword: []
        }

        // validate username
        if (data.username.trim().length === 0) {
            currErrors.username.push("Username cannot be empty");
        }

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

        // validate confirm password
        if (data.confirmPassword.trim().length === 0) {
            currErrors.confirmPassword.push("Confirm password cannot be empty");
        }
        else if (data.confirmPassword.trim().length < 8) {
            currErrors.confirmPassword.push("Confirm password must have at least 8 characters");
        }
        else if (data.confirmPassword != data.password) {
            currErrors.confirmPassword.push("Confirm password is not equal to password");
        }

        // update error state
        setErrors(currErrors);

        // return true if no errors, else false
        if (currErrors.username.length > 0 || currErrors.email.length > 0 || currErrors.password.length > 0 || currErrors.confirmPassword.length > 0)
            return false;
        return true;
    }

    const checkServerSideError = (data) => {
        const keyList = ['username', 'password', 'confirmPassword', 'email'];
        const currErrors = {
            username: [], email: [], password: [], confirmPassword: []
        };

        let found = false;
        for (let key of Object.keys(data)) {
            if (keyList.includes(key)) {
                currErrors[key] = data[key];
                found = true;
            }
        }
        if (!found)
            return false;

        if (currErrors != errors) {
            setErrors(currErrors);
            return true;
        }
        return false;
    }

    // perform the registration process
    // including the toast updation
    const performRegistration = async () => {
        const id = toast.loading("Logging user...");
        const resp = await registerService(data);
        if (!resp.status) {
            toast.update(id, {
                ...TOAST_CONFIG,
                isLoading: false,
                render: resp.json.message,
                type: "error"
            });
        }
        else if (checkServerSideError(resp.json)) {
            toast.update(id, {
                ...TOAST_CONFIG,
                isLoading: false,
                render: "Something went wrong",
                type: "error"
            });
        } 
        else {
            toast.update(id, {
                ...TOAST_CONFIG,
                isLoading: false,
                render: "Registered successfully...",
                type: "success"
            });

            navigate("/login");
        }
    }

    // called on clicking on 'Submit' button
    const onSubmitClick = () => {
        console.log("On Submit Called");
        const status = validateData();
        if (!status) {
            return;
        }
        else {
            performRegistration();
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
            client_id: "357638932881-7pmk59af7sui48uh4qop0n8uru7pm203.apps.googleusercontent.com",
            redirect_uri: `https://leetclone-backend.onrender.com/${REDIRECT_URI}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();
        window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
    }

    return (
        <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[30%]">
            <div class="p-4 sm:p-7">
                <div class="text-center">
                    <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
                    <p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                        Already have an account ?
                        <a class="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="/login">
                            &nbsp;Sign in here
                        </a>
                    </p>
                </div>

                <div class="mt-5">
                    <form>
                        <div class="grid gap-y-4">
                            <div>
                                <label for="username" class="block text-sm mb-2 dark:text-white">Username</label>
                                <div class="relative">
                                    <input type="text" id="username" name="username" class="border-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" aria-describedby="username-error" value={data.username} onChange={(e) => updateData('username', e.target.value)} />
                                    <div className={`${errors.username.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 bottom-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.username.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="username-error">{errors.username.join(" | ")}</p>
                            </div>
                            <div>
                                <label for="email" class="block text-sm mb-2 dark:text-white">Email address</label>
                                <div class="relative">
                                    <input type="email" id="email" name="email" class="border-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" value={data.email} onChange={(e) => updateData('email', e.target.value)} />
                                    <div className={`${errors.email.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 bottom-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.email.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="username-error">{errors.email.join(" | ")}</p>
                            </div>
                            <div>
                                <label for="password" class="block text-sm mb-2 dark:text-white">Password</label>
                                <div class="relative">
                                    <input type={viewPass ? "text" : "password"} id="password" name="password" class="border-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" value={data.password} onChange={(e) => updateData('password', e.target.value)} />
                                    <button onClick={() => setViewPass(!viewPass)} type="button" className='absolute text-slate-300 hover:text-slate-400' style={{ right: "15px", top: "15px" }}>
                                        {viewPass ? <FaLockOpen /> : <FaLock />}
                                    </button>
                                    <div className={`${errors.password.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 bottom-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.password.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="username-error">{errors.password.join(" | ")}</p>
                            </div>
                            <div>
                                <label for="confirm-password" class="block text-sm mb-2 dark:text-white">Confirm Password</label>
                                <div class="relative">
                                    <input type={viewConfirmPass ? "text" : "password"} id="confirm-password" name="confirm-password" class="border-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="confirm-password-error" value={data.confirmPassword} onChange={(e) => updateData('confirmPassword', e.target.value)} />
                                    <button onClick={() => setViewConfirmPass(!viewConfirmPass)} type="button" className='absolute text-slate-300 hover:text-slate-400' style={{ right: "15px", top: "15px" }}>
                                        {viewConfirmPass ? <FaLockOpen /> : <FaLock />}
                                    </button>
                                    <div className={`${errors.confirmPassword.length === 0 ? "hidden" : ""} flex flex-col justify-center items-center absolute inset-y-0 end-0 bottom-0 pointer-events-none pe-3`}>
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={`${errors.confirmPassword.length === 0 ? "hidden" : ""} text-xs text-red-600 mt-2`} id="username-error">{errors.confirmPassword.join(" | ")}</p>
                            </div>
                            <button onClick={onSubmitClick} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
                        </div>
                    </form>

                    <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>

                    <button onClick={onGoogleLogin} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                        <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                        </svg>
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterDiv