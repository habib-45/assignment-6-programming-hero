import Image from 'next/image';
import banner from '@/app/assets/banner.png'



const bannerpage = async() => {


    return (
        <div className="my-2">
            <div className="m-10 flex justify-between bg-gray-900 rounded-2xl">
                <div className="w-[530px] h-[400px] flex flex-col justify-center gap-5 ps-20 items-start text-white">
                    <h4 className="text-lime-200">WORKOUT LIBRARY</h4>
                    <h2 className="text-4xl font-bold">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h2>
                    <p className="text-gray-300">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today plan, and watch the week work add up.
                    </p>
                    <button className="bg-lime-500 text-black px-6 py-2 rounded hover:bg-lime-600">
                        BROWSE WORKOUTS
                    </button>
                </div>
                <Image
                    src={banner}
                    alt="FitLog banner"
                    width={400}
                    height={300}
                    priority
                    loading="eager"
                    className="rounded-lg shadow-lg"
                />
            </div>

 
        </div>
    );
};

export default bannerpage;
