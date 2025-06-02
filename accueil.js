// Quand le contenu HTML est chargé
document.addEventListener('DOMContentLoaded', () => {
  // === Bouton "Découvrir les formations" ===
  const formationButton = document.querySelector('.cta-button:not(.start-now)');
  if (formationButton) {
    formationButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'Crée_formations.html';
    });
  }

  // === Bouton "Créer ton compte" ===
  const createAccountButton = document.querySelector('.dark');
  if (createAccountButton) {
    createAccountButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'Connexion.html';
    });
  }

  // === Bouton "Commencer maintenant" ===
  const startNowButton = document.querySelector('.start-now');
  if (startNowButton) {
    startNowButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'videos.html';
    });
  }

  // === Animation au survol de boutons ===
  const buttons = document.querySelectorAll('.cta-button, .dark');
  buttons.forEach(bouton => {
    bouton.addEventListener('mouseenter', () => {
      bouton.style.transform = 'scale(1.05)';
      bouton.style.transition = 'transform 0.2s ease';
    });

    bouton.addEventListener('mouseleave', () => {
      bouton.style.transform = 'scale(1)';
    });
  });

  // === Navigation via les liens du menu ===
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (href && href.endsWith('.html')) {
        event.preventDefault(); // Facultatif : évite les comportements par défaut
        window.location.href = href;
      }
    });
  });
});
