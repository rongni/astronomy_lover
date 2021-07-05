// get [date_list, yyyy, mm, dd] from yyyy-mm-dd string
export const getDate = (str) => {
    const date_list = str.split('-')
    const yyyy = date_list[0];
    const mm = date_list[1];
    const dd = date_list[2];
    return [date_list, yyyy, mm, dd]
}

// transform 1 to 01
const date2Str = (data) => {
    data = String(data)
    if (data.length < 2) {
        return "0" + data
    }
    return data
}

// get yyyy-mm-dd string from new Date() format
export const getDateFromAPI = (data) => {
    const yyyy = data.getFullYear()
    let mm = date2Str(data.getMonth() + 1)
    const dd = date2Str(data.getDate())
    console.log('mm ' + String(mm) + String(mm.length))
    return `${yyyy}-${mm}-${dd}`
}