window.addEventListener('DOMContentLoaded', () => {
	const tabParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabContent = document.querySelectorAll('.tabcontent'),
		loader = document.querySelector('.loader');

	// Loader
	setTimeout(() => {
		loader.style.opacity = '0';
		setTimeout(() => {
			loader.style.display = 'none';
		}, 500);
	}, 1000);

	// Tabs
	function hideTabContent() {
		tabContent.forEach((item) => {
			item.classList.add('hide');
		});
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i) {
		tabContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	hideTabContent();
	showTabContent(localStorage.getItem('index') || 0);
	tabParent.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, ind) => {
				if (target === item) {
					localStorage.setItem('index', ind);
					hideTabContent();
					showTabContent(localStorage.getItem('index'));
				}
			});
		}
	});

	// Timer
	const deadline = '2021-11-22';

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	const timerEl = document.querySelector('.timer'),
		daysEl = timerEl.querySelector('#days'),
		hoursEl = timerEl.querySelector('#hours'),
		minutesEl = timerEl.querySelector('#minutes'),
		secondsEl = timerEl.querySelector('#seconds');

	setInterval(() => {
		const timer = Date.parse(deadline) - Date.parse(new Date()),
			days = Math.floor(timer / (1000 * 60 * 60 * 24)),
			hours = Math.floor((timer / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((timer / 1000 / 60) % 60),
			seconds = Math.floor((timer / 1000) % 60);

		daysEl.innerHTML = getZero(days);
		hoursEl.innerHTML = getZero(hours);
		minutesEl.innerHTML = getZero(minutes);
		secondsEl.innerHTML = getZero(seconds);

		if (timer <= 0) {
			clearInterval();

			daysEl.innerHTML = '00';
			hoursEl.innerHTML = '00';
			minutesEl.innerHTML = '00';
			secondsEl.innerHTML = '00';
		}
	}, 1000);
});
