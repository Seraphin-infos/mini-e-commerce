// TABLEAUX NAV BAR
let tabNav = [
    { href: "#accueil", contenue: "Accueil", actif: true },
    { href: "#produit", contenue: "Produit", actif: false },
    { href: "#a-propos", contenue: "A propos", actif: false },
    { href: "#contact", contenue: "Contact", actif: false },
    { href: "#inscription", contenue: "Inscription", actif: false },
    { href: "#deconnexion", contenue: "Déconnexion", actif: false }
]
// CONTENUE NAV BAR
const ulNav = document.querySelector('.ul-nav');
const menu = tabNav.map((el) => {
    const liAccueil = document.createElement('li');
    const aAccueil = document.createElement('a');
    aAccueil.href = el.href;
    aAccueil.innerHTML = el.contenue;
    aAccueil.classList.add('actif');

    // verification actif
    if (el.actif === true) {
        aAccueil.setAttribute('class', 'actif');
    } else {
        aAccueil.classList.remove('actif');
    }

    // gestion d'actif
    aAccueil.addEventListener('click', () => {
        const lien = ulNav.querySelectorAll('a');
        // desactivation actif
        for (let aLien of lien) {
            aLien.classList.remove('actif');
        }
        // activation actif
        aAccueil.setAttribute('class', 'actif');
    })

    ulNav.append(liAccueil);
    liAccueil.append(aAccueil);
})


// SLIDE MOBILE
const slideMobile = document.querySelector('.slide-mobile');
const slideM = document.querySelector('.slide')
const slide = tabNav.map((el) => {
    const liAccueil = document.createElement('li');
    const aAccueil = document.createElement('a');
    aAccueil.href = el.href;
    aAccueil.innerHTML = el.contenue;
    aAccueil.classList.add('actif');

    // verification actif
    if (el.actif === true) {
        aAccueil.setAttribute('class', 'actif');
    } else {
        aAccueil.classList.remove('actif');
    }

    // gestion d'actif
    aAccueil.addEventListener('click', () => {
        const lien = slideMobile.querySelectorAll('a');
        // desactivation actif
        for (let aLien of lien) {
            aLien.classList.remove('actif');
        }
        // activation actif
        aAccueil.setAttribute('class', 'actif');
    })

    slideMobile.append(liAccueil);
    liAccueil.append(aAccueil);
})



// BOUTON OUVERTURE SLIDE MOBILE
const lihumberger = document.createElement('li');
const ahumberger = document.createElement('a');
ahumberger.innerHTML = "<i class='fas fa-bars'><i>";
ulNav.append(lihumberger);
lihumberger.append(ahumberger);
ahumberger.addEventListener('click', () => {
    slideM.style.display = "block";
    slideM.style.animation = "slide 0.5s";
})

// BOUTON FERMETURE SLIDE MOBILE
const fermer = document.createElement("button");
fermer.innerHTML = "<i class='fas fa-times'></i>";
slideM.append(fermer);
fermer.addEventListener('click', () => {
    setTimeout(() => {
        slideM.style.display = "none";
    }, 400)
    slideM.style.animation = "return 0.5s";
})


// ==============================
//              API
// ==============================

let url = "https://dummyjson.com/products?limit=200";
let prod = [];
// API TEST
async function produits() {
    const requete = await fetch(url, {
        method: 'GET'
    })

    if (!requete.ok) {
        alert("Problème de connexion");
        return;
    } else {
        let donner = await requete.json();
        let produit = donner.products; // maka an'ilay tableau produit rehetra
        let connecter = localStorage.getItem("connecter");


        produit.forEach((els) => {
            console.log(els.category);
            prod.push({
                nom: els.title,
                image: els.images[0],
                prix: els.price,
                categorie: els.category
            })
        })
        // filtrage 
        filtrage(prod)

        // BOUTON ACHETER MASQUER
        const btnAcheter = document.querySelectorAll('.btn-acheter');
        btnAcheter.forEach((el) => {
            el.style.display = "none";
        })

        // filtre 
        // console.log(prod);
        let filt = prod.filter((el) => {
            return el.categorie === "laptops";
        })

        // SI CONNECTER
        if (connecter) {
            // BOUTON ACHETER AFFICHER
            const btnAcheter = document.querySelectorAll('.btn-acheter');
            btnAcheter.forEach((el) => {
                el.style.display = "inherit";
            })
            click("inherit", prod)
        } else {
            click('none', prod)
        }

    }
}
produits();

