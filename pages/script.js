// script.js

// Sample data for mathematical definitions
const definitions = [
  {
    id: "continuous-functions",
    term: "\\( \\text{Continous functions } \\mathcal{C}([0, 1])  \\)",
    definition:
      "\\( C([0, 1]) \\) is the set of all continuous real-valued functions defined on the closed interval \\([0, 1]\\). Formally, it is expressed as: \\[ C([0, 1]) = \\left\\{ f : [0, 1] \\rightarrow \\mathbb{R} \\mid f \\text{ is continuous on } [0, 1] \\right\\} \\]",
    formula: "", // No specific formula needed here
    image: "", // No image, but you can add one if desired
    tips: "Continuous functions have no breaks, jumps, or discontinuities within the interval \\([0, 1]\\).",
    examples:
      "Examples include \\( f(x) = x \\), \\( f(x) = x^2 \\), and \\( f(x) = \\sin(\\pi x) \\).",
    plotFunction: true, // Flag to indicate that a plot should be included
  },
  {
    id: "normed-spaces",
    term: "\\( \\text{Normed Spaces } (U, || \\cdot ||_p) \\)",
    definition:
      "A norm on a vector space U over K is a function \\( || \\cdot ||: U \\rightarrow \\mathbb{R} \\) with the following properties:<br>" +
      "1. <i>Positivity: </i> \\( ||u|| \\geq 0 \\) for all \\( u \\in U \\), and \\( ||u|| = 0 \\) if and only if \\( u = 0 \\).<br>" +
      "2. <i>Homogeneity:</i>  \\( ||\\lambda u|| = |\\lambda| ||u|| \\) for all \\( u \\in U \\) and \\( \\lambda \\in \\mathbb K \\).<br>" +
      "3. <i>Triangle Inequality:</i> \\( ||u + v|| \\leq ||u|| + ||v|| \\) for all \\( u, v \\in U \\).",
    formula: "", // The definition includes multiple LaTeX expressions
    image: "", // Optionally, you can add an image illustrating a normed space
    tips: "A vector space together with a norm is called a <b>normed spaced</b>.",
    examples:
      "Euclidean space \\( \\mathbb{R}^n \\) with the standard Euclidean norm: \\( ||x||_2 = \\sum_{i=1}^{n} |x_i|^2 = \\sqrt{x_1^2 + x_2^2 + \\cdots + x_n^2} \\).",
    plotFunction: true,
    intuition:
      "A norm provides a way to quantify the size or length of vectors in a space, enabling the measurement of distances and facilitating the analysis of vector behaviors.",
  },
];

// Function to plot multiple continuous functions on [0, 1]
function plotContinuousFunctions(containerId) {
  // Generate x values from 0 to 1
  let xValues = [];
  for (let x = 0; x <= 1; x += 0.01) {
    xValues.push(x);
  }

  // Define several continuous functions
  let functions = [
    {
      name: "f(x) = x",
      yValues: xValues.map((x) => x),
      color: "#ff7e5f",
    },
    {
      name: "f(x) = x²",
      yValues: xValues.map((x) => x * x),
      color: "#feb47b",
    },
    {
      name: "f(x) = sin(πx)",
      yValues: xValues.map((x) => Math.sin(Math.PI * x)),
      color: "#86A8E7",
    },
    {
      name: "f(x) = √x",
      yValues: xValues.map((x) => Math.sqrt(x)),
      color: "#43cea2",
    },
  ];

  // Prepare the traces for Plotly
  let traces = functions.map((func) => ({
    x: xValues,
    y: func.yValues,
    mode: "lines",
    name: func.name,
    line: { color: func.color },
  }));

  // Define the layout
  let layout = {
    title: "Examples of Continuous Functions on [0, 1]",
    xaxis: { title: "x", range: [0, 1] },
    yaxis: { title: "f(x)" },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#333" },
  };

  // Adjust colors for dark mode
  if (document.body.classList.contains("dark-mode")) {
    layout.font.color = "#ddd";
    layout.xaxis.color = "#ddd";
    layout.yaxis.color = "#ddd";
    layout.title.font = { color: "#ddd" };
  }

  // Plot the graph
  Plotly.newPlot(containerId, traces, layout, { responsive: true });
}

// Function to handle plotting based on definition ID
function plotDefinitionFunction(definitionId) {
  if (definitionId === "continuous-functions") {
    plotContinuousFunctions(`plot-${definitionId}`);
  } else if (definitionId === "normed-spaces") {
    plotNormedSpaces(`plot-${definitionId}`);
  }
}

// Function to plot normed spaces (e.g., unit ball in ℝ²)
function plotNormedSpaces(containerId) {
  // Define points for the unit circle (Euclidean norm)
  const theta = [];
  const xValues = [];
  const yValues = [];
  for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
    theta.push(angle);
    xValues.push(Math.cos(angle));
    yValues.push(Math.sin(angle));
  }

  // Define the trace for the unit circle
  let trace = {
    x: xValues,
    y: yValues,
    mode: "lines",
    type: "scatter",
    name: "Unit Circle (Euclidean Norm)",
    line: { color: "#86A8E7" },
  };

  // Define the layout
  let layout = {
    title: "Unit Ball in ℝ² with Euclidean Norm",
    xaxis: { title: "x", range: [-1.5, 1.5], scaleanchor: "y" },
    yaxis: { title: "y", range: [-1.5, 1.5], scaleratio: 1 },
    aspectratio: { x: 1, y: 1 },
    showlegend: false,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    shapes: [
      {
        type: "circle",
        xref: "x",
        yref: "y",
        x0: -1,
        y0: -1,
        x1: 1,
        y1: 1,
        line: { color: "#ff7e5f", width: 2 },
      },
    ],
    font: { color: "#333" },
  };

  // Adjust colors for dark mode
  if (document.body.classList.contains("dark-mode")) {
    layout.font.color = "#ddd";
    layout.xaxis.color = "#ddd";
    layout.yaxis.color = "#ddd";
    layout.title.font = { color: "#ddd" };
    layout.shapes[0].line.color = "#ff7e5f"; // Maintain line color
  }

  // Plot the graph
  Plotly.newPlot(containerId, [trace], layout, { responsive: true });
}

