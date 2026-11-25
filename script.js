
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

boutonStart.addEventListener(eventType, startGame);