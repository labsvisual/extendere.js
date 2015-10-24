# extendere.js
A library which adds some very useful functions to the base type classes available in JavaScript.

### Introduction
Extendere.js is a small library (5kb compressed) which adds some **really** useful functions to the base classes of
many JavaScript native types.

### Usage
Simple. You can either include the following script tag to include everything there is and rock and roll with
Extendere:
```html
<script src="https://cdn.rawgit.com/labsvisual/extendere.js/master/dist/extendere.min.js"></script>
<script>
ExtendereMath.expostMath();
</script>
```
or you can install it using bower: `bower install Extendere.js --save`
or you can download it and include the scripts manually.

***
## API

#### Array
##### .each( callback )
For every element there is in the array, pass it to the callback. You can do whatever you want with that element
after that.

```javascript
var arr = [ 1, 2, 3 ],
    nea = [];

arr.each( function( i ) {
    nea.push( i );
});

console.log( nea );

```
`Output: [1, 2, 3]`

General syntax: `Array.each( function( item ) {} )`

##### .map( filter )
Run a filter on each element present in the array. The `filter` function should `return` a value which has all the
transformations applied.

```javascript
var arr = [ 1, 2, 3 ];

var x = arr.map( function( i ) {
    return i * 2;
});

console.log( x );

```
`Output: [2, 4, 6]`

General syntax: `Array.map( function( item ) {} )`

##### .sort()
Sorts the current array using quicksort and returns the sorted instance.

```javascript
var arr = [ 3, 2, 1 ];

var x = arr.sort();

console.log( x );

```
`Output: [1, 2, 3]`

General syntax: `Array.sort()`

##### .indexOf( element, isSorted )
If sorted, uses binary search to search for the element; returns the index, if found; -1 otherwise. If not sorted, it
sorts using the `Array.sort` method (*defined above*) and then applied binary search.

```javascript
var arr = [ 1, 4, 7, 2, 8 ];
var x = arr.indexOf( 2, false );

console.log( x );

```
`Output: 3`

General syntax: `Array.indexOf( element, isSorted )`

##### .last( offset )
If offset is given, returns the last `offset` elements; the last element, otherwise.

```javascript
var arr = [ 1, 4, 7, 2, 8 ];
var x = arr.last();
var y = arr.last( 2 );

console.log( x );
console.log( y );

```
```
Output:
8
[2, 8]
```

General syntax: `Array.last( offset )`

##### .flatten()
Reduces nested arrays into one, single array.

```javascript
var arr = [ 1, 2, [ 3, 4 [ 5, 6 ] ] ];
var x = arr.flatten();

console.log( x );

```
`Output: [1, 2, 3, 4, 5, 6]`

General syntax: `Array.flatten()`

##### .clean()
Returns an array free of 'falsy' elements. Elements like `false, 0, <empty string>, null, undefined, NaN` are
called falsy elements.

```javascript
var arr = ( [ 0, 1, false, 2, '', 3, undefined, null, 0 / 0 ] ),
    arx = arr.clean();

console.log( arx );

```
`Output: [1, 2, 3]`

General syntax: `Array.clean()`

##### .exists( element )
Check is the specified value exists in the array. Returns true if it does, false otherwise.

```javascript
var arr = [ 1, 2, 3 ];

console.log( arr.exists( 3 ) );

```
`Output: true`

General syntax: `Array.exists( element )`

##### .union( secondArray, \*arrays )
Returns an array which is the union of all the arrays provided. Follows the same union rule as that in
elementary set theory.

```javascript
var arr = [ 1, 2, 3 ],
    arx = [ 3, 4, 5 ],
    ary = [ 6, 7, 8 ];
    ar  = arr.union( arx, ary );

console.log( ar );

```
`Output: [1, 2, 3, 4, 5, 6, 7, 8]`

General syntax: `Array.union( secondArray, *arrays )`

##### .intersect( secondArray, \*arrays )
Returns an array which is the intersection of all the arrays provided. Follows the same intersection rule as that in
elementary set theory.

```javascript
var arr = [ 1, 2, 3 ],
    arx = [ 2, 3, 4, 5 ],
    ary = [ 2, 3 ];
    ar  = arr.intersect( arx, ary);

console.log( ar );

```
`Output: [2, 3]`

General syntax: `Array.intersect( secondArray, *arrays )`

##### .removeDuplicates()
Returns an array with all the duplicates removed.

