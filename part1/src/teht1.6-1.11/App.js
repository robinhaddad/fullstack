import React, {useState} from 'react'

const Statistics = (props) => {
        return (
                <table>
                    <StatisticLine text={"good"} value={props.valueInProps[0]}/>
                    <StatisticLine text={"neutral"} value={props.valueInProps[1]}/>
                    <StatisticLine text={"bad"} value={props.valueInProps[2]}/>
                    <StatisticLine text={"all"} value={props.valueInProps[0] + props.valueInProps[1] + props.valueInProps[2]}/>
                    <StatisticLine text={"average"} value={(props.valueInProps[0] - props.valueInProps[2]) /
                    (props.valueInProps[0]+props.valueInProps[1]+props.valueInProps[2])}/>
                    <StatisticLine text={"positive"} value={ (((props.valueInProps[0])/
                        (props.valueInProps[0]+props.valueInProps[1]+props.valueInProps[2]))*100)+" %"}/>
                </table>
            )
}

const StatisticLine = (props) => {
    return (
        <tbody>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </tbody>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [t, setT] = useState(false)
    const valueArr = [good,neutral,bad]

    function setTValue() {setT(true)}

    const setGoodValue = (increment) => {
        setTValue()
        setGood(increment)
    }

    const setNeutralValue = (increment) => {
        setTValue()
        setNeutral(increment)
    }

    const setBadValue = (increment) => {
        setTValue()
        setBad(increment)
    }

    function statsOrMsg() {
        let copyAry = [...valueArr]
        if(t===false){return (<div>no feedback given</div>)}
        else {
            return(
                <div>
                    <Statistics valueInProps={copyAry}/>
                </div>
            )
        }
    }
    return (
        <div>
                <div>
                    <h1>give feedback</h1>
                </div>
            <div>
                <Button handleClick={()=> setGoodValue(good + 1)} text={"good"}/>
                <Button handleClick={()=> setNeutralValue(neutral + 1)} text={"neutral"}/>
                <Button handleClick={()=> setBadValue(bad + 1)} text={"bad"}/>
            </div>
            <div>
                <h2>statistics</h2>
            </div>
            {statsOrMsg()}
        </div>
    )
}

export {App}