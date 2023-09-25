class DatePicker
    {
    constructor(div_id, call_back)
    {
        this.div_id = div_id;
        this.call_back = call_back;
        this.current_date = new Date();
        this.selected_date = null;
    }

    render(date)
    {
        this.current_date = date;
        const divElement = document.getElementById(this.div_id);

        if (!divElement)
        {
            console.error(`Element with id "${this.div_id}" not found.`);
            return;
        }

        divElement.innerHTML = this.generate_datePicker();
        this.addEventListeners();
    }

    generate_datePicker()
    {
        const year = this.current_date.getFullYear();
        const month = this.current_date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const calendarDays = [];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        let html = `<div class="datepicker-header">
                  <span class="prev-month">&lt;</span>
                  <span class="current-month">${months[month]} ${year}</span>
                  <span class="next-month">&gt;</span>
                </div>`;

        html += '<table class="datepicker-table"><thead><tr>';
        const dayAbbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        for (const dayAbbr of dayAbbreviations) {
            html += `<th>${dayAbbr}</th>`;
        }
        html += '</tr></thead><tbody>';

        let dayCounter = 1;
        for (let week = 0; week < 6; week++) {
            html += '<tr>';
            for (let day = 0; day < 7; day++) {
                if ((week === 0 && day < firstDayOfWeek) || dayCounter > daysInMonth) {
                    html += '<td class="disabled-day"></td>';
                } else {
                    html += `<td class="selectable-day">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            html += '</tr>';
        }

        html += '</tbody></table>';

        return html;
    }

    addEventListeners()
    {
        const prevMonthButton = document.querySelector(`#${this.div_id} .prev-month`);
        const nextMonthButton = document.querySelector(`#${this.div_id} .next-month`);
        const selectableDays = document.querySelectorAll(`#${this.div_id} .selectable-day`);

        prevMonthButton.addEventListener('click', () => this.show_previousMonth());
        nextMonthButton.addEventListener('click', () => this.show_nextMonth());

        selectableDays.forEach(day =>
        {
            day.addEventListener('click', () => this.selectDay(parseInt(day.textContent)));
        });
    }

    show_previousMonth()
    {
        this.current_date.setMonth(this.current_date.getMonth() - 1);
        this.render(this.current_date);
    }

    show_nextMonth()
    {
        this.current_date.setMonth(this.current_date.getMonth() + 1);
        this.render(this.current_date);
    }

    selectDay(day)
    {
        const year = this.current_date.getFullYear();
        const month = this.current_date.getMonth();
        this.selected_date = { year, month: month + 1, day };
        if (this.call_back && typeof this.call_back === 'function')
        {
            this.call_back(this.div_id, this.selected_date);
        }
    }
}
