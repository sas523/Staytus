import React, { Component } from "react";
import './Card.css';

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
  const reptiles = (await species).filter(s => s.classification === "reptile");
  reptiles.forEach(r => {
    peoples = peoples.concat(r.people);
  });
  const planetWithFilms = (await planets).filter(p => p.films.length >= 1);
  const result = planetWithFilms.filter(p => p.residents.some(r => peoples.includes(r)));
  return result;
}

class Card extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const f = await find();
    this.setState({ data: f })
  }

  render() {
    return (
      <div className="card">
        <div className="created">climate</div>
        <div className="circle">B</div>
        <div className="name">name</div>
        <div className="climate">climate</div>
        <div className="films">films</div>
        <img src="images/card.png" ></img>
      </div>
    );
  }
}

export default Card;