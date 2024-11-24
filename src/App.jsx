import Content from '../component/Content/Content'
import Form from '../component/Form/Form'
import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [todos, setTodos] = useState([]);
  const [banner, setBanner] = useState({ variant: "", msg: "", show: false });

  const hideBanner = () => {
    setBanner({ ...banner, show: false });
  }

  const showBanner = ({ variant, msg }) => {
    setBanner({ variant, msg, show: true });
    setTimeout(() => hideBanner(), 1500);
  }

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
            showBanner({ variant: "error", msg: e.message })
          }
      }
      fetchData();
  }, [])

  return (
    <main id='page__wraper' className='bg-slate-100'>
      <Form setTodos={setTodos} showBanner={showBanner}/>
      <Content todos={todos} setTodos={setTodos} banner={banner} showBanner={showBanner}/>
    </main>
  )
}

export default App
