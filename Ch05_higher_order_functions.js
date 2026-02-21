/*
Flattening
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has
all the elements of the original arrays.
 */

// Variant 1:
function flattenArr1(arr) {
    return arr.reduce((arr1, arr2) => arr1.concat(arr2), []);
}

// Variant 2:
const flattenArr2 = arr => arr.reduce((arr1, arr2) => arr1.concat(arr2), []);


/*
Your own loop
Write a higher-order function loop that provides something like a for loop statement. It should take a value, a test
function, an update function, and a body function. Each iteration, it should first run the test function on the current
loop value and stop if that returns false. It should then call the body function, giving it the current value, and
finally call the update function to create a new value and start over from the beginning.
When defining the function, you can use a regular loop to do the actual looping.
 */

function loop(value, test, update, body) {
    for (let current = value; test(current); current = update(current)) {
        body(current);
    }
}


/*
Everything
Arrays also have an 'every' method analogous to the 'some' method. This method returns true when the given function returns
true for every element in the array. In a way, 'some' is a version of the || operator that acts on arrays, and 'every' is
like the && operator.
Implement 'every' as a function that takes an array and a predicate function as parameters. Write two versions, one using
a loop and one using the 'some' method.
 */

// Solution using a loop:
function everyLoop(array, predicate) {
    for (let element of array) {
        if (!predicate(element)) {
            return false;
        }
    }
    return true;
}

// Solution using 'some':
function everySome(array, predicate) {
    return !array.some(element => !predicate(element));
}


/*
Dominant writing direction
Write a function that computes the dominant writing direction in a string of text. Remember that each script object has
a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
The dominant direction is the direction of a majority of the characters that have a script associated with them. The
characterScript and countBy functions defined earlier in the chapter are probably useful here.
 */

const SCRIPTS = [
    {name: "Latin", ranges: [[65, 91], [97, 123]], direction: "ltr"},
    {name: "Arabic", ranges: [[1536, 1792]], direction: "rtl"},
    {name: "Han", ranges: [[19968, 40959]], direction: "ttb"}
];

// Returns the script object a character code belongs to, or null.
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script;
        }
    }
    return null;
}

// Counts items by a grouping function.
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        if (name != null) {
            let known = counts.findIndex(c => c.name == name);
            if (known == -1) counts.push({name, count: 1});
            else counts[known].count++;
        }
    }
    return counts;
}

// Determines dominant writing direction in a string.
function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : null;
    });

    if (counted.length == 0) return "ltr"; // default if no scripts found.

    // Find the direction with the highest count.
    return counted.reduce((a, b) => (a.count >= b.count ? a : b)).name;
}

// Examples.
console.log(dominantDirection("Hello!"));          // "ltr"
console.log(dominantDirection("مرحبا"));           // "rtl"
console.log(dominantDirection("你好"));             // "ttb"
console.log(dominantDirection("Hello مرحبا"));     // "ltr"
