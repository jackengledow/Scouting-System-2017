function Sigma(numbers, enumerator) {
	var sigma = 0.0;

	for(var i = 0; i < numbers.length; i += 1) {
		sigma += enumerator(numbers[i]);
	}

	return sigma;
}

function variance(numbers) {
	return (Sigma(numbers, function(number) {
		return Math.pow(number, 2.0);
	}) / numbers.length) - Math.pow(Sigma(numbers, function(number) {
		return number;
	}) / numbers.length, 2.0);
}


function standardDeviation(numbers) {
	return Math.sqrt(variance(numbers));
}
/* Node.JS testing code * /
   var numbers = [1.0, 2.0, 3.0];

   console.log(numbers);
   console.log(variance(numbers));
   console.log(standardDeviation(numbers)); */
