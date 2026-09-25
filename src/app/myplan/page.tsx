"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Icard } from "@/types/cardtype";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");
  const [items, setItems] = useState<Icard[]>([]);

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [tabParam]);

  const loadItems = () => {
    const key = activeTab === "today" ? "todayPlan" : "savedPlan";
    let data: Icard[] = JSON.parse(localStorage.getItem(key) || "[]");

    if (sortBy === "Duration") {
      data.sort((a, b) => Number(b.duration || 0) - Number(a.duration || 0));
    } else if (sortBy === "Calories") {
      data.sort((a, b) => Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0));
    } else if (sortBy === "Rating") {
      data.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, [activeTab, sortBy]);

  const removeItem = (id: string | number) => {
    const key = activeTab === "today" ? "todayPlan" : "savedPlan";
    const updated = items.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(key, JSON.stringify(updated));
    setItems(updated);
    window.dispatchEvent(new Event("storage"));
  };

  const totalExercises = items.length;
  const totalMinutes = items.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = items.reduce((acc, item) => acc + (Number(item.caloriesBurned) || 0), 0);

  return (
    <div className="min-h-screen bg-[#070a12] text-white p-6 md:p-12 flex justify-center items-start font-sans">
      <div className="w-full max-w-6xl space-y-6">
        
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            MY PLAN
          </h1>
          <p className="text-[#8892a4] text-xs md:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-3 bg-[#0b0f19] border border-[#161c2e] rounded-2xl p-6 divide-x divide-[#182032]">
          <div className="px-4 first:pl-2">
            <p className="text-[#8892a4] text-xs font-semibold mb-1">Exercises</p>
            <p className="text-3xl md:text-4xl font-extrabold text-[#c2fb06]">
              {totalExercises}
            </p>
          </div>

          <div className="px-6">
            <p className="text-[#8892a4] text-xs font-semibold mb-1">Minutes</p>
            <p className="text-3xl md:text-4xl font-extrabold text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="px-6">
            <p className="text-[#8892a4] text-xs font-semibold mb-1">Calories</p>
            <p className="text-3xl md:text-4xl font-extrabold text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="bg-[#0b0f19] border border-[#161c2e] p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === "today"
                  ? "bg-[#182032] text-white"
                  : "text-[#8892a4] hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === "saved"
                  ? "bg-[#182032] text-white"
                  : "text-[#8892a4] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8892a4] text-xs font-semibold">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0b0f19] border border-[#161c2e] text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-[#c2fb06] cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="border border-dashed border-[#1e2738] rounded-2xl bg-[#0b0f19]/40 min-h-[320px] flex flex-col justify-center items-center text-center p-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase text-white">
                NOTHING HERE YET
              </h2>
              <p className="text-[#8892a4] text-xs md:text-sm">
                Browse the library and add a lift to get today moving.
              </p>
              <Link href="/">
                <button className="bg-[#c2fb06] hover:bg-[#b0e600] text-black font-extrabold py-3 px-6 rounded-full text-xs transition-transform active:scale-95 shadow-lg shadow-[#c2fb06]/10">
                  Go to workouts
                </button>
              </Link>
            </div>
          ) : (
            items.map((card) => (
              <div
                key={card.id}
                className="bg-[#0b0f19] border border-[#161c2e] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-[#242e42]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#121826] flex-shrink-0">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-extrabold uppercase text-white tracking-wide">
                      {card.name}
                    </h3>
                    <p className="text-[#8892a4] text-xs font-medium">
                      {card.equipment || "Equipment N/A"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#8892a4] pt-1">
                      <span className="flex items-center gap-1">
                        ⏱ {card.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        🔥 {card.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        ⭐ {card.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center w-full md:w-auto justify-end">
                  <Link href={`/allCard/${card.id}`}>
                    <button className="bg-transparent hover:bg-[#161c2e] text-white border border-[#242e42] font-semibold px-4 py-2 rounded-xl text-xs transition-all">
                      View Details
                    </button>
                  </Link>

                  <button className="bg-[#c2fb06] hover:bg-[#b0e600] text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1">
                    ✓ Mark as Done
                  </button>

                  <button
                    onClick={() => removeItem(card.id)}
                    className="p-2 text-[#8892a4] hover:text-red-400 transition-colors ml-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white text-center">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}