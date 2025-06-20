export function formatTimeField(date: Date){
    const time = date.toLocaleTimeString().replace(' ', ':').split(':')
    time.splice(2, 1);
    return (`${time[0]}:${time[1]} ${time[2]}`);
}