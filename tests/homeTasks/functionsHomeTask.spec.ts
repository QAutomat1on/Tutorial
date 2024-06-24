import { test, expect } from '@playwright/test';

//discount function and unit tests.

function countDiscountAmount(price, percent){
    const onePercentValue = price / 100;
    const discountedPrice = price - (percent * onePercentValue)
    return discountedPrice;
}
countDiscountAmount(100,10);

test("tt1 Right discount amount", async () => {
    const answer = countDiscountAmount(100,10);
    expect(answer).toEqual(90);
});

test('tt2 Zero discount', async() =>{ 
    const answer = countDiscountAmount(100,0)
    expect(answer).toEqual(100)
});

test('tt3 100% discount', async()=> {
    const answer = countDiscountAmount(100,100);
    expect(answer).toEqual(0);
});

//convert F to C and vice versa function and unit tests.

function convertDegrees(degrees){
    if(degrees.includes('F°')) {
        let stringNumberC = degrees.split('F')[0];
        let cleanNumberF = Number(stringNumberC);
        const celsious = (cleanNumberF - 32) / 1.8 + 'C°';
        return celsious;
    } if(degrees.includes('C°')) { 
        let stringNumberF = degrees.split('C')[0];
        let cleanNumberC = Number(stringNumberF);
        const farenheit =(cleanNumberC * 1.8) + 32 + 'F°';
        return farenheit;
    } else {
        throw Error('Bad format try to use example "11 F°" or "22 C°"');
    }
};

test('transformation from F° to  C°', async () => {
    const answer = convertDegrees('55 F°');

    expect(answer).toContain('12.777777777777777C°');
});

test('transformation from C° to  F°', async () => {
    const answer = convertDegrees('33 C°');

    expect(answer).toContain('91.4F°');
});

test('Throwing error', async () => {
    const answer = convertDegrees('Pads123');

    expect( () => {
        convertDegrees('123°');
    }).toThrow('Bad format try to use example "11 F°" or "22 C°"');
});

//tellTheFuture with tests.

function tellTheTruth(details) {
    function createMessage(kids,wifeName, place, jobTitle) {
        return  [`You will be ${jobTitle} working remotely at ${place} married with ${wifeName} and have ${kids} kids`]
    }
    const [kids,wifeName, place, jobTitle] = details;
    return createMessage(kids,wifeName, place, jobTitle);
}

tellTheTruth(['2', 'Emily','Madeira', 'SDET at US company']);

test('Wife name', async()=> {
    const answer = tellTheTruth(['2', 'Emily','Madeira', 'SDET at US company']);
    expect(answer[0]).toContain('Emily');
});

test('compare place', async()=> {
    const answer = tellTheTruth(['2', 'Emily','Madeira', 'SDET at US company']);
    expect(answer[0]).toContain('Madeira');
});

test('compare jobTitle', async()=> {
    const answer = tellTheTruth(['2', 'Emily','Madeira', 'SDET at US company']);
    expect(answer[0]).toContain('SDET');
});

test('how many kids do we have ? ', async()=> {
    const answer = tellTheTruth(['2', 'Emily','Madeira', 'SDET at US company']);
    expect(answer[0]).toContain('2');
});

// calculate dog age with tests

function calculateDogAge(peopleAge, peopleAgeArgument) { 
    const dogAge = peopleAge * peopleAgeArgument; 
    const fullAnswer = `Your dog is ${dogAge} years old in a dog age!`
    if (peopleAge > 0) {
    console.log(fullAnswer)
    return (fullAnswer);
    } if( peopleAge == 0) {
        throw new Error('Your dog still puppy, come back after 1 year');
    } if(peopleAge < 0) {
        throw new Error('Negative age is not an option lad');
    }
}

test('correct age', async()=> {
    const answer = calculateDogAge(2,7);
    expect(answer).toContain('14');
});

test('puppy age value', async () => {
    expect(() => {
        calculateDogAge(0, 7);
    }).toThrow('Your dog still puppy, come back after 1 year');
});

test('Negative age value', async () => {
    expect(() => {
        calculateDogAge(-1, 7);
    }).toThrow('Negative age is not an option lad');
});