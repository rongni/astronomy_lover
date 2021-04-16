import React from "react";

const CountForm = ({ count, handleCountChange, handleCountSubmit }) => {
    return(
        <form onSubmit={handleCountSubmit}>
            <input type='text'
                placeholder="Number"
                value={count}
                onChange={handleCountChange}>
            </input>
            <input type='submit'></input>
        </form>
    )
}

export default CountForm;