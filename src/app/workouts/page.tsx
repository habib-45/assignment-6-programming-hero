import Image from 'next/image';
import banner from '@/app/component/assets/banner.png'
import React from 'react';

const SavedPage = () => {
    return (
        <div className='my-15'>

            <div className='container mx-auto flex justify-between bg-gray-900 rounded-2xl'>
                <div className='w-[530px] h-[400px] flex flex-col justify-center gap-5 ps-20 items-start'>
                    <h4 className='text-lime-200'>WORKOUT LIBRARY</h4>
                    <h2 className='text-4xl font-bold'>TRAIN WITH INTENT. LOG
                        EVERY SET.</h2>
                    <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today's plan, and watch the week's work add up.</p>
                    <button>BROWSE WORKOUTS</button>
                </div>
                <Image className='p-15'
                    src={banner}
                    alt="FitLog banner"
                    width={400}
                    height={200}
                    style={{ height: "auto" }}
                />
            </div>

        </div>
    );
};

export default SavedPage;