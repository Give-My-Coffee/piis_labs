document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target'); // Выбираем все элементы с классом 'target'
    let draggedElement = null; // Переменная для хранения перетаскиваемого элемента
    let isSticky = false; // Проверка, приклеен ли элемент
    let originalPosition = { left: 0, top: 0 }; // Для хранения исходной позиции элемента
  
    targets.forEach(target => {
        // Обработчик события mousedown для каждого элемента
        target.addEventListener('mousedown', (e) => {
            if (!isSticky) {
                startDrag(target, e.pageX, e.pageY); // Перетаскивание элемента
            }
        });
  
        //  ДвойноЙ клик
        target.addEventListener('dblclick', (e) => {
            toggleSticky(target, e.pageX, e.pageY); // Приклеевание
        });
  
        // Добавляем обработчик события mouseup
        target.addEventListener('mouseup', () => {
            if (!isSticky) {
                draggedElement = null; // Завершаем перетаскивание элемента
            }
        });
  
        // Добавляем обработчики сенсора
        target.addEventListener('touchstart', (e) => {
            if (!isSticky) {
                const touch = e.touches[0];
                startDrag(target, touch.pageX, touch.pageY); // Перетаскивание элемента при касании
            } else {
                const touch = e.touches[0];
                moveAt(touch.pageX, touch.pageY); // Перемещаем элемент при касании при преклевании
            }
        });
  
        target.addEventListener('touchend', (e) => {
            if (!isSticky) {
                draggedElement = null; // Завершаем перетаскивание элемента при окончании касания
            }
        });
  
        target.addEventListener('touchmove', (e) => {
            if (draggedElement) {
                const touch = e.touches[0]; // Первый элемент из всех к которым мы коснулись
                moveAt(touch.pageX, touch.pageY); // Перемещаем элемент при движении пальца
            }
        });
    });
  
    // Обработчик события mousemove для перемещения элемента
    document.addEventListener('mousemove', (e) => {
        if (draggedElement) {
            moveAt(e.pageX, e.pageY);
        }
    });
  
    // Обработчик события keydown для отмены перетаскивания при нажатии клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && draggedElement) {
            resetDrag(); // Сбрасываем состояние перетаскивания
        }
    });
  
    // Отмена перетаскивания при касании вторым пальцем
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1 && draggedElement) {
            resetDrag(); // Сбрасываем состояние перетаскивания
        }
    });
  
    // Функция для начала перетаскивания элемента
    function startDrag(target, pageX, pageY) {
        draggedElement = target;
        originalPosition.left = target.offsetLeft;
        originalPosition.top = target.offsetTop;
        draggedElement.style.position = 'absolute';
        moveAt(pageX, pageY);
    }
  
    // Функция для переключения режима приклеивания
    function toggleSticky(target, pageX, pageY) {
        if (!isSticky) {
            isSticky = true;
            draggedElement = target;
            draggedElement.style.position = 'absolute';
            draggedElement.style.backgroundColor = 'pink';
            moveAt(pageX, pageY);
        } else {
            isSticky = false;
            draggedElement.style.backgroundColor = '';
            draggedElement = null;
        }
    }
  
    // Функция для перемещения элемента к указанной позиции
    function moveAt(pageX, pageY) {
        if (draggedElement) {
            draggedElement.style.left = pageX - draggedElement.offsetWidth / 2 + 'px';
            draggedElement.style.top = pageY - draggedElement.offsetHeight / 2 + 'px';
        }
    }
  
    // Функция для сброса состояния перетаскивания
    function resetDrag() {
        draggedElement.style.left = originalPosition.left + 'px';
        draggedElement.style.top = originalPosition.top + 'px';
        draggedElement.style.backgroundColor = '';
        draggedElement = null;
        isSticky = false;
    }
  });