const cont = document.querySelector('.cont-image');
const parentImage = document.querySelector('.parent-image');

// ETAT BOUTON FILTRE
function click(display, tab) {
    // SELECTION BOUTON DE FILTRAGE

    const tous = document.querySelector('.tous');
    const laptops = document.querySelector('.laptops');
    const watches = document.querySelector('.watches');
    const phones = document.querySelector('.phone');
    const tShirts = document.querySelector('.t-shirt');
    // filtrage
    let laptop = tab.filter((el) => {
        return el.categorie === "laptops";
    })

    let watche = tab.filter((el) => {
        return el.categorie === "mens-watches";
    })
    let phone = tab.filter((el) => {
        return el.categorie === "smartphones";
    })
    let tShirt = tab.filter((el) => {
        return el.categorie === "mens-shirts";
    })
    // CLIQUE FITRE
    laptops.addEventListener('click', () => {
        const boxProduit = document.querySelectorAll('.box-produit');
        boxProduit.forEach((el) => {
            el.remove();
        })
        filtrage(laptop);
        window.location.href = "#filtrage";
        const btnAcheters = document.querySelectorAll('.btn-acheter');
        btnAcheters.forEach((el) => {
            el.style.display = display;
        })
    })
    watches.addEventListener('click', () => {
        const boxProduit = document.querySelectorAll('.box-produit');
        boxProduit.forEach((el) => {
            el.remove();
        })
        filtrage(watche);
        window.location.href = "#filtrage";
        const btnAcheters = document.querySelectorAll('.btn-acheter');
        btnAcheters.forEach((el) => {
            el.style.display = display;
        })
    })
    phones.addEventListener('click', () => {
        const boxProduit = document.querySelectorAll('.box-produit');
        boxProduit.forEach((el) => {
            el.remove();
        })
        filtrage(phone);
        window.location.href = "#filtrage";
        const btnAcheters = document.querySelectorAll('.btn-acheter');
        btnAcheters.forEach((el) => {
            el.style.display = display;
        })
    })
    tShirts.addEventListener('click', () => {
        const boxProduit = document.querySelectorAll('.box-produit');
        boxProduit.forEach((el) => {
            el.remove();
        })
        filtrage(tShirt);
        window.location.href = "#filtrage";
        const btnAcheters = document.querySelectorAll('.btn-acheter');
        btnAcheters.forEach((el) => {
            el.style.display = display;
        })
    })
    tous.addEventListener('click', () => {
        const boxProduit = document.querySelectorAll('.box-produit');
        boxProduit.forEach((el) => {
            el.remove();
        })
        filtrage(tab);
        const btnAcheters = document.querySelectorAll('.btn-acheter');
        btnAcheters.forEach((el) => {
            el.style.display = display;
        })
    })
}
// BOUCLER PRODUITS
function filtrage(tableau) {
    for (let tab of tableau) {
        const boxProduit = document.createElement('div');
        boxProduit.classList.add('box-produit');
        const contImage = document.createElement('div');
        contImage.classList.add('cont-image');
        const img = document.createElement('img');
        img.setAttribute('src', tab.image);
        const contPrix = document.createElement('div');
        contPrix.classList.add('cont-prix');
        const prix = document.createElement('div');
        prix.classList.add('prix');
        const h1Prix = document.createElement('h1');
        h1Prix.innerHTML = `${tab.prix} $`;
        const avis = document.createElement('div');
        avis.classList.add('avis');
        const star1 = document.createElement('i');
        star1.setAttribute("class", "fas fa-star");
        const star2 = document.createElement("i");
        star2.setAttribute('class', "fas fa-star")
        const star3 = document.createElement("i");
        star3.setAttribute('class', "fas fa-star");
        const star4 = document.createElement("i");
        star4.setAttribute("class", "fas fa-star-half-alt");
        const star5 = document.createElement("i");
        star5.setAttribute('class', "far fa-star");
        const btnAcheter = document.createElement('div'); // boutton acheter
        btnAcheter.classList.add('btn-acheter');
        const btnArticle = document.createElement('button');
        btnArticle.classList.add('btn-article');
        btnArticle.innerHTML = "Acheter <i class='fas fa-shopping-cart'></i>"



        parentImage.append(boxProduit);
        boxProduit.append(contImage);
        contImage.append(img);
        boxProduit.append(contPrix);
        contPrix.append(prix);
        prix.append(h1Prix);
        contPrix.append(avis);
        avis.append(star1);
        avis.append(star2);
        avis.append(star3);
        avis.append(star4);
        avis.append(star5);
        boxProduit.append(btnAcheter);
        btnAcheter.append(btnArticle);

    }
}

