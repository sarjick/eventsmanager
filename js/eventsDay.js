var EventsDay = function(data) {
	var me = this;

	me.block = data.block;
	me.eventsBlock = me.block.querySelector(".eventsManagerContentInner");
	me.events = [];
	me.hourHeight = data.hourHeight;

	me.title = document.createElement("div");
	me.title.setAttribute("class", "dayTitle");
	me.title.innerHTML = data.day.name;
	me.block.insertBefore(me.title, me.eventsBlock);

	me.layOutDay(data.day.events);
};

EventsDay.prototype.layOutDay = function(events) {
	var me = this,
		data = me.filterEvents(events), // validation
		eventsGroups = [],
		eventsGroupsCount = 0,
		i = 0,
		currentGroup = 0, 
		currentLeft = 0,
		currentMaxEnd = 0,
		initEventData = function(event, group, left) {
			event.group = group;
			event.left = left;

			if (!Sys.isArray(eventsGroups[group])) {
				eventsGroups[group] = [];				
			}

			eventsGroups[group].push(event);			
		};

	/* removing all exist events */
	for (i = 0; i < me.events.length; i++) {
		me.events[i].remove();
	}
	me.events = [];
	/* end */

	if (data.length > 0) {

		/* sorting events by start date */
		data.sort(function(a, b){
			if (a.start < b.start) {
				return -1;
			}
			if (a.start > b.start) {
				return 1;
			}
			return 0;
		});
		/* end */

		/* preparing data for groups of events */
		initEventData(data[0], 0, 0);
		for (i = 1; i < data.length; i++) {
			if (currentMaxEnd < data[i - 1].end) {
				currentMaxEnd = data[i - 1].end;
			}

			if (data[i].start < currentMaxEnd) {
				currentGroup = data[i - 1].group;
				currentLeft = data[i - 1].left + 1;
			}
			else {
				currentGroup = data[i - 1].group + 1;
				currentLeft = 0;
			}

			initEventData(data[i], currentGroup, currentLeft);
		}
		eventsGroupsCount = eventsGroups.length;
		/* end */

		/* initializing groups of events with correct position and add events to DOM */
		for (i = 0; i < eventsGroupsCount; i++) {
			me.initEventsGroup(eventsGroups[i]);
		}
		/* end */
	}
};

EventsDay.prototype.filterEvents = function(data) {
	var me = this,
		i = 0,
		currentEvent,
		topLimit = me.hourHeight * (me.totalTime - 1),
		getlimitValue = function(minutes) {
			if (minutes < 0) {
				minutes = 0;
			}
			else if (minutes > topLimit) {
				minutes = topLimit;
			}

			return minutes;
		};

	for (i = 0; i < data.length; i++) {
		currentEvent = data[i];

		currentEvent.start = getlimitValue(currentEvent.start);
		currentEvent.end = getlimitValue(currentEvent.end);

		if (currentEvent.start >= currentEvent.end) {
			currentEvent.end = currentEvent.start + 10; // add event anyway with at least 10 minutes duration
		}
	}

	return data;
};

EventsDay.prototype.initEventsGroup = function(group) {
	var me = this,
		i = 0, j = 0,
		width = group.length,
		currentEvent,
		maxLeft = 0,
		positionChanged = false,
		isPlaceFree = function(event, group, num) {
			var left = group[num].left,
				placeFree = true,
				i;

			for (i = 0; i < group.length; i++) {
				if (group[i].left === left && event.start < group[i].end) {
					placeFree = false;
					break;
				}
			}

			return placeFree;
		};

	/* placing events on position, that more close to left in case, if free place exist */
	for (i = 2; i < group.length; i++) {
		currentEvent = group[i];
		positionChanged = false;
		maxLeft = 0;

		for (j = 0; j < i; j++) {
			if (!positionChanged && currentEvent.start >= group[j].end && isPlaceFree(currentEvent, group, j)) {
				currentEvent.left = group[j].left;
				width--;
				positionChanged = true;
			}
			else if (group[j].left > maxLeft){
				maxLeft = group[j].left;
			}
		}

		if (!positionChanged && currentEvent.left > maxLeft + 1) {
			currentEvent.left = maxLeft + 1;
		}
	}
	/* end */

	for (i = 0; i < group.length; i++) {
		group[i].width = width;

		me.events.push(new Event({
			data : group[i],
			hourHeight : me.hourHeight,
			onComplete : function(event) {
				me.addEvent(event);
			}
		}));
	}
};

EventsDay.prototype.addEvent = function(event) {
	var me = this;

	me.eventsBlock.appendChild(event.block);
};