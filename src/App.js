import { useState } from 'react';
import './index.scss';

function App() {
  const [count, setCount] = useState(0)

  const decrement = () => {
    setCount(prev => prev - 1)
  }

  const increment = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div className="App"> 
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={decrement} className="minus">- Минус</button>
        <button onClick={increment} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
