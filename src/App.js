import React, {useState,useEffect} from 'react';
import "./App.scss"


const NEW_YEARS_EVE_DATE = new Date(2022, 11, 32, 0, 0, 0)

const getTimeDifference = () => {
      const currentTime = new Date()
      const difference = NEW_YEARS_EVE_DATE.getTime() - currentTime.getTime()

      const days_diff = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours_diff = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes_diff = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds_diff = Math.floor((difference % (1000 * 60)) / 1000)

      return {
        days_diff,
        hours_diff,
        minutes_diff,
        seconds_diff
      }
}


function App() {
  const [countdown,setCountdown] = useState();
  const [loading,setLoading] = useState(true);
  const [isNewYear,setIsNewYear] = useState(false)


  useEffect(
    () => {
      const interval = setInterval(() => {

        setLoading(false)
        setCountdown(getTimeDifference())

        if (countdown.days_diff <= 0
          && countdown.hours_diff <= 0
          && countdown.minutes_diff <= 0
          && countdown.seconds_diff <= 0
          ){
          setIsNewYear(true)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  )

  if (loading) {
    return (
      <div className='container'>
        <span className='font-big'>Loading...</span>
      </div>
    )
  }

  if (isNewYear){
    return (
      <div className='container'>
        <span className='font-big'>Happy New Year!</span>
      </div>
    )
  }

  return (    
  <div className='container'>

    <h1 className='title'>Countdown to<br/> New Year's Eve</h1>

    <div className='countdown'>

      <div className='flex'>
        <span className='font-big'>{countdown.days_diff} </span>
        <span className='font-small'>DAYS</span>
      </div>


      <div className='flex'>
          <span className='font-big'>{countdown.hours_diff} </span>
          <span className='font-small'>HOURS</span>
      </div>


      <div className='flex'>
          <span className='font-big'>{countdown.minutes_diff} </span>
          <span className='font-small'>MINUTES</span>
      </div>


      <div className='flex'>
          <span className='font-big'>{countdown.seconds_diff} </span>
          <span className='font-small'>SECONDS</span>
      </div>

    </div>
    
  </div>
  );
}

export default App;