// BOUTON ACHETER MASQUER
const btnAcheter = document.querySelectorAll('.btn-acheter');
btnAcheter.forEach((el) => {
    el.style.display = "none";
})


// CHIFFRE DE PROGRESSION
const cProjet = document.querySelector('.c-projet');
const cClient = document.querySelector('.c-client');
const cMembre = document.querySelector('.c-membre');
cProjet.textContent = 0
cClient.textContent = 0
cMembre.textContent = 0
let projet = setInterval(() => {
    cProjet.textContent = ++cProjet.textContent;
    if (cProjet.textContent === "30") {
        clearInterval(projet);
    }
}, 100);

let clients = setInterval(() => {
    cClient.textContent = ++cClient.textContent;
    if (cClient.textContent === "71") {
        clearInterval(clients);
    }
}, organiserIncr(30, 100, 71));

let membres = setInterval(() => {
    cMembre.textContent = ++cMembre.textContent;
    if (cMembre.textContent === "47") {
        clearInterval(membres);
    }
}, organiserIncr(30, 100, 47));

// FONCTION CHIFFRE PROGRESSION
function organiserIncr(chiffrePrincipal, tempEnMs, chiffreSeconde) {
    // Total temps jusqu'à la fin du chiffre
    let totalTemps = tempEnMs * chiffrePrincipal; // 4000 ms
    // Calcul Temps Final
    let tempsFinal = totalTemps / chiffreSeconde;  // 38,46 ms/c
    return tempsFinal;
}

// GET USER
let user = JSON.parse(localStorage.getItem("user")) || []; // misintona donné avy ao am localStorage

// INSCRIPTION
const noms = document.querySelector('#nom');
const prenoms = document.querySelector('#prenom');
const emails = document.querySelector('#email');
const mdps = document.querySelector('#mdp');
const mdpsConfirm = document.querySelector('#mdp-confirm');
const btnInscription = document.querySelector('#btn-inscription');
const errNom = document.querySelector('.err-nom');
const errPrenom = document.querySelector('.err-prenom');
const errEmail = document.querySelector('.err-email');
const errMdp = document.querySelector('.err-mdp');
let complet = false;
// Bouton inscription
btnInscription.addEventListener('click', (e) => {
    e.preventDefault();
    if (noms.value === "" || prenoms.value === "" || emails.value === "" || mdps.value === "" || mdpsConfirm.value === "") {
        alert("Tous les champs et obligatoire");
    }
    if (noms.value.length < 6) {
        errNom.style.display = "block"
        errNom.innerHTML = "nom trop court !";
        errNom.style.color = "rgba(255, 156, 156, 1)";
    } else {
        errNom.style.display = "none";
    }

    if (prenoms.value.length < 6) {
        errPrenom.style.display = "block"
        errPrenom.innerHTML = "Prenom trop court !";
        errPrenom.style.color = "rgba(255, 156, 156, 1)";
    } else {
        errPrenom.style.display = "none";
    }

    if (!emails.value.includes("@gmail.com")) {
        errEmail.style.display = "block";
        errEmail.innerHTML = '"@gmail.com" obligatoire';
        errEmail.style.color = "rgba(255, 156, 156, 1)";
    } else {
        errEmail.style.display = "none";
    }

    if (mdps.value !== mdpsConfirm.value) {
        errMdp.style.display = "block";
        errMdp.innerHTML = 'Confirmation Incorect ❌';
        errMdp.style.color = "rgba(255, 156, 156, 1)";
    } else {
        errMdp.style.display = "none";
    }

    // Si tous sont vrai
    if (noms.value.length >= 6 && prenoms.value.length >= 6 && emails.value.includes("@gmail.com") && mdps.value === mdpsConfirm.value) {
        user.push({
            nom: noms.value, prenom: prenoms.value, email: emails.value, mdp: mdps.value
        })
        localStorage.setItem("user", JSON.stringify(user));
        noms.value = "";
        prenoms.value = "";
        emails.value = "";
        mdps.value = "";
        mdpsConfirm.value = "";
        const notifInscrit = document.querySelector('.notif-inscription');
        setTimeout(() => {
            notifInscrit.style.display = "none";
        }, 5000);
        // redirection vers connexion
        setTimeout(() => {
            notifInscrit.style.display = "flex";
            notifInscrit.style.animation = "slide 1s";
            formInscrit.style.display = "none";
            formCon.style.display = "inherit";
            formInscrit.style.animation = "sortirForm 0.5s ease-in-out";
            formCon.style.animation = "entrerForm 0.5s ease-in-out";
        }, 500);
    }
})