// Function to display definitions
function displayDefinitions(items) {
  const container = document.getElementById("definitionsList"); // Correct container ID
  container.innerHTML = "";

  items.forEach((item, index) => {
    const definitionItem = document.createElement("div");
    definitionItem.className = "definition-item";
    definitionItem.id = item.id;

    let contentHTML = `
      <div class="definition-title" data-index="${index}">
        ${item.term}
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="definition-content" id="content-${index}" style="display: none;">
        <div class="definition-section">
          <h6>Definisjoner</h6>
          <p>${item.definition}</p>
        </div>
        ${
          item.formula
            ? `
        <div class="definition-section">
          <h6>Formler</h6>
          <p>${item.formula}</p>
        </div>`
            : ""
        }
        ${
          item.image
            ? `
        <div class="definition-section">
          <h6>Illustrasjon</h6>
          <img src="${item.image}" alt="Illustration of ${item.term}">
        </div>`
            : ""
        }
        ${
          item.tips
            ? `
        <div class="definition-section">
          <h6>Tips og Triks</h6>
          <p>${item.tips}</p>
        </div>`
            : ""
        }
        ${
          item.examples
            ? `
        <div class="definition-section">
          <h6>Eksempler</h6>
          <p>${item.examples}</p>
        </div>`
            : ""
        }
        ${
          item.plotFunction
            ? `
        <div class="definition-section">
          <h6>Graphical Representation</h6>
          <div id="plot-${item.id}" class="plot-container"></div>
        </div>`
            : ""
        }
      </div>
    `;
    definitionItem.innerHTML = contentHTML;
    container.appendChild(definitionItem);
  });

  // Attach event listeners for toggling content
  document.querySelectorAll(".definition-title").forEach((title) => {
    title.addEventListener("click", () => {
      const index = title.getAttribute("data-index");
      const content = document.getElementById(`content-${index}`);
      const icon = title.querySelector("i");

      if (content.style.display === "block") {
        // First remove the animation class
        content.classList.remove("slide-down");
        icon.classList.replace("fa-chevron-up", "fa-chevron-down");
        
        // Hide the content immediately
        content.style.display = "none";
        
      } else {
        // Show content first, then animate
        content.style.display = "block";
        content.classList.add("slide-down");
        icon.classList.replace("fa-chevron-down", "fa-chevron-up");
        
        // Re-render MathJax and handle plotting
        MathJax.typesetPromise([content]);
        const plotContainer = content.querySelector(".plot-container");
        if (plotContainer) {
          const definitionId = plotContainer.id.replace("plot-", "");
          plotDefinitionFunction(definitionId);
        }
      }
    });
    MathJax.typesetPromise([title]);
  });
}

// Initialize the display once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  displayDefinitions(definitions);
});

// Smooth Scrolling for Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Search functionality
document.getElementById("searchBar").addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredDefinitions = definitions.filter((def) => {
    return (
      def.term.toLowerCase().includes(searchString) ||
      def.definition.toLowerCase().includes(searchString) ||
      (def.tips && def.tips.toLowerCase().includes(searchString)) ||
      (def.examples && def.examples.toLowerCase().includes(searchString))
    );
  });
  displayDefinitions(filteredDefinitions);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Load user's theme preference
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }

  // Re-render plots to adjust to dark mode colors
  definitions.forEach((item) => {
    if (item.plotFunction) {
      const plotContainer = document.getElementById(`plot-${item.id}`);
      if (plotContainer && plotContainer.dataset.plotted === "true") {
        plotDefinitionFunction(item.id);
      }
    }
  });
});

// Modal functionality
const addDefinitionForm = document.getElementById("addDefinitionForm");

// Update modal initialization
document.getElementById("addDefinitionNav").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("addDefinitionModal"), {
    backdrop: true,
    keyboard: true
  });
  modal.show();
});

// Add cleanup when modal is hidden
document.getElementById("addDefinitionModal").addEventListener("hidden.bs.modal", () => {
  document.body.classList.remove("modal-open");
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.remove();
  }
});

// Handle form submission
addDefinitionForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form values
  const id = document.getElementById("definitionId").value.trim();
  const term = document.getElementById("definitionTerm").value.trim();
  const definition = document.getElementById("definitionText").value.trim();
  const formula = document.getElementById("definitionFormula").value.trim();
  const tips = document.getElementById("definitionTips").value.trim();
  const examples = document.getElementById("definitionExamples").value.trim();
  const intuition = document.getElementById("definitionIntuition").value.trim();
  const plotFunction =
    document.getElementById("definitionPlotFunction").value === "true";

  // Validate required fields
  if (!id || !term || !definition) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create new definition object
  const newDefinition = {
    id,
    term,
    definition,
    formula: formula || "",
    tips: tips || "",
    examples: examples || "",
    intuition: intuition || "",
    plotFunction,
  };

  // Add the new definition to the definitions array
  definitions.push(newDefinition);

  // Refresh the definitions display
  displayDefinitions(definitions);

  // Close the modal using Bootstrap's modal methods
  const modalElement = document.getElementById("addDefinitionModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();

  // Reset the form
  addDefinitionForm.reset();
});
