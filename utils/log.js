const colors = [
	{ name: 'cyan', value: '\x1b[36m' },
	{ name: 'yellow', value: '\x1b[33m' },
	{ name: 'red', value: '\x1b[31m' },
	{ name: 'green', value: '\x1b[32m' },
	{ name: 'magenta', value: '\x1b[35m' },
];
const resetColor = '\x1b[0m';

const prefix = () => {
	const randIdx = Math.floor(Math.random() * colors.length) % colors.length;
	const color = colors[randIdx];
	return `${color.value}[${process.env.NODE_ENV}]${resetColor}`;
};

/* eslint-disable */
exports.log =  (...arg) => {
  
  console.log(prefix(), ...arg);
};

exports.consoleError = (alt, error) => {
	if (typeof e === 'string') return e;

	let msg = [];
	if (error) {
		if (error.text) msg.push(error.text.toString());
		if (error.message) msg.push(error.message.toString());
		if (error.resultMsg) msg.push(error.resultMsg.toString());
		if (error.errorMessage) msg.push(error.errorMessage.toString());
		if (error.errMsg) msg.push(error.errMsg.toString());
	}

	if (msg.length > 0) return msg.join('\n');

	// return alt || '';
	console.error(prefix(), alt, msg);
};

/* eslint-enable */

// export default log;
