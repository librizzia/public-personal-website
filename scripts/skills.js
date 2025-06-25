document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skills-card");
  const skillGrid = document.querySelector(".skill-grid");
  let activeSkills = [];

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Update the click event to handle removing the card from the active list
      if (card.classList.contains("skill-active")) {
        card.classList.remove("skill-active");
        activeSkills = activeSkills.filter((activeCard) => activeCard !== card);

        // Reset the icon to plain
        const icon = card.querySelector("i");
        if (icon.classList.contains("colored")) {
          icon.classList.replace("colored", "plain");
        }

        // Remove the number from the card
        const numberBadge = card.querySelector(".number-badge");
        if (numberBadge) {
          numberBadge.remove();
        }
      } else {
        card.classList.add("skill-active");
        activeSkills.push(card);

        // Add a number to the card
        const numberBadge = document.createElement("span");
        numberBadge.classList.add("number-badge");
        numberBadge.textContent = activeSkills.length;
        card.appendChild(numberBadge);
      }

      // Check if all cards are active
      if (activeSkills.length === skillCards.length) {
        skillGrid.classList.add("celebrate");

        // Remove celebrate and skill-active classes in order
        setTimeout(() => {
          activeSkills.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove("skill-active");

              // Remove the number from the card
              const numberBadge = card.querySelector(".number-badge");
              if (numberBadge) {
                numberBadge.remove();
              }

              // Reset the icon to plain
              const icon = card.querySelector("i");
              if (icon && icon.classList.contains("colored")) {
                icon.classList.replace("colored", "plain");
              }

              if (index === activeSkills.length - 1) {
                skillGrid.classList.remove("celebrate");
                activeSkills = [];
              }
            }, index * 500); // Delay for each card
          });
        }, 1000); // Wait for celebrate animation to complete
      }
    });
  });

  // Update the mouseenter and mouseleave events to check if the card is active
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("skill-active")) {
        const icon = card.querySelector("i");
        if (icon.classList.contains("plain")) {
          icon.classList.replace("plain", "colored");
        }
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("skill-active")) {
        const icon = card.querySelector("i");
        if (icon.classList.contains("colored")) {
          icon.classList.replace("colored", "plain");
        }
      }
    });
  });
});