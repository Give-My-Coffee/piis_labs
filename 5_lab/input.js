document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все элементы с классом 'target'
    const targets = document.querySelectorAll('.target');
    let draggedElement = null; // Переменная для хранения перетаскиваемого элемента
    let isSticky = false; // Проверка, приклеен ли элемент
    let originalPosition = { left: 0, top: 0 }; // Для хранения исходной позиции элемента
  
    // Перебор каждого элемента с классом target
    targets.forEach(target => {
        // Обработчик события mousedown для каждого элемента
        target.addEventListener('mousedown', (e) => {
            if (!isSticky) {
                draggedElement = target; 
                // Сохраняем исходную позицию
                originalPosition.left = target.offsetLeft;
                originalPosition.top = target.offsetTop;
                
                // Возможность вернуть
                draggedElement.style.position = 'absolute'; 
                moveAt(e.pageX, e.pageY); 
            }
        });
  
        //Двойной клик
        target.addEventListener('dblclick', (e) => {
            if (!isSticky) { 
                isSticky = true; 
                draggedElement = target; 
                draggedElement.style.position = 'absolute'; 
                draggedElement.style.backgroundColor = 'pink'; 
                moveAt(e.pageX, e.pageY); 
            } else { 
                isSticky = false; 
                draggedElement.style.backgroundColor = ''; 
                draggedElement = null;
            }
        });
  
        //При отпускании
        target.addEventListener('mouseup', () => {
            if (!isSticky) { 
                draggedElement = null; 
            }
        });
    });
  
    //Для всего документа
    document.addEventListener('mousemove', (e) => {
        if (draggedElement) { 
            moveAt(e.pageX, e.pageY); 
        }
    });
  
    //Для клавиш
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && draggedElement) { 
            // Возвращаем элемент на исходные координаты
            draggedElement.style.left = originalPosition.left + 'px';
            draggedElement.style.top = originalPosition.top + 'px';
  
            // Сбрасываем состояние перетаскивания
            draggedElement.style.backgroundColor = ''; 
            draggedElement = null; 
            isSticky = false; 
        }
    });
  
    // Функция для перемещения элемента
    function moveAt(pageX, pageY) {
        if (draggedElement) { 
            draggedElement.style.left = pageX - draggedElement.offsetWidth / 2 + 'px'; // Устанавливаем левую позицию
            draggedElement.style.top = pageY - draggedElement.offsetHeight / 2 + 'px'; // Устанавливаем верхнюю позицию
        }
    }
  });