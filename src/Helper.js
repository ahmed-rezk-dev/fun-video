// time convert helper
const time_convert = (num) => {
	var hours = Math.floor(num / 60);
	var minutes = num % 60;
	return hours + ':' + minutes;
};

export default time_convert;