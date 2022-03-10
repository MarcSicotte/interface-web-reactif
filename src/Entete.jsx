import './Entete.scss';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import Badge from '@mui/material/Badge';
import {NavLink} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { authFirebase } from './firebase/init';
import { signOut } from 'firebase/auth';

// Remarquez la destructuration d'objet
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
export default function Entete({panier, util, setUtil}) {
    console.log("Propriété 'user' de l'objet GoogleCredential renvoyé par l'authentification fédéré de Google: ", util);
    // Obtenir les 5 info impportantes pour le sommaire panier (on passe le tableau 
    // (Array) des valeurs dans l'objet 'panier')
    const {articlesDifferents, articlesTotaux, sousTotal, taxes, total} = calculerInfoPanier(Object.values(panier));
    return (
        <header className="Entete">
            <h1><NavLink to="/">Magasin général</NavLink></h1>
            <nav className="nav-principale">
                <NavLink to="Produits" className={({isActive}) => isActive ? 'lien-actif' : '' }>Produits</NavLink> 
                <NavLink to="Propos" className={({isActive}) => isActive ? 'lien-actif' : '' }>A propos</NavLink>
            </nav>
            <nav className='nav-secondaire'>
                {/* Sommaire du panier */}
                <input type="checkbox" id="cc-sommaire-panier" />
                <div className="sommaire-panier">
                    <h3>Sommaire du panier</h3>
                    <div><span>Articles différents</span><span>{articlesDifferents}</span></div>
                    <div><span>Articles totaux</span><span>{articlesTotaux}</span></div>
                    <div><span>Sous-total</span><span>{sousTotal}</span></div>
                    <div><span>Taxes</span><span>{taxes}</span></div>
                    <div><span>Total</span><span>{total}</span></div>
                </div>
                <Avatar alt={util.displayName} src={util.photoURL} />
                <div>{util.displayName}</div>
                <button onClick={() => signOut(authFirebase).then(setUtil(null)) }>Déconnexion</button>
                <Badge badgeContent={articlesTotaux} color="secondary">
                    <label htmlFor="cc-sommaire-panier"><ShoppingCartSharpIcon/></label>
                </Badge>
                <a href="#">Contactez-nous</a>
                
            </nav>
        </header>
    );
}

/**
 * Calculer l'information du sommaire du panier
 * 
 * @param Array panierAchats Objet panier d'achats
 * 
 * @returns Object Objet contenant les 5 info requises du panier
 */

function calculerInfoPanier(panierAchats) {
    const _sousTotal = panierAchats.reduce((acc, courant) => acc + courant.qte * courant.prix, 0);
    const _taxes = _sousTotal * 0.14975;
    return {
        articlesDifferents: panierAchats.length,
        articlesTotaux: panierAchats.reduce((acc, courant) => acc + courant.qte, 0),
        sousTotal: _sousTotal.toFixed(2),
        taxes: _taxes.toFixed(2),
        total: (_sousTotal + _taxes).toFixed(2)
    }
}

