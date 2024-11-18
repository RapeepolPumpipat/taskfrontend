import Content from '../component/Content/Content'
import Form from '../component/Form/Form'
import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [errMsg, setErrMsg] = useState({ msg: '' });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      const fetchData  = async () => {
          try {
              const response = await axios.get('http://localhost:3000/todos')
              if (!response.status === 200) {
                  throw new Error(
                      'Can not get data.'
                  )
              }
              setTodos(response.data);
          } catch(e) {
            setErrMsg({...errMsg, msg: e.message })
          }
      }
      fetchData();
  }, [])

  return (
    <main id='page__wraper' className='bg-slate-100'>
      <Form setTodos={setTodos} setErrMsg={setErrMsg}/>
      <Content todos={todos} setTodos={setTodos} errMsg={errMsg}/>
    </main>
  )
}

export default App
