var Event = function(options) {
	var me = this;

	me.data = options.data;
	me.hourHeight = options.hourHeight;
	me.onComplete = options.onComplete;

	me.init();
};

Event.prototype.init = function() {
	var me = this;

	me.prerender();

	if (typeof me.onComplete === 'function') {
		me.onComplete(me);
	}
};

Event.prototype.prerender = function() {
	var me = this,
		block,
		data = me.data,
		width = 100 / me.data.width,
		title = "Event Item",
		description = "Sample Location";

	block = document.createElement('div');
	block.className = 'eventItem';
	block.innerHTML = '<div class="eventItemInner" style="height:' + (data.end - data.start) * me.hourHeight / 60 + 'px;"><h4>' + title + '</h4><p>' + description + '</p></div>';

	block.setAttribute('title', title + ". " + description);
	block.style.width = width + "%";
	block.style.left = width * data.left + "%";
	block.style.top = data.start * me.hourHeight / 60 + "px";

	me.block = block;
};

Event.prototype.remove = function() {
	var block = this.block;

	block.parentNode.removeChild(block);
};