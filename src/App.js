import { useEffect, useState } from "react";
import { Select } from "./components/Select";
import { Checkbox } from "./components/Checkbox";

function App() {

const [dogs, setDogs] = useState([]);
const [sort, setSort] = useState("descending");
const [filteredDogs, setFilteredDogs] = useState([]);


useEffect(() => {
  (() => {
    return fetch("https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json")
           .then((response) => { return response.json() });
  })()
  .then((data) => { setDogs(data.breed) })
  .catch((error) => { console.log(error) });
}, [dogs]);

const changeSort = (event) => {
  setSort(event); 
}

const changeFilter = (event) => {

  for( const dog of dogs) {
    if( event && !event.includes(dog.name)) {
      continue;
    }
    setFilteredDogs((state) => ([...state, dog]));
  }
}

console.log(filteredDogs);

const filter = filteredDogs.map((dog) => (

  <li key={dog.id}>
    <h2>{dog.name}</h2>
    <p>Origin: {dog.origin}</p>
  </li>

));




const dataDogs = dogs.map((dog) => (

  <li key={dog.id}>
    <h2>{dog.name}</h2>
    <p>Origin: {dog.origin}</p>
  </li>

));

  
  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <Checkbox data={dogs} onSubmit={changeFilter}/>
      <Select onSubmit={changeSort} />
      <ul>
        {filter}
        {sort === "ascending" && dataDogs.reverse()}
        {sort === "descending" && dataDogs.sort()}
      </ul>
    </div>
  );
}

export default App;