// REDIRECTION FORMULAIRE
const lienCon = document.querySelector('#lien-con');
const lienInscrit = document.querySelector('#lien-inscrit');
const formInscrit = document.querySelector('#form-inscrit');
const formCon = document.querySelector('#form-con');
lienCon.addEventListener('click', () => {
    formInscrit.style.display = "none";
    formCon.style.display = "flex";
    formInscrit.style.animation = "sortirForm 0.5s ease-in-out";
    formCon.style.animation = "entrerForm 0.5s ease-in-out";
})
lienInscrit.addEventListener('click', () => {
    formInscrit.style.display = "flex";
    formCon.style.display = "none";
    formCon.style.animation = "sortirForm 0.5s ease-in-out";
    formInscrit.style.animation = "entrerForm 0.5s ease-in-out";
})
// CONNEXION
const nomC = document.querySelector('#nom-c');
const mdpC = document.querySelector('#mdp-c');
const errCon = document.querySelector('.err-con');
const btnCon = document.querySelector('#btn-con');
btnCon.addEventListener('click', (e) => {
    e.preventDefault();
    let filtreCon = user.find((el) => {
        return el.nom === nomC.value && el.mdp === mdpC.value;
    })
    if (filtreCon) {
        if (filtreCon.nom === nomC.value && filtreCon.mdp === mdpC.value) {
            let connect = {
                nom: filtreCon.nom,
                email: filtreCon.email,
                prenom: filtreCon.prenom
            }
            localStorage.setItem("connecter", JSON.stringify(connect));
            nomC.value = "";
            mdpC.value = "";
            errCon.innerHTML = "";
            setTimeout(() => {
                location.reload(); // refresh auto ny page
            }, 100);
        }
    } else {
        errCon.innerHTML = "Nom ou Mot de passe incorrect !";
        errCon.style.color = "rgba(255, 156, 156, 1)";
    }
})
// GET CONNECTER    
let connexion = JSON.parse(localStorage.getItem("connecter"));

// BOUTON SE CONNECTER VERS FORM CONNEXION
const btnSlogan = document.querySelector('.btn-slogan');
btnSlogan.addEventListener('click', () => {
    formInscrit.style.display = "none";
    formCon.style.display = "inherit";
    window.location.href = "#form-con";
})

// SELECTION LIEN INSCRIPTION 
const ulN = document.querySelector('.ul-nav');
const liN = ulN.querySelectorAll('li');
const aN = liN[4].querySelector('a');
aN.classList.add("ins");
// LIEN INSCRIPTION 
const ins = document.querySelector('.ins');
ins.addEventListener('click', () => {
    formInscrit.style.display = "inherit";
    formCon.style.display = "none";
})

