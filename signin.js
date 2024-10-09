// script.js

// Sample data source
const data = [
  "Nishant Chahar",
  "Abhiruchi Gupta",
  "THAKUR DIPAK",
  "rohit hemani",
  "chudasama pujan",
  "Milan Gohel",
  "Harsh Mer",
  "Krupali Rayani",
  "Tanvi gadhiya",
];

// Get references to DOM elements
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
let highlightedIndex = -1; // To keep track of the highlighted item

// Function to filter and display results
function search() {
  const query = searchInput.value.toLowerCase(); // Capture and normalize user input
  resultsContainer.innerHTML = ""; // Clear previous results

  if (query) {
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    ); // Filter data

    if (filteredData.length > 0) {
      resultsContainer.style.display = "block"; // Show dropdown
      filteredData.forEach((item, index) => {
        const listItem = document.createElement("li"); // Create new list item
        listItem.textContent = item;
        listItem.dataset.index = index; // Store index for keyboard navigation
        listItem.addEventListener("click", () => {
          searchInput.value = item; // Set input value to clicked item
          resultsContainer.style.display = "none"; // Hide dropdown
        });
        resultsContainer.appendChild(listItem); // Add item to dropdown
      });
    } else {
      resultsContainer.style.display = "none"; // Hide dropdown if no results
    }
  } else {
    resultsContainer.style.display = "none"; // Hide dropdown if input is empty
  }
}

// Function to highlight an item based on index
function highlightItem(index) {
  const items = resultsContainer.querySelectorAll("li");
  items.forEach((item) => item.classList.remove("highlighted")); // Remove previous highlight
  if (index >= 0 && index < items.length) {
    items[index].classList.add("highlighted"); // Add highlight to current item
    highlightedIndex = index;
  }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
  const items = resultsContainer.querySelectorAll("li");
  if (items.length === 0) return;

  if (event.key === "ArrowDown") {
    highlightedIndex = (highlightedIndex + 1) % items.length;
    highlightItem(highlightedIndex);
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
    highlightItem(highlightedIndex);
    event.preventDefault();
  } else if (event.key === "Enter") {
    if (highlightedIndex >= 0 && highlightedIndex < items.length) {
      searchInput.value = items[highlightedIndex].textContent;
      resultsContainer.style.display = "none";
    }
  }
}

// Add event listeners
searchInput.addEventListener("input", search);
searchInput.addEventListener("keydown", handleKeyboardNavigation);

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !resultsContainer.contains(event.target)
  ) {
    resultsContainer.style.display = "none";
  }
});
