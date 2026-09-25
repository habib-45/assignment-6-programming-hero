"use client";

import { useState, useEffect } from "react";
import { Icard } from "@/types/cardtype";


export default function ActionButtons({ card }: { card: Icard }) {
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const planItems = JSON.parse(localStorage.getItem("todayPlan") || "[]");
    const savedItems = JSON.parse(localStorage.getItem("savedPlan") || "[]");

    setIsAddedToPlan(planItems.some((item: Icard) => String(item.id) === String(card.id)));
    setIsSaved(savedItems.some((item: Icard) => String(item.id) === String(card.id)));
  }, [card.id]);

  const toggleStorage = (key: string, isCurrentlyActive: boolean, setStatus: (val: boolean) => void) => {
    const existingData: Icard[] = JSON.parse(localStorage.getItem(key) || "[]");
    
    if (isCurrentlyActive) {
  
      const updated = existingData.filter((item) => String(item.id) !== String(card.id));
      localStorage.setItem(key, JSON.stringify(updated));
      setStatus(false);
    } else {
  
      const updated = [...existingData, card];
      localStorage.setItem(key, JSON.stringify(updated));
      setStatus(true);
    }
  };

  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => toggleStorage("todayPlan", isAddedToPlan, setIsAddedToPlan)}
        className={`flex-1 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 ${
          isAddedToPlan
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-[#c2fb06] hover:bg-[#b0e600] text-black"
        }`}
      >
        <span>📅</span> {isAddedToPlan ? "Added to Today's Plan" : "Add to today's plan"}
      </button>

      <button
        onClick={() => toggleStorage("savedPlan", isSaved, setIsSaved)}
        className={`border font-semibold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 ${
          isSaved
            ? "bg-white text-black border-white hover:bg-gray-200"
            : "bg-transparent hover:bg-[#161c2e] text-white border-[#242e42]"
        }`}
      >
        <span>🔖</span> {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}