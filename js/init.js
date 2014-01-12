var calendar = new EventsManager({
	block : document.getElementById("calendar"),
	startTime : 9,
	days : [
		{
			name: "Пн 13.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620} ]
		},
		{
			name: "Вт 14.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 610, end: 670} ]
		},
		{
			name: "Ср 15.01",
			events: [ {start: 560, end: 620}, {start: 610, end: 670} ]
		},
		{
			name: "Чт 16.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]
		},
		{
			name: "Пт 17.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620} ]
		},
		{
			name: "Сб 18.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]
		},
		{
			name: "Нд 19.01",
			events: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]
		}
	]
});