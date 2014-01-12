var Sys = {};
Sys.isArray = function (vArg) {
	return Object.prototype.toString.call(vArg) === "[object Array]";
};