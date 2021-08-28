import moment from 'moment';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const date_prefixes = { '1': "st", '2': "nd", '3': "rd" };

export const unixTimestampToReadableDatetime = (date) => {
    var MyDate = new Date(date);
    let MyDateString = ('0' + MyDate.getDate()).slice(-2) + '-'
        + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
        + MyDate.getFullYear();
    return MyDateString;
    // return moment(date).date() + "-" + (moment(date).month() + 1) + "-" + moment(date).year();
}

export function getCurrentDate() {
    let d = new Date();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    let date_arr = date.toString().split("");
    let date_last_num = date_arr[date_arr.length - 1];

    if (date > 10 && date <= 20) {
        date = date + "th";
    }
    else if (date_last_num in date_prefixes) {
        date = date + date_prefixes[date_last_num];
    }
    else {
        date = date + "th";
    }

    return day + " " + month + " " + date + " " + year;
}

export function getCurrentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = parseInt(hours) < 10 ? '0' + hours : hours;
    minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes;
    seconds = parseInt(seconds) < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ":" + seconds;
}