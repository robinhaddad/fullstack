import React from "react";

const Filter = ({filterValue,persons,deleteFromPersons}) => {
    if(filterValue===""){
            return (<div> </div>)
        } else if (filterValue!==""){
        return (
            <ul>
                {persons.filter(person => person.name
                    .toLowerCase()
                    .includes(filterValue
                        .toLowerCase()))
                        .map(item => (
                        <li key={item.name}>
                            <p>
                                {item.name}
                                &nbsp;{item.number}
                                &nbsp;<button onClick={()=>deleteFromPersons(item.id)}>delete</button>
                            </p>
                        </li>))}
                    </ul>
                )
        }
}

export default Filter