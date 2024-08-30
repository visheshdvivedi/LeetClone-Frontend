import React from 'react'
import "./EditProfilePage.css";

import Header from '../parts/Header'
import Footer from '../parts/Footer'

import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { BASE_URL, TOAST_CONFIG } from '../Constants';
import { getProfileInfoService, getProfilePictureService, updateProfileInfoService } from '../services/account';

const EditProfilePage = () => {

    const fileUploadRef = React.useRef();
    const profilePicRef = React.useRef();

    const [updatedInfo, setUpdatedInfo] = React.useState({ email: "", username: "", password: "", confirmPassword: "" });
    const [profilePic, setProfilePic] = React.useState('./profile_pic.png');

    const triggerFileUpload = () => {
        fileUploadRef.current.click();
    }

    const updateProfilePic = (event) => {
        profilePicRef.current.src = URL.createObjectURL(event.target.files[0]);
    }

    const updateProfileInfo = async () => {
        const resp = await getProfileInfoService();
        if (!resp.status) {
            toast.error(resp.status.message, TOAST_CONFIG);
            return;
        }
        setUpdatedInfo({
            email: resp.json.email,
            username: resp.json.username,
            password: "",
            confirmPassword: "",
            first_name: resp.json.first_name,
            last_name: resp.json.last_name
        })
    }

    const updateProfilePicture = async () => {
        const resp = await getProfilePictureService();
        if (!resp.status) {
            console.error(resp.json)
            return;
        }
        else {
            if (resp.json.profile_picture) {
                let pic = resp.json.profile_picture;
                if (pic.includes("/https%3A")) {
                    pic = pic.replace("/https%3A", "https://");
                    setProfilePic(pic);
                }
                else{
                    pic = BASE_URL + resp.json.profile_picture;
                    setProfilePic(pic);
                }
                console.log("Profile pic:", pic);
            }
        }
    }

    const sendUpdateProfileRequest = async () => {
        let data = updatedInfo;
        if (!data.password) delete data.password;
        if (!data.confirmPassword) delete data.confirmPassword;

        const resp = await updateProfileInfoService(updatedInfo);
        const id = toast.loading("Updating profile...");
        if (!resp.status) {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: resp.json.message, type: "error" })
        }
        else {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: "Profile updated successfully", type: "success" });
        }
    }
 
    React.useEffect(() => {
        updateProfilePicture();
        updateProfileInfo();
    }, []);

    if (!updatedInfo) return null;
    return (
        <>
            <Header />
            <div className='px-5 py-4 w-full h-full flex flex-row justify-center items-center gap-10'>

                <div className='px-5 py-4 dark:bg-neutral-800 border-t-2 border-neutral-600 flex flex-col dark:text-white items-center gap-5'>
                    <span className='text-2xl font-bold dark:text-gray-400'>Edit Profile Page</span>
                    <div className='relative'>
                        <div className='absolute opacity-0 hover:opacity-70 min-w-[200px] min-h-[200px] bg-neutral-800 flex flex-col justify-center items-center gap-2' onClick={triggerFileUpload}>
                            <FaCamera />
                            <span className='text-sm'>Change Picture</span>
                            <input type="file" accept='.png,.jpg,.jpeg' className='hidden' ref={fileUploadRef} onChange={updateProfilePic} />
                        </div>
                        <img src={profilePic} width="200" height="200" alt="profile picture" className='rounded-lg border-2 border-white max-w-[200px] max-h-[200px]' ref={profilePicRef} />
                    </div>

                    <div className='sm:w-full grid grid-cols-1 lg:grid-cols-2 gap-5 px-2 sm:px-10'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center w-full gap-2 sm:gap-5'>
                            <span className='dark:text-gray-400 basis-1/4'>Email</span>
                            <input type="email" name="email" id="email" className='w-full basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white text-sm' value={updatedInfo['email']} onChange={(e) => setUpdatedInfo({ ...updatedInfo, email: e.target.value })} />
                        </div>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center w-full gap-2 sm:gap-5'>
                            <span className='dark:text-gray-400 basis-1/4 '>Username</span>
                            <input type="text" name="username" id="username" className='w-full basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white text-sm' value={updatedInfo['username']}onChange={(e) => setUpdatedInfo({ ...updatedInfo, username: e.target.value })} />
                        </div>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center w-full gap-2 sm:gap-5'>
                            <span className='dark:text-gray-400 basis-1/4 '>First name</span>
                            <input type="text" name="username" id="username" className='w-full basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white text-sm' value={updatedInfo['first_name']}onChange={(e) => setUpdatedInfo({ ...updatedInfo, first_name: e.target.value })} />
                        </div>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center w-full gap-2 sm:gap-5'>
                            <span className='dark:text-gray-400 basis-1/4 '>Last name</span>
                            <input type="text" name="username" id="username" className='w-full basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white text-sm' value={updatedInfo['last_name']}onChange={(e) => setUpdatedInfo({ ...updatedInfo, last_name: e.target.value })} />
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 w-full'>
                        <button onClick={sendUpdateProfileRequest} className='flex-1 px-3 py-2 bg-orange-600 rounded-lg hover:bg-orange-700'>Save</button>
                        <button className='flex-1 px-3 py-2 bg-neutral-700 hover:bg-neutral-900 rounded-lg'>Cancel</button>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default EditProfilePage