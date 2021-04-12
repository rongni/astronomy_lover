import React from 'react';
import { getDate } from './utils'
const Order = ({ order, setPhotoDataList, photoDataList, setOrder }) => {

    const handleOrderChange = (event) => {
        setOrder(event.target.value)
        if (event.target.value === 'asc') {
            const dataList = photoDataList.sort((a, b) => {
                const [, a_year, a_month, a_day] = getDate(a.date)
                const [, b_year, b_month, b_day] = getDate(b.date)
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
                const [, a_year, a_month, a_day] = getDate(a.date)
                const [, b_year, b_month, b_day] = getDate(b.date)
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