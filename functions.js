const fs = require('fs');

function loadFromFile(path) {
    const fileData = fs.readFileSync(path, 'utf-8');
    return JSON.parse(fileData);
};

function writeToFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
};

function generateNewId() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return (`${year}${month}${day}_${hours}${minutes}${seconds}` );
};

module.exports = {
    loadFromFile,
    writeToFile,
    generateNewId,
};