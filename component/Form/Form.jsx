import './Form.css'
import { IoLogoBuffer } from "react-icons/io5";
import axios from 'axios'
export default function Sidebar({ setTodos, showBanner }) {

    const sentData = (e)=> {
        e.preventDefault();
        const formData = {
            topic: e.target.topic.value,
            start: e.target.start.value,
            finish: e.target.finish.value,
            msg: e.target.detail.value,
        }
        axios.post('http://localhost:3000/todos', formData)
        .then(response => response.data)
        .then(data => {
            setTodos(data.todos);
            showBanner({ variant: "success", msg: data.msg });
        })
        .catch(err => {
            showBanner({ variant: "error", msg: err.response.data.msg });
        });
    }

    return (
        <nav id="nav">
            <div className='text-3xl flex flex-row items-center gap-x-2'><IoLogoBuffer/>Task manager</div>
            <form onSubmit={sentData} className='form'>
                <label htmlFor="topic" className='text-lg'>What is your task ?</label>
                <input type="text" name='topic' id='topic' className='form-input text-black rounded-md' placeholder='Go to supermarket' autoComplete='off'/>

                <label htmlFor="startDate" className='text-lg'>When you want to start this task?</label>
                <input type="datetime-local" name='start' id='start' className='form-input text-black rounded-md' autoComplete='off'/>

                <label htmlFor="finishDate" className='text-lg'>When you have to finish this task?</label>
                <input type="datetime-local" name='finish' id='finish' className='form-input text-black rounded-md' autoComplete='off'/>

                <label htmlFor="detail" className='text-lg'>Do you what to add more detail ?</label>
                <textarea name='detail' id='detail' className='form-textarea text-black rounded-md' placeholder='Purchase supermarket including milk, egg and rice.' rows={5} autoComplete='off'></textarea>
 
                <button type="submit" className='bg-indigo-500 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-100 hover:scale-105 transition-all delay:100 active:scale-100 active:translate-y-0.5 text-black p-3 rounded-md'>Submit</button>
            </form>
        </nav>
    )
}
