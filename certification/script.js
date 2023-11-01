
// Функция для получения случайного изображения с Unsplash
async function getRandomImage() {
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=INSERT_HERE_YOUR_API_KEY');
    const data = await response.json();

    return data;
}


// Функция для обновления информации о фотографии на странице
function updatePhotoInfo(photoData) {
    const imageElement = document.getElementById('image');
    const photographerElement = document.getElementById('photographer');
    const likeButton = document.getElementById('likeButton');
    const likeCountElement = document.getElementById('likeCount');

    imageElement.src = photoData.urls.regular;
    photographerElement.textContent = `Photographer: ${photoData.user.name}`;
    likeButton.dataset.photoId = photoData.id;
    likeCountElement.textContent = getLikeCount(photoData.id);
}

// Функция для сохранения количества лайков в локальное хранилище
function updateLikeCount(photoId, count) {
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    likeCounts[photoId] = count;
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

// Функция для получения счетчика лайков для фотографии
function getLikeCount(photoId) {
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    return likeCounts[photoId] || 0;
}

// Функция для увеличения счетчика лайков
function increaseLikeCount() {
    const likeButton = document.getElementById('likeButton');
    const photoId = likeButton.dataset.photoId;
    const likeCount = getLikeCount(photoId) + 1;

    updateLikeCount(photoId, likeCount);
    document.getElementById('likeCount').textContent = likeCount;
}

// Функция для добавления фотографии в историю просмотров
function addToHistory(photoData) {
    let history = JSON.parse(localStorage.getItem('viewedHistory')) || [];
    history.unshift(photoData);

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem('viewedHistory', JSON.stringify(history));
}

// Функция для отображения истории просмотров
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('viewedHistory')) || [];

    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    for (const photo of history) {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <img class="history-image" src="${photo.urls.thumb}" alt="Unsplash Photo">
            <p class="history-photographer">Photographer: ${photo.user.name}</p>
        `;
        historyContainer.appendChild(historyItem);
    }
}

// Обработчик для кнопки "Лайк"
document.getElementById('likeButton').addEventListener('click', increaseLikeCount);

// Обработчик для кнопки "Следующее изображение"
document.getElementById('nextButton').addEventListener('click', async () => {
    const photoData = await getRandomImage();
    updatePhotoInfo(photoData);
    addToHistory(photoData);
});

// Обработчик для кнопки "Показать историю"
document.getElementById('showHistoryButton').addEventListener('click', () => {
    displayHistory();
});

// Вызываем функции при загрузке страницы
updateLikeCount();
displayHistory();

// Загружаем первое случайное изображение при инициализации
getRandomImage()
    .then((photoData) => {
        updatePhotoInfo(photoData);
        addToHistory(photoData);
    })
    .catch((error) => {
        console.error('Error loading image:', error);
    });

    // Обработчик для кнопки "Показать/Скрыть историю"
const showHistoryButton = document.getElementById('showHistoryButton');
const historyContainer = document.getElementById('historyContainer');

showHistoryButton.addEventListener('click', () => {
    if (historyContainer.style.display === 'none' || historyContainer.style.display === '') {
        historyContainer.style.display = 'block';
        showHistoryButton.textContent = 'Скрыть историю';
    } else {
        historyContainer.style.display = 'none';
        showHistoryButton.textContent = 'Показать историю';
    }
});

// Функция для отображения истории просмотров
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('viewedHistory')) || [];

    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    for (const photo of history) {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <img class="history-image" src="${photo.urls.thumb}" alt="Unsplash Photo">
            <p class="history-photographer">Photographer: ${photo.user.name}</p>
            <p class="history-likes">Likes: ${getLikeCount(photo.id)}</p>
        `;
        historyContainer.appendChild(historyItem);
    }
}

// Функция для скрытия истории просмотров при загрузке страницы
function hideHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.style.display = 'none';
}

// Вызываем функцию скрытия истории при загрузке страницы
hideHistory();