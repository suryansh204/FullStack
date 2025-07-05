import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>
const StatisticLine = ({text, value}) => <tr><td>{text} {value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allclicks, setAll] = useState(0);

  

  const handlegood = () => {setGood(good+1);
    setAll(allclicks+1);
  };
  const handlebad = () => {setBad(bad+1);
    setAll(allclicks+1);
  }
  const handleneutral = () => {setNeutral(neutral+1);
    setAll(allclicks+1);
  }
  

  return (
    <>
    <h1>Give Feedback</h1>
    <Button onClick={handlegood} text= "good" />
    <Button onClick={handleneutral} text = "neutral" />
    <Button onClick={handlebad} text = "bad" />

    <Statistics good = {good} neutral={neutral} bad={bad} all = {allclicks} />
</>
  )
}

const Statistics = (props) => {
  if(props.all === 0){
    return(
    <>
      <p>No feedback given!</p>
    </>)
  }
  
  return(
    <>
    <h1>Statistics</h1>
    <table>
     <tbody>
    <StatisticLine text = "good" value = {props.good} />
    <StatisticLine text = "neutral" value = {props.neutral} />
    <StatisticLine text = "bad" value = {props.bad} />
    <StatisticLine text = "all" value = {props.all} />
    <StatisticLine text = "average" value = {((props.good-props.bad)/(props.good+props.bad+props.neutral)).toFixed(2)} />
    <StatisticLine text = "positive" value = {`${(props.good/(props.good+props.bad+props.neutral)).toFixed(2)}%`}/>

    </tbody>

    </table>
    
    </>

  );
};

export default App