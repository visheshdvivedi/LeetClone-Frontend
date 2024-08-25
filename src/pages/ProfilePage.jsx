import React from 'react';
import "./ProfilePage.css";
import { useNavigate } from 'react-router-dom';

import { getProfilePictureService } from '../services/account';

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

    const [profilePic, setProfilePic] = React.useState("./profile_pic.png")

    const tags = [
        { name: "array", count: 12 },
        { name: "sorting", count: 7 },
        { name: "searching", count: 5 }
    ]

    const xLabels = new Array(24).fill(0).map((_, i) => "")
    const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const data = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));

    const updateProfilePicture = async () => {
        const resp = await getProfilePictureService();
        if (!resp.status) {
            return;
        }
        else {
            setProfilePic(resp.json.image);
        }
    }

    React.useEffect(() => {

        updateProfilePicture();

        var elements = document.querySelectorAll("*[style]");
        Array.prototype.forEach.call(elements, (element) => {
            var value = element.getAttribute("style");

            if (value === "position: absolute; text-align: right; padding-right: 5px; padding-top: 4.05405px; width: 40px;")
                element.style.color = "white";
            else if (value === "flex: 1 1 0%; text-align: center; width: 25px; visibility: visible;") {

            }
        })
    }, []);

    return (
        <div>
            <Header />
            <div className='px-10 py-4 flex flex-row gap-5'>

                <div className='min-w-[25%] dark:bg-neutral-800 dark:text-white px-5 py-4 flex flex-col gap-4'>

                    <div className='flex flex-row gap-3 w-full'>
                        <img src={profilePic} alt="profile picture" className='rounded aspect-square' width={100} />
                        <div className='flex flex-col justify-between flex-1'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Vishesh Dvivedi</span>
                                <span className='text-sm text-gray-400'>visheshdvivedi5012</span>
                            </div>
                            <button className='text-sm px-3 py-2 bg-blue-900 rounded text-blue-300 hover:text-blue-200' onClick={() => navigate("/editprofile")}>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <hr className='border-gray-500' />

                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Languages</span>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='flex flex-row items-center gap-2 text-sm '>
                                <DiPython />
                                Python
                            </span>
                            <span> 5&nbsp;
                                <span className='text-xs text-gray-400'>problems solved</span>
                            </span>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='flex flex-row items-center gap-2 text-sm '>
                                <DiJava />
                                Java
                            </span>
                            <span> 3&nbsp;
                                <span className='text-xs text-gray-400'>problems solved</span>
                            </span>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='flex flex-row items-center gap-2 text-sm '>
                                <DiJavascript />
                                JavaScript
                            </span>
                            <span> 2&nbsp;
                                <span className='text-xs text-gray-400'>problems solved</span>
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Tags</span>
                        <div className='flex flex-wrap gap-2'>
                            {tags.map(tag => (
                                <span className={` px-2 py-1 text-xs rounded-lg bg-neutral-700 dark:text-gray-400`}>{tag.name} x {tag.count}</span>
                            ))}
                        </div>
                    </div>

                </div>

                <div className='flex flex-col gap-5'>

                    <div className='flex flex-row gap-5'>

                        <div className='flex flex-row'>
                            <div className='relative w-[300px] flex flex-col justify-center items-center gap-3 dark:bg-neutral-800 h-[250px]'>
                                <span className='absolute top-3 dark:text-gray-400'>Solved by Difficulty</span>
                                <PieChart
                                    width={300}
                                    slotProps={{ legend: { hidden: true } }}
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 20, label: "School", color: "#2563eb" },
                                                { id: 1, value: 15, label: "Easy", color: "#059669" },
                                                { id: 2, value: 10, label: "Medium", color: "#d97706" },
                                                { id: 3, value: 5, label: "Hard", color: "#dc2626" }
                                            ],
                                            innerRadius: 75,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -120,
                                            endAngle: 120,
                                            cx: 150,
                                            cy: 150,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        }
                                    ]}
                                />
                                <span className='dark:text-gray-400 text-sm absolute' style={{ top: "190px" }}>50 solved</span>
                            </div>
                        </div>

                        <div className='h-[250px] text-xs flex-1 flex flex-col justify-center  items-center gap-3 dark:bg-neutral-800 py-5 px-5'>
                            <div className='w-full flex flex-row justify-between items-center dark:text-white px-5'>
                                <div>
                                    <span className='dark:text-white text-xl'>75 </span>
                                    <span className='dark:text-gray-400 text-lg'>submissions</span>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <div>
                                        <span className='dark:text-gray-400'>Total active days: </span>
                                        <span>10</span>
                                    </div>
                                    <div>
                                        <span className='dark:text-gray-400'>Max streak: </span>
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>
                            <HeatMap
                                xLabels={xLabels}
                                yLabels={yLabels}
                                data={data}
                                height={15}
                                xLabelWidth={27}
                                xLabelHeight={27}
                                cellStyle={(background, value, min, max, data, x, y) => ({
                                    background: `rgb(0, 255, 0, ${1 - (max - value) / (max - min)})`,
                                    fontSize: "11.5px",
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