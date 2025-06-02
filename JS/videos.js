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

    const createAccountButton = document.querySelector('.dark');

        if (createAccountButton) {
            createAccountButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'Connexion.html';
    });
  }
