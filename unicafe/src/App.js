import { useState } from 'react'

const Buttons = (props) => {
  const {handleClick, text} = props
 
  return (
  <button onClick = {handleClick}> {text}</button>
  );
  
 }
 
 const Statistics = (props) => {
  const {good, bad, neutral} =  props

let total = (good+bad+neutral)
let avg = ((total)/3).toFixed(2)
let positiveper = ((good/total)*100).toFixed(2)


return(
<table>
        <tbody>
          <tr>
            <td>good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad:</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all:</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average:</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>Positive:</td>
            <td>{positiveper}%</td>
          </tr>
        </tbody>
      </table>
);
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(false)

  const goo = () => {
     {setGood(good + 1)};
     {setFeedback(true)};
    }
  
  
  const ba = () => {
   {setBad(bad + 1);}
   {setFeedback(true)};
  }

  const neu = () => {
   {setNeutral(neutral + 1);}
   {setFeedback(true)};
  }





  return (
    <div>
      <h1>Give Feedback</h1>
      <>
    <Buttons 
    handleClick = {goo}
    text = "good"/> 
     <Buttons 
    handleClick = {neu}
    text = "neutral"/> 
     <Buttons 
    handleClick = {ba}
    text = "bad"/> 

    <h1>Statistics</h1>
     
     {feedback ? (<Statistics
      good = {good}
      bad = {bad}
      neutral = {neutral}/>):(<p>No Feedback Given!</p>)}

      </>

     

    </div>
  )
}

export default App
