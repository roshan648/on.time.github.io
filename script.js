document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    const noteButton = document.querySelector('.note');
    const scheduleButton = document.querySelector('.schedule');
    const todosContainer = document.querySelector('.todos');
    const calendarContainer = document.querySelector('.calendar');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');


    let currentMonthElement = document.querySelector('.current-month');
    let calendarDaysElement = document.querySelector('.calendar-days');
    let today = new Date();
    let date = new Date();

   
    function renderCalendar() {
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const totalMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        calendarDaysElement.innerHTML = "";

        let totalCalendarDay = 6 * 7;

        for (let i = 0; i < totalCalendarDay; i++) {
            let day = i - startWeekDay + 1;

            if (i < startWeekDay || day > totalMonthDay) {
               
                calendarDaysElement.innerHTML += `<div class="padding-day"></div>`;
            } else {
              
                let dayClass = date.getDate() === day && date.getMonth() === today.getMonth() ? 'current-day' : 'month-day';
                calendarDaysElement.innerHTML += `<div class="${dayClass}">${day}</div>`;
            }
        }
    }


    currentMonthElement.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
    today.setHours(0, 0, 0, 0);
    renderCalendar();

   
    document.querySelectorAll(".month-btn").forEach(function (element) {
        element.addEventListener("click", function () {
            date.setMonth(date.getMonth() + (element.classList.contains("prev") ? -1 : 1));
            currentMonthElement.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
            renderCalendar();
        });
    });

    document.querySelectorAll(".btn").forEach(function (element) {
        element.addEventListener("click", function () {
            let btnClass = element.classList;
            if (btnClass.contains("today"))
                date = new Date();
            else if (btnClass.contains("prev-year"))
                date = new Date(date.getFullYear() - 1, 0, 1);
            else
                date = new Date(date.getFullYear() + 1, 0, 1);

            currentMonthElement.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
            renderCalendar();
        });
    });

  
    noteButton.addEventListener('click', function () {
        todosContainer.style.display = 'block'; 
        calendarContainer.style.display = 'none'; 
    });

    scheduleButton.addEventListener('click', function () {
        todosContainer.style.display = 'none'; 
        calendarContainer.style.display = 'block';
    });

    plusButton.addEventListener('click', function () {
        todoInput.classList.toggle('show'); 
        todoInput.focus(); 
    });

    todoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const todoText = todoInput.value.trim();
            if (todoText !== '') {
                const todoItem = document.createElement('li');
                const currentDate = new Date().toLocaleDateString();
                todoItem.innerHTML = `<span class="todo-date">${currentDate}</span>
                                      <span class="todo-text">${todoText}</span>
                                      <input type="checkbox" class="todo-checkbox">`;
                todoList.appendChild(todoItem);
                todoInput.value = ''; 
                todoInput.classList.remove('show'); 
            }
        }
    });

   
    todoList.addEventListener('change', (e) => {
        if (e.target.classList.contains("todo-checkbox")) {
            const listItem = e.target.closest("li");
            const todoText = listItem.querySelector(".todo-text");
            if (e.target.checked) {
                todoText.style.textDecoration = "line-through";
            } else {
                todoText.style.textDecoration = "none";
            }
        }
    });

    function filterTodos() {
        const filterText = searchInput.value.toLowerCase();
        const todoItems = todoList.querySelectorAll('li');
        todoItems.forEach(item => {
            const text = item.querySelector('.todo-text').textContent.toLowerCase();
            const date = item.querySelector('.todo-date').textContent.toLowerCase();
            if (text.includes(filterText) || date.includes(filterText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

 
    searchButton.addEventListener('click', filterTodos);
    searchInput.addEventListener('input', filterTodos);
});
