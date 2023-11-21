import './App.css';
import divider from './images/pattern-divider-desktop.svg'
import dice from './images/icon-dice.svg'
import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://api.adviceslip.com/advice");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className = "App">
      <div className = "inner">

      <div className = 'advice_Quote'>
            {loading ? (
              <pre>Loading...

              </pre>
                
              ) : (
            data && (
              <>
                <h4 className='adviceColor'>Advice #{data.slip?.id}</h4>
                <p> "{data.slip?.advice}"</p>
              </>
            )
            )}
      </div>
      <div className='divider_button'>
        <img src = {divider} alt = "Divider"/>

        <div   onClick = {handleClick} className = "circularBackground">
          <img  className = "dice" src = {dice} alt = "Divider"/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;


