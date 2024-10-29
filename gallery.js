let images = [];
let currentIndex = 0;

const gallery = document.getElementById("photo");
const modal = document.getElementById("modal-gallery");
const modalImage = document.getElementById("modal-image");
const closeButton = document.getElementById("modal-close");
const modalControls = document.getElementById("modal-controls");
const prevButton = document.getElementById("prevImg");
const nextButton = document.getElementById("nextImg");

fetch("get_images.php")
	.then((response) => response.json())
	.then((data) => {
		images = data;
		let limit = 8;
		const pathname = window.location.pathname;

		if (pathname === "/" || pathname === "/index.html")
			limit = images.length > 8 ? 8 : images.length;
		else limit = images.length;

		// Динамическое создание галереи
		images.forEach((src, index) => {
			if (index >= limit) return;

			const img = document.createElement("img");
			img.src = src;
			img.alt = src;
			img.classList.add("photo-img");
			img.addEventListener("click", () => {
				currentIndex = index;
				showImage(src);
			});
			gallery.appendChild(img);
		});
	})
	.catch((error) => console.error("Error:", error));

// Функция отображения изображения
function showImage(src) {
	modalImage.style.opacity = 0; // Начинаем с затухания
	setTimeout(() => {
		modalImage.src = src;
		modal.showModal();
		modalImage.style.opacity = 1; // Потом показываем изображение
		document.body.classList.add("no-scroll");
		modalControls.style.display = "flex";
		closeButton.style.display = "flex";
	}, 300); // Задержка на время затухания
}

// Закрыть модальное окно
closeButton.addEventListener("click", () => {
	closeModal();
});

//закрыть модальное окно нажатием esc
window.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		if (modal.open) closeModal();
	}
});

//акрывает модальное окно
function closeModal() {
	modal.close();
	document.body.classList.remove("no-scroll");
	modalControls.style.display = "none";
	closeButton.style.display = "none";
	modalImage.src = "";
	currentIndex = 0;
}

// Переход к предыдущему изображению
prevButton.addEventListener("click", () => {
	currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1; // Циклический переход
	showImage(images[currentIndex]);
});

// Переход к следующему изображению
nextButton.addEventListener("click", () => {
	currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1; // Циклический переход
	showImage(images[currentIndex]);
});