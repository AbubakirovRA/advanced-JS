const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const reviewsContainer = document.getElementById("reviewsContainer");
const productInput = document.getElementById("productInput");
const reviewInput = document.getElementById("reviewInput");
const submitReview = document.getElementById("submitReview");

// Function to add a new review to the container
function addReviewToContainer(product, text) {
    const newReviewElement = document.createElement("div");
    newReviewElement.className = "reviews__review";
    newReviewElement.innerHTML = `<strong>${product}:</strong> ${text}`;
    reviewsContainer.appendChild(newReviewElement);
}

// Function to load initial reviews from initialData
function loadInitialReviews() {
    initialData.forEach((item) => {
        const { product, reviews } = item;
        reviews.forEach((review) => {
            addReviewToContainer(product, review.text);
        });
    });
}

loadInitialReviews();

// Function to add a new review
function addReview() {
    const reviewText = reviewInput.value;
    const productName = productInput.value;

    if (productName.trim() === "" || reviewText.length < 50 || reviewText.length > 500) {
        alert("Введите название продукта и отзыв (от 50 до 500 символов).");
        return;
    }

    addReviewToContainer(productName, reviewText);

    // Reset the input fields
    productInput.value = "";
    reviewInput.value = "";
}

submitReview.addEventListener("click", addReview);
