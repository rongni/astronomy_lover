import React from 'react';

const DateSelect = ({ start_date, end_date, handleDateSubmit, handleStartChange, handleEndChange }) => {
    
    return (
        <form onSubmit={handleDateSubmit}>
            <input type='text'
                placeholder="Start date"
                value={start_date}
                onChange={handleStartChange}>
            </input>
            <input type='text'
                placeholder="End date"
                value={end_date}
                onChange={handleEndChange}>
            </input>
            <input type='submit'></input>
        </form>
    )
}

export default DateSelect;