import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {

  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>  
  )
}

const Statistics = (props) => {
  if(props.good===0 && props.neutral===0 && props.bad===0) {
    return (
      <p>No Feedback Given</p>
    )
  }

  return (
  <table>
    <Statistic text="Good" value={props.good}  />
    <Statistic text="Neutral" value={props.neutral}/>
    <Statistic text="Bad" value={props.bad}/>
    <Statistic text="All" value={props.total}/>
    <Statistic text="Average" value={((props.good*1)+(props.neutral*0)+(props.bad*(-1)))/props.total}/>
    <Statistic text="Positive" value={((props.good*100)/props.total) + "%"} />
  </table>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.setNewGood} >Good</button>
      <button onClick={props.setNewNeutral}>Neutral</button>
      <button onClick={props.setNewBad}>Bad</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad , setBad] = useState(0);

  const total = good + neutral + bad;

  const setNewGood = () => {
    setGood(good+1);
  }

  const setNewNeutral = () => {
    setNeutral(neutral+1);
  }

  const setNewBad = () => {
    setBad(bad+1);
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button setNewGood={setNewGood} setNewNeutral={setNewNeutral} setNewBad={setNewBad} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));

