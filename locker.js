/**
 * Polyfill: Only most recent versions of node support flat
 */
if (!Array.prototype.flat) Array.prototype.flat = function () {
	return (function f(arr) {
		return arr.reduce(
			(a, v) =>
				Array.isArray(v)
					? a.concat(f(v))
					: a.concat(v)
			, []
		)
	})(this)
};

// Utility: Fastest way to get a specific digit in an int - https://jsperf.com/fastest-way-to-get-the-first-in-a-number/2
const getDigit = (ntn, number) => {
	return Math.floor((number / Math.pow(10, ntn)) % 10);
}

const checkFractionAvailiability = (num, fractionOfSecondNumber) => num % fractionOfSecondNumber == 0

const loopThroughThousands = (number, fourth) => {
	let start = number * 1000;
	const end = start + 999;
	const candidates = [];

	console.log("Check numbers between ", start, " and ", end)
	for (start; start <= end; start++) {
		if (getDigit(1, start) === fourth) {
			// Candidate is a third of fourth digit
			let first = getDigit(4, start);
			let second = getDigit(3, start);
			let third = getDigit(2, start);
			let fifth = getDigit(0, start);
			candidates.push({
				start,
				first,
				second,
				third,
				fourth,
				fifth
			})
		}
	}
	return candidates
}


/**
 * Use the known rules to heavily cut down our range of possibilities
 * The product of the first 2 numbers must equal 24 so get all corresponding possibilities between 10 and 99
 * The fourth number is a third of the second number
 */
const reduceCandidates = ({ firstTwoDigitProduct, fractionOfSecondNumber, item }) => {
	let first = getDigit(1, item);
	let second = getDigit(0, item);

	let product = first * second;

	if (product === firstTwoDigitProduct && checkFractionAvailiability(second, fractionOfSecondNumber)) {
		let fourth = second / 3;
		return {
			candidate: item,
			first,
			second,
			fourth
		}
	}
}

const getPin = () => {
	/**
	 * For extensibility this rule can be altered, try 30
	 * This list could be extended to customise as much as needed
	 */
	firstTwoDigitProduct = 24;
	fractionOfSecondNumber = 3;

	const initialCandidates = []
	for (let candidate = 99; candidate >= 10; candidate--) {
		initialCandidates.push(candidate)
	}

	const possiblePins = 
		initialCandidates
		.map(item => reduceCandidates({firstTwoDigitProduct, fractionOfSecondNumber, item}))
		.filter(item => typeof item !== 'undefined')
		.map(item => loopThroughThousands(item.candidate, item.fourth))
		.flat()
		.filter(item => ((item.first + item.third) === (item.fourth + item.fifth)) && item)
		.filter(item => ((item.first + item.second + item.third + item.fourth + item.fifth) === 26) && item)
		.map(item => item.start)

	console.log("Possible codes are: ", possiblePins)
}

getPin()