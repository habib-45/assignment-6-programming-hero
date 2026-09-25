"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Icard } from "@/types/cardtype";

interface ActionButtonsProps {
  card: Icard;
}

export default function ActionButtons({ card }: ActionButtonsProps) {
  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const todayPlan: Icard[] = JSON.parse(localStorage.getItem("todayPlan") || "[]");
    const savedPlan: Icard[] = JSON.parse(localStorage.getItem("savedPlan") || "[]");

    setIsInPlan(todayPlan.some((item) => String(item.id) === String(card.id)));
    setIsSaved(savedPlan.some((item) => String(item.id) === String(card.id)));
  }, [card.id]);

  const toggleStorage = (
    key: string,
    isCurrentlyActive: boolean,
    setStatus: (val: boolean) => void,
    type: "plan" | "saved"
  ) => {
    const existingData: Icard[] = JSON.parse(localStorage.getItem(key) || "[]");

    if (isCurrentlyActive) {
      const updated = existingData.filter((item) => String(item.id) !== String(card.id));
      localStorage.setItem(key, JSON.stringify(updated));
      setStatus(false);

      toast.error(
        type === "plan"
          ? `${card.name} removed from Today's Plan!`
          : `${card.name} removed from Saved!`
      );
    } else {
      const updated = [...existingData, card];
      localStorage.setItem(key, JSON.stringify(updated));
      setStatus(true);


      toast.success(
        type === "plan"
          ? `${card.name} added to Today's Plan! 💪`
          : `${card.name} saved to your list! ⭐`
      );
    }

  
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleStorage("todayPlan", isInPlan, setIsInPlan, "plan")}
        className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
          isInPlan
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-[#c2fb06] text-black hover:bg-[#b0e600]"
        }`}
      >
        {isInPlan ? "Remove Plan" : "Add to Plan"}
      </button>

      <button
        onClick={() => toggleStorage("savedPlan", isSaved, setIsSaved, "saved")}
        className={`px-4 py-2 text-xs font-extrabold rounded-xl border transition-all ${
          isSaved
            ? "bg-gray-800 text-amber-400 border-amber-400/50"
            : "bg-transparent text-white border-[#242e42] hover:bg-[#161c2e]"
        }`}
      >
        {isSaved ? "Saved ★" : "Save ☆"}
      </button>
    </div>
  );
}