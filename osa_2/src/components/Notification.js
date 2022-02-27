import React from "react";

const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else if (message.valueOf()===`please give a proper name...`
        || message.includes(`is already added to phonebook`)
        || message.includes(`has already been removed from server`)
        || message.includes(`validation`)
        || message.includes(`Person validation failed!`)
        || message.includes(`phone number!`)){
        return (
            <div className="error">
                {message}
            </div>
        )
    } else if (message.includes(`Successfully changed`)
        || message.includes(`was deleted from the phonebook`)
        || message.includes(`phonebook!`)) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
}

export default Notification