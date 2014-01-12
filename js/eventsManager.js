var EventsManager = function(data) {
	var me = this;

	me.block = data.block;
	me.startTime = data.startTime;
	me.totalTime = 13;
	me.hourHeight = 60;
	me.days = data.days;

	me.init();
};

EventsManager.prototype.init = function() {
	var me = this;

	me.prerender();
};

EventsManager.prototype.prerender = function() {
	var me = this,
		hoursIndicator = '',
		eventsManagerContent;

	for (var i = 0; i < me.totalTime; i++) {
		hoursIndicator += '<div class="hourItem" style="height:' + me.hourHeight + 'px;">' + me.getHourIndicatorContent(me.startTime + i, (i === me.totalTime - 1)) + '</div>';
	}

	me.block.innerHTML = '<div class="eventsManager"><div class="eventsManagerTime">' + hoursIndicator + '</div></div>';

	for (var i = 0; i < me.days.length; i++) {
		eventsManagerContent = document.createElement("div");
		eventsManagerContent.setAttribute("class", "eventsManagerContent");
		eventsManagerContent.innerHTML = '<div class="eventsManagerContentInner" style="height:' + me.hourHeight * (me.totalTime - 1) + 'px;"></div>';

		me.block.querySelector(".eventsManager").appendChild(eventsManagerContent);

		new EventsDay({
			day : me.days[i],
			hourHeight : me.hourHeight,
			block : eventsManagerContent
		});
	}
};

EventsManager.prototype.getHourIndicatorContent = function(hoursCount, isLast) {
	var abbr = 'AM',
		hours = hoursCount,
		partTime = '';

	if (hours > 12) {
		hours -= 12;
		abbr = 'PM';
	}

	if (!isLast) {
		partTime = '<div class="partTime">' + hours + ':30</div>';
	}

	return hours + ':00 <span>' + abbr + '</span>' + partTime;
};