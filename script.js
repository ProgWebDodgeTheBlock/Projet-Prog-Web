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

function reordonnerClassement() {
    // Fonction réorganisant la table de classement en fonction du score des joueurs
    // À compléter
}

class Tentative {
    constructor(Joueur, temps, score) {
        this.Joueur = Joueur;
        this.temps = temps;
        this.score = score;
    }
    ajouter() {
        // Ajout d'une nouvelle ligne de tentative dans la table de classement
        const tableTentatives = document.getElementById("table-classement");
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



// Gestion du bouton de démarrage du jeu
const boutonStart = document.getElementById("bouton-start");
const eventType = "click";

// Fonction appelée quand on clique sur le bouton de démarrage
function startGame() {
    // Au cas où, pour débugger, on affiche un message dans la console
    console.log("Le jeu a commencé !");
    boutonStart.removeEventListener(eventType, startGame); // On retire l'EventListner pour éviter de démarrer le jeu plusieurs fois
    boutonStart.style.display = "none"; // On cache le bouton de démarrage
}

// On ajoute l'EventListener pour le bouton de démarrage
boutonStart.addEventListener(eventType, startGame);

const joueurTest = new Joueur("Test");
const tentativeTest = new Tentative(joueurTest, "00:30", 100);
tentativeTest.ajouter();

console.log("Tentative ajoutée pour le joueur : " + joueurTest.pseudo);