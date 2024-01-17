import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
	event.preventDefault();
	const delay = Number(document.getElementsByName("delay")[0].value);
	const state = document.querySelector('input[name="state"]:checked').value;

	const promise = new Promise((res, rej) => {
		setTimeout(() => {
			if (state === "fulfilled") {
				res(delay);
			} else {
				rej(delay);
			}
		}, delay);
	});
	promise
		.then(delay => {
			iziToast.success({
				title: "Success",
				message: `✅ Fulfilled promise in ${delay}ms`,
			});
		})
		.catch(delay => {
			iziToast.error({
				title: "Error",
				message: `❌ Rejected promise in ${delay}ms`,
			});
		});
}
