export function getTimeFromTimeStampTZ(timestamp: object){
    const timeArray = (timestamp.toString().split(' ')[4].split(':'))
    if (Number(timeArray[0]) > 12){
        return `${Number(timeArray[0])-12}:${timeArray[1]} PM`
    }
    return `${timeArray[0]}:${timeArray[1]} AM`;
}