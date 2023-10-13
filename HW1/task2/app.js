const chefsMap = new Map([
    ["Виктор", "Пицца"],
    ["Ольга", "Суши"],
    ["Дмитрий", "Десерты"]
]);

const dishesMap = new Map([
    ["Пицца Маргарита", "Виктор"],
    ["Пицца Пепперони", "Виктор"],
    ["Суши Филадельфия", "Ольга"],
    ["Суши Калифорния", "Ольга"],
    ["Тирамису", "Дмитрий"],
    ["Чизкейк", "Дмитрий"]
]);

const ordersMap = new Map();

function makeOrder(clientName, orderedDishes) {
    const clientOrder = new Map();

    for (const dish of orderedDishes) {
        const chef = dishesMap.get(dish);
        if (chef) {
            if (!clientOrder.has(chef)) {
                clientOrder.set(chef, []);
            }
            clientOrder.get(chef).push(dish);
        } else {
            console.log(`Блюдо "${dish}" не найдено.`);
        }
    }

    ordersMap.set(clientName, clientOrder);
}

makeOrder("Алексей", ["Пицца Пепперони", "Тирамису"]);
makeOrder("Мария", ["Суши Калифорния", "Пицца Маргарита"]);
makeOrder("Ирина", ["Чизкейк"]);

const ordersList = document.querySelector(".restaurant__orders-list");

for (const [client, order] of ordersMap) {
    const orderItem = document.createElement("li");
    orderItem.classList.add("restaurant__orders-item");
    let orderText = `${client} заказал:`;

    for (const [chef, dishes] of order) {
        orderText += `\n${chefsMap.get(chef)}: ${dishes.join(", ")}`;
    }

    orderItem.textContent = orderText;
    ordersList.appendChild(orderItem);
}

// Объяснение кода:
// Мы создали три объекта Map(chefsMap, dishesMap, ordersMap),
// которые будут использоваться для хранения информации о поварах, блюдах и заказах.

// Функция makeOrder принимает имя клиента и массив заказанных блюд.
// Она проходит по каждому блюду, определяет, какому повару оно принадлежит,
// и записывает заказ клиента в объект clientOrder.

// Затем мы добавляем информацию о заказе клиента в объект ordersMap,
// используя имя клиента в качестве ключа.

// Далее мы создаем список заказов, используя цикл for...of.
// Для каждого клиента и их заказа мы формируем текст, который отображает имя клиента
// и список заказанных блюд, указывая, какой повар готовит каждое блюдо.

// Наконец, мы создаем элемент списка(<li>) и добавляем информацию о заказе в него,
// после чего этот элемент добавляется в список заказов.

// Этот код создает систему управления заказами в ресторане и отображает информацию о заказах клиентов,
// включая то, какой повар готовит каждое блюдо.
