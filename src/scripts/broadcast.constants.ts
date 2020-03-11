const calculateUserTime = (city: string, offset: string): Date => {
    // create Date object for current location
    const serverDate = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    const utcTime = serverDate.getTime() + (serverDate.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utcTime + (3600000*parseInt(offset)));
};

export const shouldSendMessages = (): boolean => {
    const currentUserHour = calculateUserTime('Sofia', '+2').getHours();
    return currentUserHour > 10 && currentUserHour < 19 && currentUserHour != 12;
};
