const musicCollection = {
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            next: () => {
                if (index < this.albums.length) {
                    const album = this.albums[index];
                    index++;
                    return { value: album, done: false };
                } else {
                    return { done: true };
                }
            },
        };
    },
    albums: [
        {
            title: "Альбом 1",
            artist: "Исполнитель 1",
            year: "2020"
        },
        {
            title: "Альбом 2",
            artist: "Исполнитель 2",
            year: "2018"
        },
        {
            title: "Альбом 3",
            artist: "Исполнитель 3",
            year: "2015"
        }
    ]
};

const musicList = document.querySelector(".music-collection__list");

for (const album of musicCollection) {
    const albumElement = document.createElement("li");
    albumElement.classList.add("music-collection__album");
    albumElement.textContent = `${album.title} - ${album.artist} (${album.year})`;
    musicList.appendChild(albumElement);
}

// Создаем объект musicCollection, который представляет музыкальную коллекцию.
// Внутри этого объекта мы определяем метод[Symbol.iterator], который возвращает кастомный итератор.

// Кастомный итератор содержит next метод, который будет вызываться при каждой итерации.
// Он возвращает объект, содержащий value(значение альбома) и done(флаг, указывающий, закончена ли итерация).

// Далее определяем массив albums, в котором хранятся альбомы, каждый из которых имеет поля title, artist и year.

// Затем выбираем элемент списка(musicList), где будем выводить информацию об альбомах.

// Затемиспользуем цикл for...of для итерации по объекту musicCollection.
// На каждой итерации создаем новый элемент списка(li), добавляем ему класс music - collection__album,
// и устанавливаем текст в формате "Название альбома - Исполнитель (Год выпуска)".
// Затем этот элемент списка добавляется в список.

// В результате выполнения этого кода на веб - странице будет отображена музыкальная коллекция,
// перебранная итератором, и каждый альбом будет отображен в формате
// "Название альбома - Исполнитель (Год выпуска)".
