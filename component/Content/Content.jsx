import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Content.css";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
export default function Content({ todos, setTodos, errMsg }) {
  console.log(errMsg);

  return (
    <article className="content__wrapper bg-slate-100">
      {/* {errMsg.msg.length > 0 ? (
          errMsg.msg && (
            <div className="flex flex-row items-center bg-red-500 text-white p-4 rounded-md gap-x-2 outline outline-2 outline-offset-2 outline-red-500 error_msg">
              <FaCircleXmark size={24} />
              {errMsg.msg}
            </div>
          )
        ) : todos.length > 0 && errMsg.msg ? (
          todos.map((todo) => (
            <Card key={todo.id} todo={todo} setTodos={setTodos} />
          ))
        ) : (
          <div className="text-xl text-slate-500 empty_text flex flex-row items-center gap-x-2">
            <FaPencilAlt />
            Let note some amazing task .
          </div>
        )} */}
        
        {errMsg.msg.length > 0 && (
          <div className="flex flex-row items-center bg-red-500 text-white p-4 rounded-md gap-x-2 outline outline-2 outline-offset-2 outline-red-500 error_msg">
            <FaCircleXmark size={24} />
            {errMsg.msg}
          </div>
        )}

      {todos.length > 0 ? (
        todos.map((todo) => (
          <Card key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      ) : (
        <div className="text-xl text-slate-500 empty_text flex flex-row items-center gap-x-2">
          <FaPencilAlt />
          Let’s note some amazing tasks.
        </div>
      )}
    </article>
  );
}
