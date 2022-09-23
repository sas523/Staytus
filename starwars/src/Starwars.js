const fetchData = async (url) => {
    var items = [];
    var total = 0;
    //for every page which is included 10 items
    do {
        var r = await fetch(url);
        var j = await r.json();
        total = j.count;
        url = j.next;
        items = items.concat(j.results);
    }
    while (items.length < total)
    return items;
}

const find = async () => {
    const planets = fetchData('https://swapi.dev/api/planets/');
    const species = fetchData('https://swapi.dev/api/species/');
    var peoples = [];
    var reptiles = (await species).find(s => s.classification === "reptile");
    reptiles.forEach(r => {
        peoples = peoples.concat(r.people);
    });
    var result = planets.find(p => p.films >= 1 && p.residents.some(r => peoples.includes(r)));
    return result;
}


function Starwars() {
    return (<h1>Sahar joon</h1>
    )
}

export default Starwars;