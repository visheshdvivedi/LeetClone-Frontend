import React from 'react';
import "./ProfilePage.css";
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../Constants';
import { getProfilePictureService, getProfileInfoService } from '../services/account';

import Header from '../parts/Header';
import Footer from '../parts/Footer';

import { PieChart } from '@mui/x-charts';
import HeatMap from "react-heatmap-grid"
import { DiPython, DiJava, DiJavascript } from 'react-icons/di';

import ActivityTable from "../parts/dashboard/ActivityTable"
import CustomModal from "../components/Modals";
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../Constants';

const ProfilePage = () => {

    const navigate = useNavigate();
    const [openActivityModal, setOpenActivityModal] = React.useState(false);

    const [profileInfo, setProfileInfo] = React.useState(null);
    const [profilePic, setProfilePic] = React.useState("./profile_pic.png");

    const tags = [
        { name: "array", count: 12 },
        { name: "sorting", count: 7 },
        { name: "searching", count: 5 }
    ]

    const xLabels = new Array(24).fill(0).map((_, i) => "")
    const yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const data = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));

    const getLanguageIcon = (name) => {
        if (name === "javascript")
            return <DiJavascript />
        else if (name === "java")
            return <DiJava />
        else if (name === "python")
            return <DiPython />
        return null;
    }

    const updateProfilePicture = async () => {
        const resp = await getProfilePictureService();
        if (!resp.status) {
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
                console.log("Pic:", pic);
            }
        }
    }

    const updateProfileInfo = async () => {
        const resp = await getProfileInfoService();
        if (!resp.status) {
            toast.error(resp.status.message, TOAST_CONFIG);
            return;
        }
        setProfileInfo(resp.json);
    }

    React.useEffect(() => {
        updateProfileInfo();
        updateProfilePicture();
    }, []);

    React.useEffect(() => {
        var elements = document.querySelectorAll("*[style]");
        Array.prototype.forEach.call(elements, (element) => {
            var value = element.getAttribute("style");
            element.style.color = "white";
        })
    }, [profileInfo])

    if (!profileInfo) return (
        <div>
            <Header />
            <div className='px-10 py-4 flex flex-row gap-5 animate-pulse'>
                <div className='min-w-[25%] dark:bg-neutral-800 dark:text-white px-5 py-4 flex flex-col gap-4'>
                    <div className='flex flex-row gap-3 w-full'>
                        <div className="h-5 bg-neutral-700 rounded col-span-2" style={{ width: "100px", height: "100px" }}></div>
                        <div className='flex flex-col justify-between flex-1'>
                            <div className='flex flex-col'>
                                <div className="h-5 bg-neutral-700 rounded col-span-2"></div>
                                <div className="h-5 bg-neutral-700 rounded col-span-2"></div>
                            </div>
                            <div className="h-5 bg-neutral-700 rounded col-span-2" style={{ height: "30px" }}></div>
                        </div>
                    </div>
                    <div className="bg-neutral-700 rounded col-span-2 h-[300px]"></div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-5'>
                        <div className="bg-neutral-800 rounded col-span-2 h-[200px] w-[200px] px-4 py-3">
                            <div className="bg-neutral-700 rounded col-span-2 w-full h-full"></div>
                        </div>
                        <div className="bg-neutral-800 rounded col-span-2 h-[200px] w-[750px] px-4 py-3">
                            <div className="bg-neutral-700 rounded col-span-2 w-full h-full"></div>
                        </div>
                    </div>
                    <div className="bg-neutral-800 rounded col-span-2 h-[200px] w-[970px] px-4 py-3">
                        <div className="bg-neutral-700 rounded col-span-2 w-full h-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Header />
            <div className='px-10 py-4 flex flex-col xl:flex-row gap-5'>

                <div className='min-w-[25%] dark:bg-neutral-800 dark:text-white px-5 py-4 flex flex-col gap-4'>

                    <div className='flex flex-col items-center min-[400px]:flex-row gap-3 w-full'>
                        <img src={profilePic} alt="profile picture" className='rounded aspect-square w-full min-[340px]:max-w-[100px]' />
                        <div className='flex flex-col justify-between min-[400px]:items-start flex-1 gap-5'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>{profileInfo.full_name}</span>
                                <span className='text-sm text-gray-400'>{profileInfo.username}</span>
                            </div>
                            <button className='w-auto text-sm px-3 py-2 bg-blue-900 rounded text-blue-300 hover:text-blue-200' onClick={() => navigate("/editprofile")}>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <hr className='border-gray-500' />

                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Languages</span>
                        {Object.keys(profileInfo.solved_problems.count_by_language).map(key => (
                            <div className='flex flex-row justify-between items-center'>
                                <span className='flex flex-row items-center gap-2 text-sm '>
                                    {getLanguageIcon(key)}
                                    {key}
                                </span>
                                <span> {profileInfo.solved_problems.count_by_language[key]}&nbsp;
                                    <span className='text-xs text-gray-400'>problems solved</span>
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Tags</span>
                        <div className='flex flex-wrap gap-2'>
                            {Object.keys(profileInfo.solved_problems.count_by_tags).map(tag => (
                                <span className={` px-2 py-1 text-xs rounded-lg bg-neutral-700 dark:text-gray-400`}>{tag} x {profileInfo.solved_problems.count_by_tags[tag]}</span>
                            ))}
                        </div>
                    </div>

                </div>

                <div className='flex flex-col gap-5'>

                    <div className='flex flex-col min-[860px]:flex-row gap-5'>

                        <div className='flex flex-row justify-center dark:bg-neutral-800 '>
                            <div className='relative max-w-[300px] flex flex-col justify-center items-center gap-3 h-[250px]'>
                                <span className='absolute top-3 dark:text-gray-400'>Solved by Difficulty</span>
                                <PieChart
                                    width={240}
                                    slotProps={{ legend: { hidden: true } }}
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: profileInfo.solved_problems.count_by_difficulty['school'], label: "School", color: "#2563eb" },
                                                { id: 1, value: profileInfo.solved_problems.count_by_difficulty['easy'], label: "Easy", color: "#059669" },
                                                { id: 2, value: profileInfo.solved_problems.count_by_difficulty['medium'], label: "Medium", color: "#d97706" },
                                                { id: 3, value: profileInfo.solved_problems.count_by_difficulty['hard'], label: "Hard", color: "#dc2626" }
                                            ],
                                            innerRadius: 75,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -120,
                                            endAngle: 120,
                                            cx: 115,
                                            cy: 150,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        }
                                    ]}
                                />
                                <span className='dark:text-gray-400 text-sm absolute' style={{ top: "190px" }}>{profileInfo.solved_problems.total} solved</span>
                            </div>
                        </div>

                        <div className='h-[250px] hidden min-[600px]:block text-xs flex-1 flex flex-col justify-center  items-center gap-3 dark:bg-neutral-800 py-5 px-5'>
                            <div className='w-full flex flex-row justify-between items-center dark:text-white px-5'>
                                <div>
                                    <span className='dark:text-white text-xl'>75 </span>
                                    <span className='dark:text-gray-400 text-lg'>submissions</span>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <div>
                                        <span className='dark:text-gray-400'>Total active days: </span>
                                        <span>{profileInfo.active_days}</span>
                                    </div>
                                    <div>
                                        <span className='dark:text-gray-400'>Max streak: </span>
                                        <span>{profileInfo.max_streak}</span>
                                    </div>
                                </div>
                            </div>
                            <HeatMap
                                xLabels={xLabels}
                                yLabels={yLabels}
                                data={profileInfo.heatmap}
                                height={15}
                                xLabelWidth={20}
                                xLabelHeight={20}
                                cellStyle={(background, value, min, max, data, x, y) => ({
                                    background: value === 0 ? 'rgb(0, 255, 0, 0.1)' : `rgba(0, 255, 0, ${1 - (max - value) / (max - min + 1)})`,
                                    fontSize: "10px",
                                    margin: "5px"
                                }
                                )} />
                        </div>

                    </div>

                    <ActivityTable onClickAll={() => setOpenActivityModal(true)} />
                    <CustomModal open={openActivityModal} title={"Recent Submissions"} onClose={() => setOpenActivityModal(false)} content={<ActivityTable pagination={true} header={false} pageSize={8} />} />
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default ProfilePage