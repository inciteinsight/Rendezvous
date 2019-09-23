export const combineDateAndTime = (date: Date, time: Date) => {
    date = new Date(date)
    time = new Date(time)
    const timeString = Pad(time.getHours(),2) + ':' + Pad(time.getMinutes(),2) + ':00.000Z'
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const dateString = `${year}-${month}-${day}`

    return new Date(dateString + 'T' + timeString)
}

const Pad = (number: number, width: number) => {
    return new Array(+width + 1 - (number + '').length).join('0') + number;
}