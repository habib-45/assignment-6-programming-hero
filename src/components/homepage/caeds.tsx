import CardN from "@/app/allCard/allcard";
import Allcard from "../shared/allcard";
import { Icard } from "@/types/cardtype";

const getWorkouts = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    return res.json();
};

const AllDatas = async () => {
    const workouts = await getWorkouts();

    return (
        <div className="p-6 text-white">
            <div className="m-7">
                <h2 className="text-3xl font-bold">THE LIBRARY</h2>
                <p className="text-1xl">Twelve lifts covering every major muscle group.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl">
                {workouts.map((card:Icard, ind:number) => {
                    return <CardN key={ind} card={card}></CardN>
                })}
            </div>
        </div>
    );
};

export default AllDatas;