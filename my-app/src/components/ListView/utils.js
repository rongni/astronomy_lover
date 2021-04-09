export const getDate = (str) => {
    const date_list = str.split('-')
    const yyyy = date_list[0];
    const mm = date_list[1];
    const dd = date_list[2];
    return [date_list, yyyy, mm, dd]
}