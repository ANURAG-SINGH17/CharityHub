import React, { useState} from 'react';
import Map from '../components/Map';
import { OrganizationData } from '../data/OrganizationData';
import { Link } from 'react-router-dom';

const DonationPage = () => {
    const [cordinates, setCordinates] = useState(null); // Start with null
    const [formPanel ,  setFormPanel] = useState(false);

    const handleOrganizationClick = (position) => {
        setCordinates(position); // Update state with clicked organization's coordinates
        console.log(cordinates)
    };
    return (
        <>
        <div className="w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-[25vw] h-screen ">
                <div className="w-full bg-[#2981ca] text-white">
                    <h1 className="text-[2vw] py-2 px-4">Organization</h1>
                </div>
                <div className="h-[91vh] w-full pt-2 px-3 overflow-y-auto">
                    {OrganizationData.map((item, index) => (
                        <div
                            key={index}
                           // Send position on click
                            className="border-b-[1px] border-gray-400 mt-1 pb-2 cursor-pointer"
                        >
                            <div  onClick={() => handleOrganizationClick(item.position)} > 
                            <h1 className="text-[1.2vw] py-2 text-[#2981ca] font-semibold">{item.name}</h1>
                            <p className="text-[1vw]">{item.address}</p>
                            <p className="text-[1vw]">{item.type}</p>
                            <p className="text-[1vw] pb-1">{item.description}</p>
                            </div>
                            <Link to="/donor-form"
                                    state={{ organization: item }} // Properly pass the organization

                            className='text-white bg-black px-4 py-1 m-1 mb-2 rounded-md'>Donate</Link>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Map */}
            <div className="w-[75vw] h-screen">
                <Map OrganizationData={OrganizationData} cordinates={cordinates} />
            </div>
        </div>
        </>
    );
};

export default DonationPage;
