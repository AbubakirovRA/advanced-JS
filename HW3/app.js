// Функция для добавления отзыва
function addReview() {
    return new Promise((resolve, reject) => {
        const productName = document.getElementById('product-name').value;
        const reviewText = document.getElementById('review-text').value;

        if (productName && reviewText) {
            const review = {
                product: productName,
                text: reviewText
            };

            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            resolve('Отзыв успешно добавлен');
        } else {
            reject('Заполните все поля формы');
        }
    });
}

// Функция для удаления отзыва
function deleteReview(index) {
    return new Promise((resolve, reject) => {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        if (index >= 0 && index < reviews.length) {
            reviews.splice(index, 1);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            resolve('Отзыв успешно удален');
        } else {
            reject('Некорректный индекс отзыва');
        }
    });
}

// Функция для обновления списка продуктов
function updateProductList() {
    const productList = document.querySelector('.review-list__products');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    productList.innerHTML = '';

    reviews.forEach((review, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('review-list__product');
        listItem.innerHTML = `
            <span class="product-name">${review.product}</span>
            <button class="review-list__details-button" data-product="${review.product}">Подробнее</button>
        `;
        productList.appendChild(listItem);
    });
}

// Обработчик события клика по кнопке "Добавить отзыв"
document.getElementById('add-review').addEventListener('click', () => {
    addReview()
        .then((message) => {
            alert(message);
            // Очищаем поля ввода
            document.getElementById('product-name').value = '';
            document.getElementById('review-text').value = '';
            updateProductList();
        })
        .catch((error) => {
            alert(error);
        });
});

// Обработчик события клика по кнопке "Подробнее"
document.querySelector('.review-list__products').addEventListener('click', (e) => {
    if (e.target.classList.contains('review-list__details-button')) {
        const productName = e.target.getAttribute('data-product');
        showReviewsByProduct(productName);
    }
});

// Обработчик события клика по кнопке "Удалить"
document.querySelector('.review-details__list').addEventListener('click', (e) => {
    if (e.target.classList.contains('review-details__delete-button')) {
        const index = e.target.getAttribute('data-index');
        deleteReview(index)
            .then((message) => {
                alert(message);
                const productName = document.getElementById('selected-product-name').textContent;
                showReviewsByProduct(productName);
            })
            .catch((error) => {
                alert(error);
            });
    }
});

// Функция для отображения отзывов по выбранному продукту
function showReviewsByProduct(productName) {
    const selectedProductName = document.getElementById('selected-product-name');
    selectedProductName.textContent = productName;

    const reviewList = document.querySelector('.review-details__list');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviewList.innerHTML = '';

    reviews.forEach((review, index) => {
        if (review.product === productName) {
            const listItem = document.createElement('li');
            listItem.classList.add('review-details__item');
            listItem.innerHTML = review.text;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('review-details__delete-button');
            deleteButton.textContent = 'Удалить';
            deleteButton.setAttribute('data-index', index);
            listItem.appendChild(deleteButton);
            reviewList.appendChild(listItem);
        }
    });
}

// Инициализация страницы
updateProductList();

// Функция addReview():

// Эта функция отвечает за добавление нового отзыва о продукте.
// Она возвращает промис, что позволяет обрабатывать результат асинхронных операций.
// Внутри функции:
// Получаем данные из полей ввода на веб - странице: название продукта(productName) и текст отзыва(reviewText).
// Проверяем, что оба поля заполнены.
// Если нет, промис отклоняется с сообщением "Заполните все поля формы".
// Если оба поля заполнены, создаем объект review, который содержит название продукта и текст отзыва.
// Затем мы извлекаем существующие отзывы из LocalStorage или создаем пустой массив, если нет предыдущих отзывов.
// Добавляем новый отзыв в массив отзывов.
// Сохраняем обновленный массив отзывов в LocalStorage.
// Промис разрешается с сообщением "Отзыв успешно добавлен".

// Функция deleteReview(index):

// Эта функция отвечает за удаление отзыва о продукте.
// Она также возвращает промис для асинхронной обработки результатов операции.
// Внутри функции:
// Извлекаем существующие отзывы из LocalStorage или создаем пустой массив, если нет предыдущих отзывов.
// Проверяем, что индекс, по которому нужно удалить отзыв, находится в допустимых пределах массива.
// Если индекс валиден, удаляем отзыв из массива по индексу.
// Сохраняем обновленный массив отзывов в LocalStorage.
// Промис разрешается с сообщением "Отзыв успешно удален".

// Функция updateProductList():

// Эта функция обновляет список продуктов на веб - странице.
// Она извлекает отзывы из LocalStorage и создает элементы списка продуктов с кнопками "Подробнее" для каждого продукта.

// Обработчики событий:

// Здесь определены обработчики событий для кнопок "Добавить отзыв", "Подробнее" и "Удалить".
// При нажатии на кнопку "Добавить отзыв", вызывается функция addReview(),
// и результат обработки промиса выводится в виде сообщения пользователю.
// Поля ввода также очищаются, и список продуктов обновляется с помощью updateProductList().
// При нажатии на кнопку "Подробнее", вызывается функция showReviewsByProduct(), которая отображает отзывы по выбранному продукту.
// При нажатии на кнопку "Удалить", вызывается функция deleteReview(), и результат обработки промиса выводится пользователю.
// Затем список отзывов обновляется для выбранного продукта.
// Этот код современный и использует промисы для асинхронной обработки операций, таких как добавление и удаление отзывов.
// Он обеспечивает интерактивность веб - страницы, позволяя пользователям добавлять, просматривать и удалять отзывы о продуктах.

