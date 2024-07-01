const daysOfWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

const currentDate = new Date();

var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
let currentDayOfWeek = currentDate.getDay();

document.getElementById('day').innerHTML = currentDay;
document.getElementById('day-of-week').innerHTML = daysOfWeek[currentDayOfWeek];
document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;

let table = document.getElementById('table');

let headerRow = document.createElement('tr');
for (let i = 0; i < daysOfWeek.length; i++) {
    let headerCell = document.createElement('th');
    headerCell.textContent = daysOfWeek[i];
    headerRow.appendChild(headerCell);
}
table.appendChild(headerRow);

let firstDay = new Date(currentYear, currentMonth, 1);
console.log('firstDay', firstDay);

let startDayOfWeek = firstDay.getDay();
console.log('startDayOfWeek', startDayOfWeek);

let lastDay = new Date(currentYear, currentMonth + 1, 0);
console.log('lastDay', lastDay);
let numDays = lastDay.getDate();
console.log('numDays', numDays);

let numRows = Math.ceil((numDays + startDayOfWeek) / 7);
console.log('numRows', numRows);

let dayCount = 1;
for (let i = 0; i < numRows; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
        let cell = document.createElement('td');
        if (i === 0 && j < startDayOfWeek) {
            cell.textContent = '';
        } else if (dayCount > numDays) {
            cell.textContent = '';
        } else {
            cell.textContent = dayCount;
            if (dayCount === currentDay) {
                cell.classList.add('current-day');
            }
            dayCount++;
        }
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth === 12) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function prevYear() {
    currentYear--;
    updateCalendar();
}

function nextYear() {
    currentYear++;
    updateCalendar();
}

var selectDay = document.getElementById('select-day');
for (let i = 1; i <= 31; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectDay.appendChild(option);
}
selectDay.value = currentDate.getDate();

var selectMonth = document.getElementById('select-month');
for (let i = 1; i <= 12; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectMonth.appendChild(option);
}
selectMonth.value = currentDate.getMonth() + 1;

var selectYear = document.getElementById('select-year');
for (let i = 1970; i <= 2050; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
}
selectYear.value = currentDate.getFullYear();

function chooseDay() {
    numDays = new Date(parseInt(selectYear.value), parseInt(selectMonth.value), 0).getDate();
    if (parseInt(selectDay.value) > numDays) {
        alert(`Tháng ${selectMonth.value} năm ${selectYear.value} không có ngày ${selectDay.value}!`);
        return;
    } else {
        currentDay = parseInt(selectDay.value);
        currentMonth = parseInt(selectMonth.value) - 1;
        currentYear = parseInt(selectYear.value);

        document.getElementById('day').innerHTML = currentDay;
        document.getElementById('day-of-week').innerHTML =
            daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()];
        document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;
        updateCalendar();
    }
}

function toDay() {
    currentDay = currentDate.getDate();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

    document.getElementById('day').innerHTML = currentDay;
    document.getElementById('day-of-week').innerHTML = daysOfWeek[currentDate.getDay()];
    document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;

    selectDay.value = currentDate.getDate();
    selectMonth.value = currentDate.getMonth() + 1;
    selectYear.value = currentDate.getFullYear();

    updateCalendar();
}

let cells = document.getElementsByTagName('td');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        let highlightCell = document.getElementsByClassName('current-day');
        if (highlightCell.length > 0) {
            highlightCell[0].classList.remove('current-day');
        }
        this.classList.add('current-day');
        document.getElementById('day').innerHTML = this.textContent;
        document.getElementById('day-of-week').innerHTML =
            daysOfWeek[new Date(currentYear, currentMonth, this.textContent).getDay()];
        document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;
    });
}

function updateCalendar() {
    console.clear();

    document.getElementById('table').innerHTML = '';

    document.getElementById('day').innerHTML = currentDay;
    document.getElementById('day-of-week').innerHTML =
        daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()];
    document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;

    let firstDay = new Date(currentYear, currentMonth, 1);
    console.log('firstDay', firstDay);

    let startDayOfWeek = firstDay.getDay();
    console.log('startDayOfWeek', startDayOfWeek);

    let lastDay = new Date(currentYear, currentMonth + 1, 0);
    console.log('lastDay', lastDay);

    let numDays = lastDay.getDate();
    console.log('numDays', numDays);

    let numRows = Math.ceil((numDays + startDayOfWeek) / 7);
    console.log('numRows', numRows);

    let headerRow = document.createElement('tr');
    for (let i = 0; i < daysOfWeek.length; i++) {
        let headerCell = document.createElement('th');
        headerCell.textContent = daysOfWeek[i];
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    let dayCount = 1;
    for (let i = 0; i < numRows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            if (i === 0 && j < startDayOfWeek) {
                cell.textContent = '';
            } else if (dayCount > numDays) {
                cell.textContent = '';
            } else {
                cell.textContent = dayCount;
                if (dayCount === currentDay) {
                    cell.classList.add('current-day');
                }
                dayCount++;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    let cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function () {
            let highlightCell = document.getElementsByClassName('current-day');
            if (highlightCell.length > 0) {
                highlightCell[0].classList.remove('current-day');
            }
            this.classList.add('current-day');
            document.getElementById('day').innerHTML = this.textContent;
            document.getElementById('day-of-week').innerHTML =
                daysOfWeek[new Date(currentYear, currentMonth, this.textContent).getDay()];
            document.getElementById('month-year').innerHTML = `Tháng ${currentMonth + 1} Năm ${currentYear}`;
        });
    }
}