// DECONNEXION
const deconnexion = liN[5].querySelector('a');
deconnexion.classList.add("deconnexion");
const deconnect = document.querySelector('.deconnexion');
deconnect.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("connecter");
    setTimeout(() => {
        location.reload(); // refresh auto ny page
    }, 100);
})

// SELECTION PROFIL
const progres = document.querySelector('.progres');
const contInscrit = document.querySelector('#inscription');
const inscription = document.querySelector('.ins');
const titreB = document.querySelector('.titre-b');
const titreLogo = document.querySelector('.titre-logo');
const profil = document.querySelector('.profil');

// PROFIL
const identiterProfil = document.querySelector('.identiter-profil');
const nomProfil = document.createElement('h3');
const emailProfil = document.createElement('p');
nomProfil.innerHTML = `${connexion.nom} ${connexion.prenom}`;
emailProfil.innerHTML = connexion.email;
identiterProfil.append(nomProfil);
identiterProfil.append(emailProfil);

// IMG_PROFIL
const imgProfil = document.querySelector('.img-profil');
imgProfil.innerHTML = connexion.nom[0];



// CONNECTER
let connecter = localStorage.getItem("connecter");
if (connecter) {
    // ato izy raha connecté
    // affichage bouton acheter
    const btnAcheter = document.querySelectorAll('.btn-acheter');
    const deconnexion = document.querySelector('.deconnexion');

    btnAcheter.forEach((el) => {
        el.style.display = "inherit";
    })

    // affichage bouton deconnexion
    inscription.style.display = "none";
    deconnexion.style.display = "block";
    contInscrit.style.display = "none";
    btnSlogan.style.display = "none";
    progres.style.flexDirection = "column";
    titreB.innerHTML = `Bonjour <span>${connexion.nom} !</span>`;
    titreLogo.style.display = "none";
    profil.style.display = "flex";

    // slide deconnexion
    const liSlide = slideMobile.querySelectorAll('li');
    liSlide[4].style.display = "none";
    liSlide[5].style.display = "block";
    liSlide[5].addEventListener('click', () => {
        localStorage.removeItem("connecter");
        setTimeout(() => {
            location.reload(); // refresh auto ny page
        }, 100);
    })
} else {
    // ato izy raha deconnecter
    // profil.style.display = "none";    
}

// BARE DE PROGRESSION AVIS
const actifCinq = document.querySelector('.actif-cinq');
const actifQuatre = document.querySelector('.actif-quatre');
const actifTrois = document.querySelector('.actif-trois');
const actifDeux = document.querySelector('.actif-deux');
const actifUn = document.querySelector('.actif-un');

let cCinq = document.querySelector('.c-cinq');
let cQuatre = document.querySelector('.c-quatre');
let cTrois = document.querySelector('.c-trois');
let cDeux = document.querySelector('.c-deux');
let cUn = document.querySelector('.c-un');


// convertir en nombre
cCinq = Number(cCinq.innerHTML);
cQuatre = Number(cQuatre.innerHTML);
cTrois = Number(cTrois.innerHTML);
cDeux = Number(cDeux.innerHTML);
cUn = Number(cUn.innerHTML);

// total personne
let total = cCinq + cQuatre + cTrois + cDeux + cUn

// pourcentage
let un = actifUn.style.width = (100 * cUn) / total + "%";
let deux = actifDeux.style.width = (100 * cDeux) / total + "%";
let trois = actifTrois.style.width = (100 * cTrois) / total + "%";
let quatre = actifQuatre.style.width = (100 * cQuatre) / total + "%";
let cinq = actifCinq.style.width = (100 * cCinq) / total + "%";

actifCinq.animate([
    { width: "0%" },
    { width: cinq }
], {
    duration: 2000,
})

actifQuatre.animate([
    { width: "0%" },
    { width: quatre }
], {
    duration: 2000,
})

actifTrois.animate([
    { width: "0%" },
    { width: trois }
], {
    duration: 2000,
})
actifDeux.animate([
    { width: "0%" },
    { width: deux }
], {
    duration: 2000,
})
actifUn.animate([
    { width: "0%" },
    { width: un }
], {
    duration: 2000,
})









