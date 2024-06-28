const arr1 = ['first element','second element','third element'];
const arr3 = new Array (1); // довжина 1
const arr2 = new Array ();

console.log(arr1);
console.log(arr2);

const a1 = 1; //0 index
const a2 = 2; //1
const a3 = 3; //2

function forEachCallBack(value, ) {
    //content
    console.log(value);
}
forEachCallBack(a1);
forEachCallBack(a2);
forEachCallBack(a3);

const forEachCallBackArrow = (value) => {

    console.log(value);
}
forEachCallBackArrow(2);


arr1.forEach((value, index)=>{
    const currentIndex = index ; 
    console.log(`This is current index ${index}`);
    console.log(`This is current index ${value}`);
    console.log(value);

});
const arr4 = [1, 2, 3, 4, 5, 6, 7];

arr1.forEach(function(value, index,array){
    const currentIndex = index ; 
    console.log(`This is current index ${index}`);
    console.log(`This is current index ${value}`);
    console.log(`This is array ` + array);

});


const newArray = arr4.forEach(function(value, index, array) { 
    const newValue = value + 1;
    console.log(newValue);

})

console.log(arr4);


// for(let [key , value] of arr4.entries) {
//     console.log(key); 
//     value = value + 1 ;
// }
// console.log(arr4);

// function callBack(value, index , array) {
//     array[index] = value +1; 
// }

//map create new massive 
const newArr4 = arr4.map((value, index, array) => { 

    return value + 1;
});
console.log(arr4);
console.log(newArr4);

//concat
const newArra5 = arr4.concat(newArr4);
console.log(newArra5);

// find();

const arr6 = [1, 2, 3, 4, 5, 6, 7];

const elementThatWeSearching = arr6.find(function(value,index, currentArray) {

    return value % 2===0;
});

console.log(elementThatWeSearching);

console.log(5/2);
console.log(5%2);

// push() pop() //add element into the and of massive

const oldArray = ['test', '1234', undefined, null, true , {} , []];
oldArray.push(1);
console.log(oldArray);

// pop() 
const popedElement = oldArray.pop();
console.log(popedElement);

console.log(oldArray);

//includes

const includedElement = oldArray.includes('test');
console.log(includedElement);
