import { Icard } from '@/types/cardtype';
import Image from 'next/image';
import React from 'react';
import ActionButtons from '@/components/ActionButtons'; // Client Component Import

interface Detailtype {
  params: Promise<{
    id: string;
  }>;
}

const getWorkouts = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "no-store" });
  return res.json();
};

const CardIdN = async ({ params }: Detailtype) => {
  const { id } = await params;
  const allCardDetail = await getWorkouts();
  const card = allCardDetail.find((c: Icard) => String(c.id) === String(id)) as Icard;

  if (!card) {
    return (
      <div className="min-h-screen bg-[#070a12] text-white flex justify-center items-center">
        <p className="text-xl font-semibold">Workout details not found!</p>
      </div>
    );
  }

  const stats = [
    { label: "EQUIPMENT", value: card.equipment || "Barbell, Bench" },
    { label: "DIFFICULTY", value: (card as any).difficulty || "Intermediate" },
    { label: "SETS", value: (card as any).sets || 4 },
    { label: "REPS", value: (card as any).reps || "6-8" },
    { label: "DURATION", value: `${card.duration || 25} min` },
    { label: "CALORIES", value: `${card.caloriesBurned || 180} kcal` },
    { label: "RATING", value: card.rating || 4.8 },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-white p-4 md:p-10 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-[#0b0f19] rounded-2xl p-6 md:p-8 border border-[#161c2e] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden bg-[#121826]">
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col h-full justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase mb-2">
                {card.name}
              </h1>
              <p className="text-[#8892a4] text-xs leading-relaxed mb-4">
                {(card as any).description || "A compound press that builds chest thickness, triceps, and pressing power."}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {card.muscleGroups?.map((muscle: string) => (
                  <span
                    key={muscle}
                    className="bg-[#c2fb06] text-black text-[11px] font-extrabold px-3 py-1 rounded-full"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="bg-[#101522] rounded-xl px-4 py-1 mb-6 border border-[#182032]">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex justify-between items-center text-xs py-2.5 ${
                      index !== stats.length - 1 ? "border-b border-[#182032]" : ""
                    }`}
                  >
                    <span className="text-[#647187] font-semibold text-[10px] tracking-wider">
                      {stat.label}
                    </span>
                    <span className="text-white font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-3">
                  INSTRUCTIONS
                </h3>
                <ol className="list-decimal list-inside text-[#8892a4] text-xs space-y-2 leading-relaxed">
                  {((card as any).instructions || [
                    "Lie on the bench with eyes under the bar and feet planted.",
                    "Unrack with locked elbows and lower the bar to mid-chest.",
                    "Press up in a slight arc until elbows lock without bouncing.",
                    "Keep shoulder blades pinched and a natural arch in the back.",
                  ]).map((step: string, idx: number) => (
                    <li key={idx}>
                      <span className="text-[#a0abbe] pl-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <ActionButtons card={card} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardIdN;