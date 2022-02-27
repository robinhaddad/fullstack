import React, {useState} from 'react'
import {App as MyFirstApp} from "./teht2.1-2.5/App";
import {App as MySecondApp} from "./teht2.6-2.11_ja_teht2.15-2.20/App";
import {App as MyThirdApp} from "./teht2.12-2.14/App";

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
                        <p>(You are now viewing assignments 2.1-2.5)</p>
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
                        <p>(You are now viewing assignments 2.6-2.11 & 2.15-2.20)</p>
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
                        <p>(You are now viewing assignments 2.12-2.14)</p>
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
            <Button handleClick={()=> setMyValValue(1)} text={"2.1-2.5"}/>
            <Button handleClick={()=> setMyValValue(2)} text={"2.6-2.11 & 2.15-2.20"}/>
            <Button handleClick={()=> setMyValValue(3)} text={"2.12-2.14"}/>
            <div>
                {appToBeShown()}
            </div>
        </div>
    )
}

export default App