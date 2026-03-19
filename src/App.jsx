import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dots, setDots] = useState(1)


useEffect(() => {
  const interval = setInterval(() => {
    setDots((prev) => (prev < 3 ? prev + 1 : 0));
  }, 500); 
  // 500 is the

  return () => clearInterval(interval); // cleanup
}, []);
 
  return (
    <>
      <section id="center">
        <div>
          <h1>Project Loading{'.'.repeat(dots)}</h1>
          <p>
            <code>Pierce Seigne & Ryan Ross</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    </>
  )
}

export default App
