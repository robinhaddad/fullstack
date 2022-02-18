import React from "react";

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.courseName}
            </h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <ul>
                {props.course.parts.map(parts =>
                    <Part key={parts.id} parts={parts}/>)}
            </ul>
        </div>
    )
}

const Part = ({parts}) => {
    return (
        <div>
            <li>
                {parts.name} {parts.exercises}
            </li>
            {/*

            <li>index: {parts.id-1}</li>
            <li>id: {parts.id}</li>

            */}
        </div>
    )
}

const Total = (props) => {
    function myReducer() {
        let tempArray = []
        let reducer = (previousValue, currentValue) => previousValue + currentValue;
        for(let i=0;i<props.course.parts.length;i++){
            tempArray.push(props.course.parts[i].exercises);
        }
        return tempArray.reduce(reducer);
    }
    return (
        <div>
            <h1>total of {myReducer()} exercises</h1>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header courseName={props.course.name}/>
            <Content course={props.course}/>
            <Total course={props.course}/>
        </div>
    )
}

export default Course