```javascript
var arr = [ 1, 2, 3, 2, 3, 2, 3, 4, 5, 6, 8, 2, 5, 7 ],
    arx = [ 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1 ];

console.log( arr.removeDuplicates() );
console.log( arx.removeDuplicates() );

```
```
Output:
[1, 3, 4, 6, 8, 2, 5, 7]
[2, 1]
```

General syntax: `Array.intersect( secondArray, *arrays )`

##### .atRandom( length )
Returns a random list of element(s) from the array of length `length`; if none provided, returns a single random
element.

```javascript
var arr = [ 1, 2, 3 ];

console.log( arr.atRandom() );
console.log( arr.atRandom( 2 ) );

```
```
Output:
1
[2, 1]
```
General syntax: `Array.atRandom( length )`


##### .isArray( array )
Returns true if the passed parameter is an array; false, otherwise.

```javascript
var arr = [ 1, 2, 3 ];

console.log( Array.prototype.isArray.call ( arr ) );

```
`Output: true`

General syntax: `Array.isArray( array )`

#### Object
##### .allKeys()
Returns all the keys of the object as an array.

```javascript
var obj = {
    "name": "John Doe",
    "email": "abc@acme.com"
};

var arr = obj.allKeys();
console.log( arr );
```

`Output: ["name", "email"]`

General syntax: `Object.allKeys()`

##### .allValues()
Returns all the values of the object as an array.

```javascript
var obj = {
    "name": "John Doe",
    "email": "abc@acme.com"
};

var arr = obj.allKeys();
console.log( arr );
```

`Output: ["John Doe", "abc@acme.com"]`

General syntax: `Object.allValues()`

##### .map( filter )
Run a filter on each value present in the object. The `filter` function should `return` a value which has all the
transformations applied.

```javascript
var obj = {
    "age": 1,
    "newAge": 10
};

var arr = obj.mapObject( function( key, val ) {
    return val * 2;
});

console.log( arr);

```
`Output: { "age": 2, "newAge": 20 }`

General syntax: `Object.map( function( key, value ) {} )`

##### .extract()
Returns an array containing the key-value pairs as a separate array.

```javascript
var obj = {
  "age": 1,
  "newAge": 10
};

var arr = obj.extract();
console.log( arr );

```

`Output: [["age", 1], ["newAge", 10]]`

General syntax: `Object.extract()`

##### .invert()
Returns an object where the value is the key of the original object and vice-versa.

```javascript
var obj = {
  "age": 1,
  "newAge": 10
};

var arr = obj.invert();
console.log( arr );

```

`Output: { 1: "age", 10: "newAge" }`

General syntax: `Object.invert()`

##### .merge( secondArray )
Returns an object where the value is the key of the original object and vice-versa.

```javascript
var obj1 = {
  "foo": "bar"
};

var obj2 = {
  "bar": "foo"
};

var arr = obj1.merge( obj2 );
console.log( arr );

```

`Output: { "foo": "bar", "bar": "foo" }`

General syntax: `Object.merge( secondArray )`

#### Math
##### .round( val, decimals )
Rounds the value `val` to the specified number of decimals.

```javascript
var a = 3.123912491519541;

console.log( window.math.round( a, 5 ) );
console.log( window.math.round( a, 6 ) );
console.log( window.math.round( a, 7 ) );
console.log( window.math.round( a, 8 ) );
```

```
Output:
3.12391
3.123912
3.1239125
3.12391249
```

General syntax: `window.math.round( val, decimals )`

##### .toRadians( val, roundTo )
Converts the value `val` to its equivalent radian representation rounded to the specified number of decimals (default 2).

```javascript
console.log( window.math.toRadians( 114.592 ) );
console.log( window.math.toRadians( 114.592, 8 ) );
```

```
Output:
2.00
2.0000077
```

General syntax: `window.math.toRadians( val, roundTo )`

##### .toDegrees( val, roundTo )
Converts the value `val` to its equivalent radian representation rounded to the specified number of decimals (default 2).

```javascript
console.log( window.math.toDegrees( 2 ) );
console.log( window.math.toDegrees( 2, 8 ) );
```

```
Output:
114.59
114.59155903
```

General syntax: `window.math.toRadians( val, roundTo )`

**You need to call: ** `ExpendereMath.exposeMath();` to get the `window.math` object. Remember, it's not the same as
`window.Math`.

### Conclusion
That's it for this version. There are a lot of goodies planned for the next version. Hold tight.

### Support
You can open up a new issue in the issues tab, or clone this repo and fix a bug yourself. (Thanks).
