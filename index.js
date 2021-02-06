const container = document.querySelector(".container");
const pageTitle = document.querySelector(".pageTitle");
const count = document.querySelector(".counter");
const options = [
	"cat",
	"shrek",
	"donkey",
	"dragon",
	"fiona",
	"cat",
	"shrek",
	"donkey",
	"dragon",
	"fiona",
];

const mixedOptions = [];

let isFirstClick = true;
let firstElement = "";
let secondElement = "";
let hiddenDelay = 1000;
let canPlay = true;
let counter = 0;
let score = 0;

for (let i = 0; i <= options.length; i++) {
	let idx = Math.floor(Math.random() * options.length);
	mixedOptions.push(options[idx]);
	options.splice(idx, 1);
	i = 0;
}
const win = () => {
	count.innerHTML = `<a href="">
	<img src="photos/again.png">
	</a>`;
	pageTitle.innerHTML = '<img src="photos/logo.png">';
	container.innerHTML = `
	<p class="win">Congratulations!</p>
	<p class="win">You win in ${counter} moves</p>`;
};
const checkTwoElements = function () {
	counter++;
	count.textContent = `Counts: ${counter}`;
	if (firstElement.className !== secondElement.className) {
		console.log("Elements are not the same");
		firstElement.classList.add("hidden");
		secondElement.classList.add("hidden");
	} else {
		firstElement.classList.add("confirmed");
		secondElement.classList.add("confirmed");
		score++;
		score == mixedOptions.length / 2 ? win() : score;
	}
};

const elementHandleClick = function () {
	if (canPlay) {
		if (isFirstClick) {
			if (!this.classList.contains("hidden")) {
				console.log("error");
			} else {
				this.classList.remove("hidden");
				firstElement = this;
				isFirstClick = false;
			}
		} else {
			if (!this.classList.contains("hidden")) {
				console.log("error");
			} else {
				canPlay = false;
				this.classList.remove("hidden");
				secondElement = this;
				isFirstClick = true;
				setTimeout(checkTwoElements, hiddenDelay);
				setTimeout(() => {
					canPlay = true;
				}, hiddenDelay);
			}
		}
	}
};
mixedOptions.forEach((option) => {
	let div = document.createElement("div");
	div.className = `${option} hidden`;
	div.addEventListener("click", elementHandleClick);
	container.appendChild(div);
});
