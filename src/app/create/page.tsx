import React from "react";

const page = () => {
  return (
    <div className="w-full p-3 h-dvh flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full border-red-500 p-3">
        <h1 className="text-center font-bold text-white text-4xl">Create</h1>
        <p className="text-white/60 text-center">
          Generete Stunning Images from Text for FREE
        </p>
      </div>
      <div className="flex border-green-500 w-full gap-3 h-full">
        <div className="__form flex-[2] border border-yellow-400"></div>
        <div className="__output flex-[1] border border-yellow-400"></div>
      </div>
    </div>
  );
};

export default page;
