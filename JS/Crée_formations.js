document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const endBtn = document.getElementById("end-btn");
  const fieldSection = document.getElementById("field-section");
  const optionsContainer = document.getElementById("options-container");
  const formationSelect = document.getElementById("formation-select");

  let formationEnabled = false;  // Variable pour savoir si la formation est active

  // Bouton "Commencer"
  startBtn.addEventListener("click", function () {
    formationEnabled = true;

    // On cache les options et on affiche le terrain + joueurs
    optionsContainer.style.display = "none";
    fieldSection.style.display = "block";

    // On désactive le bouton "Commencer" pour éviter plusieurs clics
    startBtn.disabled = true;

    // On affiche le bouton "Terminer"
    endBtn.style.display = "inline-block";

    // On récupère la formation sélectionnée dans le select
    const selectedFormation = formationSelect.value;

    // On affiche la formation sur le terrain
    setFormation(selectedFormation);
  });

  // Bouton "Terminer"
  endBtn.addEventListener("click", function () {
    formationEnabled = false;

    // Désactive le bouton "Terminer" et change son texte
    endBtn.disabled = true;
    endBtn.textContent = "✅ Formation terminée";

    alert("Formation verrouillée !");
  });

  /**
   * Fonction principale qui affiche une formation sur le terrain
   * @param {string} type - Type de formation ("4-4-2", "mourinho", "custom", etc.)
   */
  function setFormation(type) {
    if (!formationEnabled) {
      alert('Clique d\'abord sur "Commencer" pour afficher le terrain.');
      return;
    }

    const playersContainer = document.getElementById("players-container");
    playersContainer.innerHTML = "";  // On vide les joueurs précédents

    let formation = [];

    // Définitions des positions en pourcentages (x: horizontal, y: vertical)
    if (type === "4-4-2") {
      formation = [
        { x: 45, y: 90 }, // Gardien
        { x: 20, y: 70 }, { x: 35, y: 70 }, { x: 55, y: 70 }, { x: 70, y: 70 }, // Défenseurs
        { x: 20, y: 47 }, { x: 35, y: 47 }, { x: 55, y: 47 }, { x: 70, y: 47 }, // Milieux
        { x: 35, y: 30 }, { x: 55, y: 30 }  // Attaquants
      ];
    } else if (type === "4-3-3") {
      formation = [
        { x: 45, y: 90 },
        { x: 20, y: 70 }, { x: 35, y: 70 }, { x: 55, y: 70 }, { x: 70, y: 70 },
        { x: 25, y: 47 }, { x: 45, y: 47 }, { x: 65, y: 47 },
        { x: 25, y: 30 }, { x: 45, y: 30 }, { x: 65, y: 30 }
      ];
    } else if (type === "mourinho") {
      formation = [
        { x: 45, y: 90 },
        { x: 20, y: 70 }, { x: 35, y: 70 }, { x: 55, y: 70 }, { x: 70, y: 70 },
        { x: 35, y: 55 }, { x: 55, y: 55 },
        { x: 25, y: 35 }, { x: 45, y: 35 }, { x: 65, y: 35 },
        { x: 45, y: 20 }
      ];
    } else if (type === "guardiola") {
      formation = [
        { x: 45, y: 90 },
        { x: 30, y: 70 }, { x: 45, y: 70 }, { x: 60, y: 70 },
        { x: 35, y: 60 }, { x: 55, y: 60 },
        { x: 25, y: 45 }, { x: 40, y: 45 }, { x: 60, y: 45 }, { x: 75, y: 45 },
        { x: 45, y: 25 }
      ];
    } else if (type === "custom") {
      formation = [{ x: 45, y: 90 }]; // Gardien au centre bas

      // Ajoute 10 joueurs aux positions aléatoires (pour un style libre)
      for (let i = 0; i < 10; i++) {
        formation.push({
          x: Math.random() * 80 + 10,  // entre 10% et 90%
          y: Math.random() * 60 + 10   // entre 10% et 70%
        });
      }
    }

    // Création des éléments joueurs et activation du drag & drop
    formation.forEach((pos, i) => {
      const playerEl = document.createElement("div");
      playerEl.classList.add("player");
      playerEl.textContent = i + 1;         // numéro du joueur
      playerEl.style.left = `${pos.x}%`;    // position horizontale
      playerEl.style.top = `${pos.y}%`;     // position verticale

      enableDrag(playerEl);                  // active le drag & drop
      playersContainer.appendChild(playerEl);
    });
  }

  /**
   * Active le drag & drop pour un élément joueur
   * @param {HTMLElement} el - Élément joueur à rendre déplaçable
   */
  function enableDrag(el) {
    el.addEventListener("mousedown", function (e) {
      const field = document.getElementById("field-section");

      // Calcul du décalage entre le clic et le coin supérieur gauche du joueur
      const shiftX = e.clientX - el.getBoundingClientRect().left;
      const shiftY = e.clientY - el.getBoundingClientRect().top;

      // Fonction pour déplacer le joueur selon la position de la souris
      function moveAt(pageX, pageY) {
        // On positionne en pixels, en tenant compte de la position du terrain
        el.style.left = (pageX - field.offsetLeft - shiftX) + "px";
        el.style.top = (pageY - field.offsetTop - shiftY) + "px";
      }

      // Écoute le déplacement de la souris pour bouger le joueur
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      // Quand on relâche la souris, on enlève l'écouteur de mouvement
      el.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        el.onmouseup = null;
      };
    });

    // Empêche le drag natif du navigateur (ex: images)
    el.ondragstart = () => false;
  }
});
