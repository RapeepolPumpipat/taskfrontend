import React, { useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import "./Banner.css";

export default function Banner({ banner }) {
  return (
    <div
      className={`flex flex-row items-center ${banner.variant === 'error' ? "bg-red-500 outline-red-500" : "bg-green-500 outline-green-500" } text-white rounded-md gap-x-2 outline outline-2 outline-offset-2 error_msg ${banner.show ? "show" : "" }`}
    >
      { banner.variant === "error" ? <FaCircleXmark size={24} /> :  <FaCircleCheck size={24} /> }
      <p>{banner.msg}</p>
    </div>
  );
}
