import React, {useState} from 'react'
import {App as MyFirstApp} from "./teht1.1-1.5/App";
import {App as MySecondApp} from "./teht1.6-1.11/App";
import {App as MyThirdApp} from "./teht1.12-1.14/App";

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {

    const [myVal, setMyVal] = useState(0)

    function setMyValValue(passedValue){
        setMyVal(passedValue)
    }

    function appToBeShown() {
        if(myVal===1){
            return (
                <div>
                    <div><p> </p>
                        <p1>(You are now viewing assignments 1.1-1.5)</p1>
                        <p> </p>
                    </div>
                    <div>
                        <MyFirstApp />
                    </div>
                </div>
            )
        } else if(myVal===2){
            return (
                <div>
                    <div><p> </p>
                        <p1>(You are now viewing assignments 1.6-1.11)</p1>
                        <p> </p>
                    </div>
                    <div>
                        <MySecondApp />
                    </div>
                </div>
            )} else if(myVal===3){
            return (
                <div>
                    <div><p> </p>
                        <p1>(You are now viewing assignments 1.12-1.14)</p1>
                        <p> </p>
                    </div>
                    <div>
                        <MyThirdApp />
                    </div>
                </div>)
        }
    }

    return (
        <div>
            <h1>Please press the buttons to show completed assignments</h1>
            <Button handleClick={()=> setMyValValue(1)} text={"1.1-1.5"}/>
            <Button handleClick={()=> setMyValValue(2)} text={"1.6-1.11"}/>
            <Button handleClick={()=> setMyValValue(3)} text={"1.12-1.14"}/>
            <div>
                {appToBeShown()}
            </div>
        </div>
    )
}

export default App