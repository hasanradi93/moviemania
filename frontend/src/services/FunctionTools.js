
class FunctionTools {

 formatDate(newDate) {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let d = String(newDate).split('T')
    d = new Date(d[0])
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]
    const dayName = days[d.getDay()] // Thu
    const formatted = `${dayName}, ${date} ${monthName} ${year}`
    return formatted.toString()
} }

export default new FunctionTools()