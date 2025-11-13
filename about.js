document.addEventListener("DOMContentLoaded", () => {
  const shortcuts = document.querySelectorAll("#MainHeader .navbar-nav li");
  const authButtons = document.querySelector("#MainHeader .auth-buttons");
  const logo = document.querySelector("#MainHeader .brand");

  // Step 1: fade in shortcuts one by one
  shortcuts.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in-shortcuts");
    }, index * 150); // 150ms delay between each shortcut
  });

  // Step 2: fade in auth buttons after shortcuts are done
  const totalShortcutsTime = shortcuts.length * 150 + 600;
  setTimeout(() => {
    authButtons.classList.add("fade-in-auth");
  }, totalShortcutsTime);

  // Step 3: fade in logo last
  setTimeout(() => {
    logo.classList.add("fade-in-logo");
  }, totalShortcutsTime + 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("MainHeader");
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    // When scrolling starts
    header.classList.remove("hidden");
    header.classList.add("visible", "scrolling");

    // Clear any previous timeout
    clearTimeout(scrollTimeout);

    // Wait 2.8s after scrolling stops
    scrollTimeout = setTimeout(() => {
      header.classList.remove("scrolling");
      header.classList.add("hidden");
      header.classList.remove("visible");
    }, 2800);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bioBox = document.getElementById("BioBox");
  const imageBox = document.getElementById("ImageBox");

  const observerOptions = {
    threshold: 0.3 // triggers when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bioBox.classList.add("visible");
        imageBox.classList.add("visible");
      }
    });
  }, observerOptions);

  observer.observe(document.getElementById("BioSection"));

  const biocontent = document.getElementById("biocontent");
  const bioimg = document.querySelector(".bioimg");

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        biocontent.classList.add("visible");
        bioimg.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  observer2.observe(document.getElementById("BioSect2"));

  const goalTexts = document.querySelectorAll(".goal-text");
  const goalImgs = document.querySelectorAll(".goal-img");

  const goalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const goal = entry.target;

        const text = goal.querySelector(".goal-text");
        const img = goal.querySelector(".goal-img");

        if (text) text.classList.add("visible");
        if (img) img.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  // Observe each goal container
  document.querySelectorAll(".goal").forEach(goal => goalObserver.observe(goal));


  const valueCards = document.querySelectorAll(".value-card");

  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  // Observe each card
  valueCards.forEach(card => valueObserver.observe(card));


  
});

// =================== QUOTE TYPING ANIMATION ===================

const quoteSection = document.querySelector("#QuotationSect");
const quoteText = document.querySelector("#QuoteDiv blockquote");
const quoteAuthor = document.querySelector("#QuoteDiv .author");
const quoteImage = document.querySelector("#QuoteImg img");

let quotePlayed = false; // Prevent re-triggering

function typeWriterEffect(textElement, text, speed = 45, callback) {
  let index = 0;
  textElement.textContent = "";
  
  function type() {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback(); // Run next animation step
    }
  }
  type();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !quotePlayed) {
      quotePlayed = true;

      // Save the full quote and clear it before typing
      const fullText = quoteText.textContent.trim();
      quoteText.textContent = "";

      // Hide author and image initially
      quoteAuthor.style.opacity = "0";
      quoteAuthor.style.transform = "translateY(20px)";
      quoteImage.style.opacity = "0";
      quoteImage.style.transform = "translateY(40px)";
      
      // Type quote
      typeWriterEffect(quoteText, fullText, 45, () => {
        // Fade in author after typing
        quoteAuthor.classList.add("fade-in-author");
        setTimeout(() => {
          // Fade in image last
          quoteImage.classList.add("fade-in-image");
        }, 800);
      });

      observer.unobserve(quoteSection);
    }
  });
}, { threshold: 0.4 });

observer.observe(quoteSection);

const exploreSection = document.querySelector("#ExploreServices");
const exploreH2 = exploreSection.querySelector("h2");
const exploreP = exploreSection.querySelector("p");
const exploreBtn = exploreSection.querySelector(".explore-btn");

const exploreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start typing animation
      exploreH2.style.animation = "typing 2s steps(30, end) forwards";

      // Fade in paragraph after typing animation
      setTimeout(() => {
        exploreP.classList.add("visible");
      }, 2000); // matches typing duration

      // Fade in button after paragraph
      setTimeout(() => {
        exploreBtn.classList.add("visible");
      }, 2400);
      
      // Stop observing once triggered
      exploreObserver.unobserve(exploreSection);
    }
  });
}, { threshold: 0.3 });

exploreObserver.observe(exploreSection);


const opportunitySection = document.querySelector("#OpportunitySect");
const opportunityText = opportunitySection.querySelector(".opportunity-text");
const opportunityImage = opportunitySection.querySelector(".opportunity-image");

const opportunityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Slide in text from left
      opportunityText.classList.add("visible", "from-left");

      // Slide in image from right after slight delay
      setTimeout(() => {
        opportunityImage.classList.add("visible");
        opportunityImage.style.transform = "translateX(50px)";
        // Override the transform to slide from right
        requestAnimationFrame(() => {
          opportunityImage.style.transform = "translateX(0)";
        });
      }, 300);

      // Stop observing
      opportunityObserver.unobserve(opportunitySection);
    }
  });
}, { threshold: 0.3 });

opportunityObserver.observe(opportunitySection);