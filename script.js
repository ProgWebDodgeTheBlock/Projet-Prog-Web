class Jeu {
    constructor() {
        this.difficulté = "Facile";
    }
    modifier_difficulté(difficulté) {
        this.difficulté = difficulté;
    }
    recupererDifficulté() {
        return this.difficulté;
    }
}

class Joueur {
    constructor(pseudo) {
        this.pseudo = pseudo;
        this.nombreTentatives = 0;
    }
    // Fonction s'utilisant pour mettre à jour le nombre de tentatives du joueur et récupérer le numéro de la prochaine tentative
    recupererProchaineTentative() {
        this.nombreTentatives++;
        return this.nombreTentatives;
    }
}

function max(a,b) {
    if (a > b) {
        return a;
    }
    else {
        return b;
    }
}


function Interclassement(tableau1, tableau2) {
    let tab_classé = [];

    while (tableau1.length > 0 || tableau2.length > 0) {

        if (tableau1.length > 0 && tableau2.length > 0) {

            // Le score est la 3ème cellule d'une table
            if (Number(tableau1[0].cells[2].textContent) > Number(tableau2[0].cells[2].textContent)) {
                tab_classé.push(tableau1.shift());
            }
            else {
                tab_classé.push(tableau2.shift());
            }

        }
        else if (tableau1.length > 0) {
            tab_classé.push(tableau1.shift());
        }
        else {
            tab_classé.push(tableau2.shift());
        }
    }

    return tab_classé;
}

// Comme en Algo :)
function TriFusionPourClassement(lignes) {

    const taille_tableau = lignes.length;

    if (taille_tableau <= 1) {
        return lignes;
    }

    // Partie Diviser

    const milieu = Math.floor(taille_tableau / 2);

    const tableau1 = TriFusionPourClassement(lignes.slice(0, milieu));
    const tableau2 = TriFusionPourClassement(lignes.slice(milieu));

    // Partie Régner

    return Interclassement(tableau1, tableau2);
}


function reordonnerClassement() {

    const table = document.querySelector("#table-classement tbody");

    const lignes = Array.from(table.querySelectorAll("tr"));

    const lignes_triées = TriFusionPourClassement(lignes);

    for (let i = 0; i < lignes_triées.length; i++) {
        table.appendChild(lignes_triées[i]);
    }
}


class Tentative {
    constructor(Joueur, temps, score) {
        this.Joueur = Joueur;
        this.temps = temps;
        this.score = score;
    }
    ajouter() {
        // Ajout d'une nouvelle ligne de tentative dans la table de classement
        const tableTentatives = document.querySelector("#table-classement tbody");
        const nouvelleLigne = document.createElement("tr");
        const colonnePseudo = document.createElement("td");
        const colonneNumTentative = document.createElement("td");
        const colonneScore = document.createElement("td");
        const colonneTemps = document.createElement("td");

        colonnePseudo.textContent = this.Joueur.pseudo;
        colonneNumTentative.textContent = this.Joueur.recupererProchaineTentative();
        colonneTemps.textContent = this.temps;
        colonneScore.textContent = this.score;

        // Il faut bien respecter l'ordre des colonnes : Pseudo, Numéro tentative, Score, Temps
        nouvelleLigne.appendChild(colonnePseudo);
        nouvelleLigne.appendChild(colonneNumTentative);
        nouvelleLigne.appendChild(colonneScore);
        nouvelleLigne.appendChild(colonneTemps);
        

        tableTentatives.appendChild(nouvelleLigne);

        // On réordonne les tentatives dans le classement après l'ajout d'une nouvelle tentative en fonction du score
        reordonnerClassement();
    }
}



// Gestion des boutons
const boutonStart = document.querySelector("#bouton-start");
const eventType = "click";
const formDifficulté = document.querySelector("#form-difficulte");

// Fonction appelée quand on clique sur le bouton de démarrage
function startGame() {
    // Au cas où, pour débugger, on affiche un message dans la console
    console.log("Le jeu a commencé !");
    boutonStart.removeEventListener(eventType, startGame); // On retire l'EventListner pour éviter de démarrer le jeu plusieurs fois
    boutonStart.style.display = "none"; // On cache le bouton de démarrage
}

// Fonction appelée quand on change le niveau de difficulté
function changerDifficulté(jeu, formulaire) {
    // Récupère les données du formulaire
    const formData = new FormData(formulaire);

    // Récupère la difficulté choisie
    const difficulte = String(formData.get("difficulte"));
    jeu.modifier_difficulté(difficulte);
    console.log(String(jeu.recupererDifficulté()));
}

let jeu = new Jeu;

// Eventlisteners
formDifficulté.addEventListener("submit", changerDifficulté(jeu, formDifficulté));
boutonStart.addEventListener(eventType, startGame);

const joueurTest = new Joueur("Test");
const tentativeTest = new Tentative(joueurTest, "00:30", 100);
tentativeTest.ajouter();

console.log("Tentative ajoutée pour le joueur : " + joueurTest.pseudo);