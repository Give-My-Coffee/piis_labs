const shirts = [{
    "name": "Beep Boop",
    "description": "Once upon a time, a mighty guide guarded the intersection of Forbes and Morewood, and would dutifully direct distracted college students when it was safe to cross the street. Its voice was soothing, strong, and steady. Its name was beep boop.",
    "price": "$19.99",
    "colors": {
        "white": {
            "front": "shirt_images/beepboop-white-front.png",
            "back": "shirt_images/beepboop-white-back.png"
        },
        "blue": {
            "front": "shirt_images/beepboop-blue-front.png",
            "back": "shirt_images/beepboop-blue-back.png"
        },
        "pink": {
            "front": "shirt_images/beepboop-pink-front.png",
            "back": "shirt_images/beepboop-pink-back.png"
        },
        "red": {
            "front": "shirt_images/beepboop-red-front.png",
            "back": "shirt_images/beepboop-red-back.png"
        }
    },
    "default": {
        "front": "shirt_images/default-m-front.png",
        "back": "shirt_images/default-m-back.png"
    }
},
{
    "name": "Car",
    "description": "As you move in to campus, one of the first memories so many students have is driving up to their dorm, unloading their bags, and moving in. How do they arrive to campus? By car, of course!",
    "price": "$10.99",
    "colors": {
        "white": {
            "front": "shirt_images/car-white-front.png",
            "back": "shirt_images/car-white-back.png"
        },
        "blue": {
            "front": "shirt_images/car-blue-front.png",
            "back": "shirt_images/car-blue-back.png"
        },
        "green": {
            "front": "shirt_images/car-green-front.png",
            "back": "shirt_images/car-green-back.png"
        },
        "yellow": {
            "front": "shirt_images/car-yellow-front.png",
            "back": "shirt_images/car-yellow-back.png"
        },
        "red": {
            "front": "shirt_images/car-red-front.png",
            "back": "shirt_images/car-red-back.png"
        }
    },
    "default": {
        "front": "shirt_images/default-w-front.png",
        "back": "shirt_images/default-w-back.png"
    }
},
{
    "name": "Forever Plaid",
    "price": "$13.99",
    "description": "Proudly wear your tartan plaid as a patch on your front shirt pocket. And on the back, ask the important question that all CMU students should know the answer to: got plaid?",
    "colors": {
        "white": {
            "front": "shirt_images/plaid-white-front.png",
            "back": "shirt_images/plaid-white-back.png"
        },
        "pink": {
            "front": "shirt_images/plaid-pink-front.png",
            "back": "shirt_images/plaid-pink-back.png"
        }
    },
    "default": {
        "front": "shirt_images/default-w-front.png",
        "back": "shirt_images/default-w-back.png"
    }
},
{
    "name": "BSUIR",
    "description": "BSUIR mission is to train engineers and scientists capable of generating and implementing innovative ideas, creating competitive high technology products in the spheres of computer science and electronics.",
    "price": "$6.99",
    "colors": {
        "white": {
            "front": "shirt_images/bsuir-white-front.png",
            "back": "shirt_images/bsuir-white-back.png"
        }
    },
    "default": {
        "front": "shirt_images/default-m-front.png",
        "back": "shirt_images/default-m-back.png"
    }
}];

// Ждем загрузки перед выполнением кода
document.addEventListener('DOMContentLoaded', () => {
    // Получаем контейнер для отображения инфы о футболке
    const detailsContainer = document.getElementById('details-container');
    // Получаем индекс выбранной футболки
    const selectedShirtIndex = localStorage.getItem('selectedShirt');
    // Получаем данные о выбранной футболке из массива shirts
    const selectedShirt = shirts[selectedShirtIndex];
    // Переменная для хранения текущего выбранного цвета
    let currentColor = 'white';
    // Переменная для хранения текущей стороны
    let currentSide = 'front';

    // Проверяем, есть ли выбранная футболке
    if (selectedShirt) {
        // запоняем контейнер инфой о футболке
        detailsContainer.innerHTML = `
            <div>
                <h2>${selectedShirt.name}</h2>
                <img id="shirt-image" src="${selectedShirt.colors[currentColor][currentSide]}" alt="${selectedShirt.name}">
                <p>Price: ${selectedShirt.price}</p>
                <p>${selectedShirt.description}</p>
                <div>
                    <button id="front-button">Front</button>
                    <button id="back-button">Back</button>
                </div>
                <div id="color-buttons"></div>
            </div>
        `;

        // Получаем контейнер для кнопок цвета
        const colorButtonsContainer = document.getElementById('color-buttons');
        // Кнопки для каждого цвета футболки
        Object.keys(selectedShirt.colors).forEach(color => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.textContent = color;
            button.onclick = () => changeColor(color);
            colorButtonsContainer.appendChild(button);
        });

        // Обработчики событий для кнопок стороны
        document.getElementById('front-button').addEventListener('click', showFront);
        document.getElementById('back-button').addEventListener('click', showBack);
    } else {
        // Если футболка не выбрана
        detailsContainer.innerHTML = '<p>No shirt selected.</p>';
    }

    // Отображения передней стороны
    function showFront() {
        currentSide = 'front';
        const selectedShirt = shirts[selectedShirtIndex];
        document.getElementById('shirt-image').src = selectedShirt.colors[currentColor][currentSide];
    }

    // Отображения задней стороны
    function showBack() {
        currentSide = 'back';
        const selectedShirt = shirts[selectedShirtIndex];
        document.getElementById('shirt-image').src = selectedShirt.colors[currentColor][currentSide];
    }

    // Функция для изменения цвета
    function changeColor(color) {
        currentColor = color;
        const selectedShirt = shirts[selectedShirtIndex];
        document.getElementById('shirt-image').src = selectedShirt.colors[currentColor][currentSide];
    }
});