import React from 'react';

const Order = ({ order, setPhotoDataList, photoDataList, setOrder }) => {

    const handleOrderChange = (event) => {
        setOrder(event.target.value)
        if (event.target.value === 'asc') {
            const dataList = photoDataList.sort((a, b) => {
                const a_list = a.date.split('-');
                const a_year = parseInt(a_list[0]);
                const a_month = parseInt(a_list[1]);
                const a_day = parseInt(a_list[2]);
                const b_list = b.date.split('-');
                const b_year = parseInt(b_list[0]);
                const b_month = parseInt(b_list[1]);
                const b_day = parseInt(b_list[2]);
                if (a_year === b_year) {
                    if (a_month === b_month) {
                        return a_day - b_day;
                    }
                    return a_month - b_month;
                }
                return a_year - b_year;
            });
            setPhotoDataList(dataList);
        } else {
            const dataList = photoDataList.sort((a, b) => {
                const a_list = a.date.split('-');
                const a_year = parseInt(a_list[0]);
                const a_month = parseInt(a_list[1]);
                const a_day = parseInt(a_list[2]);
                const b_list = b.date.split('-');
                const b_year = parseInt(b_list[0]);
                const b_month = parseInt(b_list[1]);
                const b_day = parseInt(b_list[2]);
                if (a_year === b_year) {
                    if (a_month === b_month) {
                        return b_day - a_day;
                    }
                    return b_month - a_month;
                }
                return b_year - a_year;
            });
            setPhotoDataList(dataList);
        }
    }
    
    return (
        <select name='attribute' value={order} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    )
}

export default Order;