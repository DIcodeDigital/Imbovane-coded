document.getElementById("year").textContent = new Date().getFullYear();

const slides = [
  {
    img: "Images/boardroom.png",
    title: "SMME Shaped Solutions",
    text: "We are specialists in business and we apply our full range of talent to creating the perfect solution for each client’s needs.",
  },
  {
    img: "Images/IMG-20240605-WA0016(1).jpg",
    title: "Business Planning",
    text: "Compile structured and bankable business plans with built in growth opportunities.",
  },
  {
    img: "Images/strategy.jpeg",
    title: "Strategic Planning",
    text: "Determine business identity and strategy formulation. Compile strategic plans with clear goals and objectives.",
  },
  {
    img: "Images/IMG-20241122-WA0026(1).jpg",
    title: "Business Coaching",
    text: "Skills transfer for ease of doing business and attaining business compliance with access to reliable budgets, accounting information and financial data.",
  },
];

let currentSlide = 0;
const layers = document.querySelectorAll("#HeroSection .slide-layer");
const heroContent = document.querySelector("#heroContent");
const indicators = document.querySelector("#slideIndicators");

// Preload images
slides.forEach((slide) => {
  new Image().src = slide.img;
});

function renderIndicators() {
  indicators.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentSlide) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    indicators.appendChild(dot);
  });
}

function animateHeroContent() {
  heroContent.classList.remove("animate");
  void heroContent.offsetWidth;
  heroContent.classList.add("animate");
}

function showSlide(index = currentSlide) {
  const nextSlide = index % slides.length;
  const [layer1, layer2] = layers;

  // Determines which layer is currently active
  const activeLayer = layer1.classList.contains("active") ? layer1 : layer2;
  const inactiveLayer = layer1.classList.contains("active") ? layer2 : layer1;

  // Sets next image on inactive layer
  inactiveLayer.style.backgroundImage = `url('${slides[nextSlide].img}')`;
  inactiveLayer.classList.add("active");

  activeLayer.classList.remove("active");

  // Update content
  heroContent.querySelector("h1").textContent = slides[nextSlide].title;
  heroContent.querySelector("p").textContent = slides[nextSlide].text;

  animateHeroContent();

  currentSlide = nextSlide;
  renderIndicators();
}

animateHeroContent();

// Initialize
layers[0].style.backgroundImage = `url('${slides[0].img}')`;
layers[0].classList.add("active");
heroContent.querySelector("h1").textContent = slides[0].title;
heroContent.querySelector("p").textContent = slides[0].text;
renderIndicators();

// Interval
setInterval(() => {
  showSlide(currentSlide + 1);
}, 7500);

window.addEventListener("load", () => {
  const nav = document.querySelector("#MainHeader nav");
  const logo = document.querySelector("#MainHeader .brand");
  const buttons = document.querySelector("#MainHeader .auth-buttons");

  setTimeout(() => nav.classList.add("fade-in"), 400);
  setTimeout(() => logo.classList.add("fade-in"), 800);
  setTimeout(() => buttons.classList.add("fade-in"), 1600);
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#AboutSection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("animate");
          observer.unobserve(aboutSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(aboutSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const serviceSection = document.querySelector("#ServiceSection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          serviceSection.classList.add("animate");
          observer.unobserve(serviceSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(serviceSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const strategySection = document.querySelector("#StrategySection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          strategySection.classList.add("animate");
          observer.unobserve(strategySection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(strategySection);
});

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector("#StatsSection");
  const statNumbers = statsSection.querySelectorAll(".stat-item h2");

  statNumbers.forEach((num) => {
    const orig = num.textContent.trim();
    const target = parseInt(orig.replace(/[^0-9]/g, ""), 10) || 0;
    const suffix = orig.replace(/[0-9\s,.,-]/g, "") || "";
    num.dataset.target = target;
    num.dataset.suffix = suffix;
    num.textContent = `0${suffix}`;
  });

  function animateCountUp(el, target, duration = 1500, suffix = "") {
    let startTime = null;
    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsSection.classList.add("animate");

          statNumbers.forEach((num, i) => {
            const target = parseInt(num.dataset.target, 10) || 0;
            const suffix = num.dataset.suffix || "";
            setTimeout(
              () => animateCountUp(num, target, 1400, suffix),
              i * 250
            );
          });

          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
});
