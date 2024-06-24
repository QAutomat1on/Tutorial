//===========1.1=============
let name = 'Dmytro';
let age = 18;
console.log(typeof (name)) ;
console.log(typeof age);

//===========1.2=============
const city = 'Kyiv';
const isStudent = true; 
console.log(isStudent);
console.log(city);

console.log(typeof isStudent);
console.log(typeof city);

//===========1.3=============
let score = 10;
console.log(score);
score = score*5;
console.log(score);

//===========1.4=============
let temperature = "25 celsius";
console.log(parseInt(temperature)); 

//===========2.1=============
let c = 100, d = 100; // let c = 100; let d = 100;
console.log(typeof c); 
console.log(typeof d);

console.log(c == d) ;
console.log(c === d);

//===========2.2=============
let e = true; 
let f = true; 
console.log(typeof e);
console.log(typeof f);

console.log(e == f) ; 
console.log(e === f) ; 

//===========2.3=============
let g = null ; 
let h = undefined;

console.log(typeof g);
console.log(typeof h);

console.log(g == h);
console.log(g === h);

//===========2.4=============
let i = "0";
let j = 0; 

console.log(i);
console.log(j);

console.log(i == j);
console.log( i === j);

//===========3.1=============
let figure = 123.456;
console.log(parseInt(figure));

console.log(parseFloat(figure));

//===========3.2=============
let word = "abc123";
let word1 = "123abc"

console.log(parseInt(word));

console.log(parseFloat(word1));

//===========4.1=============
let sam = 'hello' ;
let sam1 = 123;
let sam2 = NaN;

console.log(isNaN(sam1)) ;
console.log(isNaN(sam1)) ;
console.log(isNaN(sam2)) ; 

//===========4.2=============
let bb = 42;
let bb1 = 0.25; 
let bb2 = Infinity;

console.log(isNaN(bb));
console.log(isNaN(bb1));
console.log(isNaN(bb2));

//===========4.3=============
let cc = "123";
let cc1 = undefined; 
let cc2 = NaN;

console.log(isNaN(cc));
console.log(isNaN(cc1));
console.log(isNaN(cc2)); //isNaN this is similar to ==;

console.log(Number.isNaN(cc));
console.log(Number.isNaN(cc1));
console.log(Number.isNaN(cc2));   // Number.isNaN this is similar to ===;

//===========5.1=============
let dd = 7.24; 
console.log(Math.round(dd)); //7

//===========5.2=============
let ee = 7.24;// -7.24; 
console.log(Math.floor(ee)); // 7 in case with -7.24 == -8; 

//===========5.3============
let ff = 7.24;  
console.log(Math.ceil(ff)); //8

//===========5.4=============
let m = 8.75 , n = 6.00 , b = -2.88;

console.log(Math.round(m)); // 9
console.log(Math.round(n)); // 6
console.log(Math.round(b)); // -3

console.log(Math.ceil(m)) ; // 9 
console.log(Math.ceil(n)); // 6
console.log(Math.ceil(b)); // -2

console.log(Math.floor(m)); // 8
console.log(Math.floor(n)); // 6 
console.log(Math.floor(b)); //-3