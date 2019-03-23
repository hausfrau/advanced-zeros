module.exports = function getZerosCount(number, base) {
    const findPrimeNumbers = function (num) {
        const primeMultipliers = [];
        let count = 0;

        for (let i = 2; i <= num; i++) {
            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    count++;
                }
            }

            if (count === 0) {
                primeMultipliers.push(i);
            } else count = 0;
        }

        return primeMultipliers;
    };


    const findPrimeMultipliers = function (num, array) {
        const multipliers = [];

        for (let i = 0; i < array.length; i++) {
            if (base % array[i] === 0) {
                multipliers.push(array[i]);
            }
        }

        return multipliers;
    };

    const findMultipliersEntries = function (num, array) {
        let divisionRest = num;
        const entriesMultipliers = {};

        do {
            divisionRest = array.reduce((n, multiplier) => {
                let temp = 1;

                if (n > 1) {
                    if (n % multiplier === 0) {
                        temp = n / multiplier;
                        entriesMultipliers [multiplier] = entriesMultipliers [multiplier] ? entriesMultipliers [multiplier] + 1 : 1;
                    } else {
                        temp = n;
                    }
                }

                return temp;
            }, divisionRest);
        } while (divisionRest !== 1);

        return entriesMultipliers;
    };

    const findZeros = function (multEntries, num) {
        const zerosCount = [];
        Object.keys(multEntries).forEach((multiplier) => {
                let sum = 0;
                let division = 0;
                let pow = 1;

                do {
                    division = Math.floor(num / Math.pow(Number(multiplier), pow));
                    pow++;
                    sum += division;
                } while (division > 1);

                if (multEntries[multiplier] > 1) {
                    sum = Math.floor(sum / multEntries[multiplier]);
                }
                zerosCount.push(sum);
            }
        );

        return zerosCount;
    };

    const primeNumbers = findPrimeNumbers(base);
    const primeMultipliers = findPrimeMultipliers(base, primeNumbers);
    const multipliersEntries = findMultipliersEntries(base, primeMultipliers); // Object
    const zerosCounts = findZeros(multipliersEntries, number);

    return Math.min(...zerosCounts);
}