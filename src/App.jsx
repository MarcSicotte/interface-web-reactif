import './App.scss';
import Entete from './Entete';
import PiedPage from './PiedPage';
import ListeProduits from './ListeProduits';
import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Accueil from './Accueil';
import Propos from './Propos';

function App() {


  // État React pour gérer un panier d'achats
  const etatPanier = useState(() => JSON.parse(window.localStorage.getItem('panier-4pa')) || {});
  // Remarquez que useState retourne un tableau : 
  // Le premier élément du tableau représente le contenu de l'état
  const panier = etatPanier[0]; 
  // Le deuxième élément est une fonction qui sert à réécrire l'état
  // const setPanier = etatPanier[1]; 
  // Donc, alternativement avec destructuration de tableau
  // const [panier, setPanier] = useState({});

  // État React pour gérer un compteur de clics
  // Remarquez la syntaxe JS de "déstructuration" de tableau : on obtient 
  // rapidement deux variables contenant les deux éléments du tableau retourné 
  // par useState()
  const [compteur, setCompteur] = useState(0); 

  // "Persister" (sauvegarder) le panier dans localStorage
  // Utiliser le HOOK useEffect pour exécuter ce code de façon controlée
  
  useEffect(() => window.localStorage.setItem('panier-4pa', JSON.stringify(panier)), [panier]);

  
//État de l'utulisateur connecté
  const[util, setUtil] = useState(null);

  /**
   * Délcenche le processus d'authentification avec google auth provider
   */
  function connexion(){
    
  }

  return (
    <div className="App">
      {
        util?
        <>
      <Entete util={util} setUtil={setUtil} ali="baba" panier={panier} test="Allo Props" />
      <Routes>
        <Route path='/' element={<Accueil/>}></Route>
        <Route path='/Propos' element={<Propos/>}></Route>
        <Route path='/Produits' element={ <ListeProduits etatPanier={etatPanier} />}></Route>
       
      </Routes>
      <PiedPage />
      </>
      :
      <button onClick={connexion}>Connexion</button>
      }
    </div>
  );
}

export default App;
