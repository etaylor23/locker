const run = () => {
    var i = 99;
    while (i >= 10) {
        var firstDigit = mathReverse(1, i);
        var secondDigit = mathReverse(0, i);

        var product = firstDigit * secondDigit;

        if (product === 24) {
            if (checkFourthDigit(secondDigit)) {
                var fourthDigit = secondDigit / 3;
                loopThroughThousands(i, fourthDigit);
            }
        }
        i--;
    }
}


const mathReverse = (ntn, number) => {
    return Math.floor((number / Math.pow(10, ntn)) % 10);
}

const checkFourthDigit = (secondDigit) => {
    if (secondDigit % 3 == 0)
        return true;
}

const loopThroughThousands = (number, fourthDigit) => {
    var startpoint = number * 1000;
    var endPoint = startpoint + 999;

    while (startpoint <= endPoint) {
        if (mathReverse(1, startpoint) === fourthDigit) {
            var firstDigit = mathReverse(4, startpoint);
            var secondDigit = mathReverse(3, startpoint);
            var thirdDigit = mathReverse(2, startpoint);
            var fifthDigit = mathReverse(0, startpoint);
            if ((firstDigit + thirdDigit) === (fourthDigit + fifthDigit)) {
                if ((firstDigit + secondDigit + thirdDigit + fourthDigit + fifthDigit) === 26) {
                    console.log("The code is.." + startpoint);
                    break;
                }
            }
        }
        startpoint++;
    }
}

run()