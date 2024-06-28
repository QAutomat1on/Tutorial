const sam = 'samSmith';
console.log(sam[0].toUpperCase()+ sam.substring(1));

//TASK 1 ;

const cities = [
        "miami",
        "barcelona",
        "madrid",
        "amsterdam",
        "berlin",
        "sao paulo",
        "lisbon",
        "mexico city",
        "paris"
];
const citiesCapitalised = cities.map((value) => {
    return value[0].toUpperCase() + value.substring(1);
});
console.log(citiesCapitalised);

const listCitiesCapitalised = [];

citiesCapitalised.forEach((value, index) => {
    listCitiesCapitalised.push(`${index + 1}. ${value}`);
});

console.log(listCitiesCapitalised);