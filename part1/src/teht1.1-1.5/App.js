import React from 'react'

const Header = (props) => {
    return (
        <div>
            {props.course.name}
        </div>
    );
}

const Parts = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}

const Content = (props) => {
        return (
            <div>
                <Parts name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
                <Parts name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
                <Parts name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
            </div>
        )
}

const Total = (props) => {
    return(
        <div>
            <p>Total number of exercises = {(props.course.parts[0].exercises) +
            (props.course.parts[1].exercises) + (props.course.parts[2].exercises)}</p>
        </div>
    )
}

const App = () => {
    const asd = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={asd}/>
            <Content course={asd}/>
            <Total course={asd}/>
        </div>
    )
}

export {App}