import { useState } from 'react';
import './Card.css'
import { RiExpandDiagonalLine, RiCollapseDiagonalFill, RiCloseLine } from "react-icons/ri";
import { FaFlagCheckered } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";
import { PiTagChevronFill, PiTagChevronBold } from "react-icons/pi";
import axios from 'axios'
export default function Card({ todo, setTodos, showBanner }) {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isImportant, setIsImportant ] = useState(todo.mark)

    const formatTime = (time) => {
        const getDateTime = new Date(time);
        if (isNaN(getDateTime)) { return "-" }
        const day = String(getDateTime.getDate()).padStart(2, '0');
        const month = String(getDateTime.getMonth()).padStart(2, '0');
        const year = getDateTime.getFullYear();
        const hours = String(getDateTime.getHours()).padStart(2, '0');
        const minute = String(getDateTime.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minute}`
    }

    const delData = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
        .then(response => response.data)
        .then(data => {
          setTodos(data.todos);
          showBanner({ variant: "success", msg: data.msg });
        })
        .catch(err => {
          showBanner({ variant: "error", msg: err.response.data.msg });
        })
    }

    const markHandler = (id) => {
        axios.patch(`http://localhost:3000/todos/${id}`)
        .then(response => response.data.todo)
        .then(data => {
            setIsImportant(data.mark);
        })
        .catch(err => err.response.data.msg)
        .catch(msg => {
            showBanner({ variant: "error", msg })
        })

    }

    return (
        <div className="flex flex-col gap-y-2 shadow-lg bg-white p-4 rounded-md">
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-bold flex flex-row items-center gap-x-2"><button onClick={() => markHandler(todo.id)}>{ isImportant ? <PiTagChevronFill size={20} className='text-yellow-400'/> : <PiTagChevronBold size={20} className='text-yellow-400'/> }</button>{ todo.topic }</h3>
                <div className='flex flex-row justify-center content-center gap-x-1'>
                    <button className='p-1 rounded-md bg-green-500 hover:bg-green-700 hover:-translate-y-0.5 transition active:scale-90 active:translate-y-0.5 shadow-lg text-white' onClick={() => setIsOpen(!isOpen)}>{ !isOpen ? <RiExpandDiagonalLine size={16}/> : <RiCollapseDiagonalFill size={16}/>}</button>
                    <button className='p-1 rounded-md bg-red-500 hover:bg-red-700 hover:-translate-y-0.5 transition active:scale-90 active:translate-y-0.5 shadow-lg text-white' onClick={() => delData(todo.id)}><RiCloseLine size={16}/></button>
                </div>
            </div>
            { isOpen && (
                <div className='grid grid-cols-3 gap-y-1 flex-1 p-2'>
                    <div className='flex flex-col gap-y-3'>
                        <div className='flex flex-col gap-y-2'>
                            <h4 className='text-md text-slate-400 flex flex-row items-end gap-x-2'><FaFlagCheckered/>Start</h4>
                            <h6 className="text-sm">{formatTime(todo.start)}</h6>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <h4 className='text-md text-slate-400 flex flex-row items-end gap-x-2'><LuGoal/>Finish</h4>
                            <h6 className="text-sm">{formatTime(todo.finish)}</h6>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 col-span-2'>
                        <h4 className='text-md text-slate-400 flex flex-row items-end gap-x-2'><BiCommentDetail/>Detail</h4>
                        <h6 className="text-sm">{ todo.msg ? todo.msg : "-" }</h6>
                    </div>
                </div>
            )}
        </div>
    )
}