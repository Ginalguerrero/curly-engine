var currentDay = document.querySelector('#currentDay');

currentDay.innerHTML = moment().format('LLLL');

var allTimes = document.querySelectorAll('.time');
var allSaveBtns = document.querySelectorAll('.save');
var inputBars = document.querySelectorAll('.input-bar');

// apply css
allTimes.forEach((a) => {
	a.classList.add('.hour');
});

allSaveBtns.forEach((s) => {
	s.classList.add('saveBtn');

	s.addEventListener('click', (event) => {
		var btnTime = event.target.id.split('e-')[1];
		var getValue = document.querySelector('#event-' + btnTime).value;

		if (localStorage.getItem('events')) {
			var events = JSON.parse(localStorage.getItem('events'));

			var index = events.findIndex((event) => event.eventHour === btnTime);
			if (index >= 0) {
				events[index].eventText = getValue;
			} else {
				var time = { eventHour: btnTime, eventText: getValue };
				events.push(time);
			}

			localStorage.setItem('events', JSON.stringify(events));
		} else {
			var events = [];
			var time = { eventHour: btnTime, eventText: getValue };
			events.push(time);
			localStorage.setItem('events', JSON.stringify(events));
		}
	});
});

inputBars.forEach((input) => {
	// console.log(input.id);

	var now = moment();
	// console.log(now.hour());

	var timeOfBar = Number(input.id.split('e-')[1]);
	var currentHour = Number(now.hour());

	if (currentHour === timeOfBar) {
		input.classList.add('present');
	} else if (currentHour > timeOfBar) {
		input.classList.add('past');
	} else {
		input.classList.add('future');
	}

	input.addEventListener('click', (e) => {
		var hour = e.target.id.split('e-')[1];
		document.querySelector('#event-' + hour).focus();
	});
});

function loadTimeBlocks() {
	var events = JSON.parse(localStorage.getItem('events'));

	events.forEach((event) => {
		var eventHour = event.eventHour;
		document.querySelector('#event-' + eventHour).value = event.eventText;
	});
}

loadTimeBlocks();
