// Sample data for mathematical definitions
const definitions = [
  {
    id: "quadratic-formula",
    term: "Quadratic Formula",
    definition: "The solution to the quadratic equation \\( ax^2 + bx + c = 0 \\) is given by:",
    formula: "\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]",
    image: "images/quadratic_formula.png", // Replace with actual image paths
    tips: "Remember that the discriminant \\( b^2 - 4ac \\) determines the nature of the roots.",
    examples: "Solve \\( x^2 - 5x + 6 = 0 \\) using the quadratic formula."
  },
  {
    id: "pythagorean-theorem",
    term: "Pythagorean Theorem",
    definition: "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
    formula: "\\[ a^2 + b^2 = c^2 \\]",
    image: "images/pythagorean_theorem.png",
    tips: "Often used to calculate distances in coordinate geometry.",
    examples: "Find the length of the hypotenuse when the other sides are 3 and 4 units."
  },
  // Add more definitions as needed
];

// Function to display definitions
function displayDefinitions(items) {
  const container = document.getElementById('definitionsList');
  container.innerHTML = '';
  items.forEach((item, index) => {
    const definitionItem = document.createElement('div');
    definitionItem.className = 'definition-item';
    definitionItem.id = item.id;

    definitionItem.innerHTML = `
      <div class="definition-title" data-index="${index}">
        ${item.term}
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="definition-content" id="content-${index}">
        <div class="definition-section">
          <h6>Definition</h6>
          <p>${item.definition}</p>
        </div>
        ${item.formula ? `
        <div class="definition-section">
          <h6>Formula</h6>
          <p>${item.formula}</p>
        </div>` : ''}
        ${item.image ? `
        <div class="definition-section">
          <h6>Illustration</h6>
          <img src="${item.image}" alt="${item.term}">
        </div>` : ''}
        ${item.tips ? `
        <div class="definition-section">
          <h6>Tips and Tricks</h6>
          <p>${item.tips}</p>
        </div>` : ''}
        ${item.examples ? `
        <div class="definition-section">
          <h6>Examples</h6>
          <p>${item.examples}</p>
        </div>` : ''}
      </div>
    `;
    container.appendChild(definitionItem);
  });

  // Attach event listeners for toggling content
  document.querySelectorAll('.definition-title').forEach(title => {
    title.addEventListener('click', () => {
      const index = title.getAttribute('data-index');
      const content = document.getElementById(`content-${index}`);
      const icon = title.querySelector('i');

      if (content.style.display === 'block') {
        content.classList.remove('slide-down');
        content.classList.add('slide-up');
        setTimeout(() => {
          content.style.display = 'none';
          content.classList.remove('slide-up');
        }, 500);
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
        content.style.display = 'block';
        content.classList.add('slide-down');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        // Re-render MathJax when content is displayed
        MathJax.typesetPromise([content]);
      }
    });
  });
}

// Initial display of all definitions
displayDefinitions(definitions);

// Smooth Scrolling for Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredDefinitions = definitions.filter(def => {
    return def.term.toLowerCase().includes(searchString) ||
           def.definition.toLowerCase().includes(searchString) ||
           (def.tips && def.tips.toLowerCase().includes(searchString)) ||
           (def.examples && def.examples.toLowerCase().includes(searchString));
  });
  displayDefinitions(filteredDefinitions);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Load user's theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});
