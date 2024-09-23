//объект
const personalMovieDB = {
    privat: false,  //является ли бд приватной true или открытой false
    movies: {       
        "Дэдпул": 4,  
        "Граф Монте-Кристо": 3,  
        "Один дома": 5   
    }
};

// Функция для вывода объекта movies в виде таблицы
function displayMovies() { 
   
        const table = document.createElement('table'); //элемент таблицы
        table.style.borderCollapse = 'collapse'; //границы ячеек будут сливаться
        
        const headerRow = document.createElement('tr'); //строка для заголовков таблицы
        const headerMovie = document.createElement('th');
        const headerRating = document.createElement('th');
        
        headerMovie.innerText = 'Название фильма';
        headerRating.innerText = 'Оценка'; 
        
        headerMovie.style.border = '2px solid black'; //стиль границы для заголовка 
        headerRating.style.border = '2px solid black'; 
        
        headerRow.appendChild(headerMovie); // Добавляем заголовок 'Название фильма' в строку заголовков
        headerRow.appendChild(headerRating); 
        table.appendChild(headerRow); // Добавляем строку заголовков в таблицу

        // Проходим по всем фильмам в объекте movies
        for (let movie in personalMovieDB.movies) { 
            const row = document.createElement('tr'); // Строки
            const cellMovie = document.createElement('td'); // Ячейки
            const cellRating = document.createElement('td'); 
            
            cellMovie.innerText = movie; // Текст ячейки с названием 
            cellRating.innerText = personalMovieDB.movies[movie]; 
            
            cellMovie.style.border = '1px solid black'; 
            cellRating.style.border = '1px solid black'; 
            
            row.appendChild(cellMovie); // Добавляем ячейку в строку.
            row.appendChild(cellRating); 
            table.appendChild(row); // Добавляем строку с данными о фильме в таблицу.
        }

        document.getElementById('movies-table').appendChild(table); //Добавляем таблицу в элемент с id 'movies-table'
    
}

 if (!personalMovieDB.privat) { 
displayMovies()}; 