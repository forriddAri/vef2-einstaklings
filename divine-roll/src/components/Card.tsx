import React from "react";

type CardProps = {
  title: string;
  description: string;
  power: number;
  health: number;
};

const Card: React.FC<CardProps> = ({ title, description, power, health }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardTitle", title);
        e.dataTransfer.setData("cardDescription", description);
        e.dataTransfer.setData("cardPower", String(power ?? ""));
        e.dataTransfer.setData("cardHealth", String(health ?? ""));
      }}
      className="bg-white w-40 h-60 border-2 border-yellow-700 rounded-xl shadow-lg p-3 flex flex-col justify-between cursor-grab transition hover:scale-105 hover:shadow-xl"
    >
      <h2 className="text-md font-bold text-yellow-800">{title}</h2>
      <p className="text-sm text-gray-700 italic">{description}</p>
      <div className="text-right text-xs text-gray-500">Divine Roll</div>
      <div className="flex justify-between text-xs mt-2 text-black-600">
      {power !== undefined && <span>⚔️ {power}</span>}
      {health !== undefined && <span>❤️ {health}</span>}
      </div>
      
    </div>
  );
};

export default Card;

