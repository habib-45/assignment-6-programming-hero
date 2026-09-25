import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icard } from '@/types/cardtype';


interface IcardProps {
    card : Icard
}

const Allcard= ({ card }:IcardProps) => {
  return (
    <div className="h-full">
      <Link href={`/workout/${card.id}`}>
        <div className="bg-gray-800 rounded-2xl shadow-md text-left overflow-hidden border border-transparent hover:border-[#c2fb06] transition-all cursor-pointer h-full flex flex-col justify-between">
          
          {/* Card Top / Image */}
          <div>
            <Image
              src={card.image}
              alt={card.name}
              width={300}
              height={330}
              className="h-60 w-full object-cover rounded-t-2xl"
            />

            <div className="p-4 flex flex-col gap-y-2">
              {/* Muscle Group Badges */}
              <div className="flex gap-2 flex-wrap">
                {card.muscleGroups?.map((muscle: string) => (
                  <span
                    key={muscle}
                    className="text-black bg-emerald-300 rounded-full border border-gray-600 px-3 py-1 text-xs font-bold"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Title & Equipment */}
              <h3 className="text-xl font-semibold text-white mt-1">{card.name}</h3>
              <p className="text-gray-400 text-sm">{card.equipment}</p>
            </div>
          </div>

          {/* Card Bottom / Stats */}
          <div className="p-4 pt-0">
            <hr className="border-gray-700 mb-3" />
            <div className="flex justify-between cards-center text-sm text-gray-300">
              <p>⏱ {card.duration} min</p>
              <p>🔥 {card.caloriesBurned} kcal</p>
              <p className="text-lime-400 font-medium">⭐ {card.rating}</p>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default Allcard;