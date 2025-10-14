import './style/App.scss';
import { getRandomAppetizer, getRandomMaincourse, getRandomDessert } from "./services/api";
import { useEffect, useState } from "react";
/* import RandomRecipes from "./components/randomRecipes"; // <--- importa qui  -->Valuta se da rimuovere o meno*/

function App() {
  const [appetizer, setAppetizer] = useState(null);
  const [maincourse, setMaincourse] = useState(null);
  const [dessert, setDessert] = useState(null);

  useEffect(() => {
    getRandomAppetizer().then(data => setAppetizer(data.recipes[0]));
    getRandomMaincourse().then(data => setMaincourse(data.recipes[0]));
    getRandomDessert().then(data => setDessert(data.recipes[0]));
  }, []);

  return (
    <div className="App">
      <h1>🍃 Ricette VeggieBook</h1>
      {/* Passiamo le ricette come props */}
      <RandomRecipes
        appetizer={appetizer}
        maincourse={maincourse}
        dessert={dessert}
      />
    </div>
  );
}

export default App;
