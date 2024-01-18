import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

const startButton = document.querySelector("[data-start]");
const input = document.getElementById("datetime-picker");
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		userSelectedDate = selectedDates[0];
		validateSelectedDate();
	},
};
const datePicker = flatpickr("#datetime-picker", options);

function validateSelectedDate() {
	const currentDate = new Date();
	if (userSelectedDate <= currentDate) {
		iziToast.warning({
			title: "Caution",
			message: "Please choose a date in the future",
		});
		startButton.disabled = true;
	} else {
		startButton.disabled = false;
	}
}

function startTimer() {
	const timerInterval = setInterval(updateTimer, 1000);
	function updateTimer() {
		const currentDateTime = new Date();
		const timeDifference = userSelectedDate - currentDateTime;
		startButton.disabled = true;
		input.disabled = true;
		if (timeDifference <= 0) {
			clearInterval(timerInterval);
			return;
		}

		const { days, hours, minutes, seconds } = convertMs(timeDifference);
		document.querySelector("[data-days]").textContent = addLeadingZero(days);
		document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
		document.querySelector("[data-minutes]").textContent =
			addLeadingZero(minutes);
		document.querySelector("[data-seconds]").textContent =
			addLeadingZero(seconds);
	}
}

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
	return value.toString().padStart(2, "0");
}
startButton.addEventListener("click", startTimer);
