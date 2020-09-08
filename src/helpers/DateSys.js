const dateParser = date => {
    let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    let args = {
        date: date,
        day: day.toString().length === 1 ? "0" + day : day,
        month: month.toString().length === 1 ? "0" + month : month,
        year,
        hour: hour.toString().length === 1 ? "0" + hour : hour,
        minute: minute.toString().length === 1 ? "0" + minute : minute,
        second: second.toString().length === 1 ? "0" + second : second,
        time: date.getTime(),
        day_time: new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " 00:00:00").getTime(),
        day_index: ((date.getDay() === 6) ? 0 : date.getDay() - 1),
        month_index: date.getMonth(),
        month_last_day: new Date(year, month, 0).getDate(),
        month_time: new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + 2 + " 00:00:00").getTime()
    };

    args.fulltime = args.hour + ":" + args.minute + ":" + args.second;
    args.fulldate = args.day + "/" + args.month + "/" + args.year + " " + args.fulltime;

    return args
};

const DateSys = {};


DateSys.unixEncoder = unix => {
    if (unix.toString().length < 12)
        unix = unix * 1000;
    let date = new Date(unix);
    return dateParser(date);
};

DateSys.currentDate = () => {
    let date = new Date();
    return dateParser(date);
};

DateSys.dateTranslate = (dd, mm, yyyy, h = "00", m = "00", s = "00") => {
    let date = new Date(yyyy + "/" + mm + "/" + dd + " " + h + ":" + m + ":" + s);
    return dateParser(date);
};

DateSys.change = (changeValue, currentDate = false) => {
    const date = currentDate ? currentDate : DateSys.currentDate().time;
    let operator = 1,
        extraTime = false;

    const numberValue = changeValue.toString().match(/([\d+]+)/)[0];

    if (changeValue.toString().match(/(\-)/))
        operator = 0;

    if (typeof changeValue === "number")
        extraTime = numberValue;
    else if (typeof changeValue === "string")
    {
        if (RegExp("^(([\+|\-])([0-9]+) (seconds?|minutes?|hours?|days?|weeks?))$").test(changeValue))
        {

            let baseTime = 0;

            const matchTimeType = changeValue.match(/(seconds?|minutes?|days?|weeks?)/)[0];

            switch (matchTimeType) {
                case "second":
                case "seconds":
                    baseTime = 1000;
                    break;
                case "minute":
                case "minutes":
                    baseTime = (1000 * 60);
                    break;
                case "hour":
                case "hours":
                    baseTime = ((1000 * 60) * 60);
                    break;
                case "day":
                case "days":
                    baseTime = (((1000 * 60) * 60) * 24);
                    break;
                case "week":
                case "weeks":
                    baseTime = ((((1000 * 60) * 60) * 24) * 7);
                    break;
            }

            extraTime = numberValue * baseTime;
        }
        else
            throw new Error("Date is not match!");
    }

    const newDate = operator === 0 ? (date - extraTime) : (date + extraTime)

    return DateSys.unixEncoder(newDate);
};

export { DateSys }