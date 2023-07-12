import './App.css';
import Home from './components/Home';
import ListaCarros from './components/lista.js/ListaCarros.js';


function App() {
  return (
    <div className="App centered-content">
      <Home />
      <ListaCarros />
    </div>
  );
}


export default App;
