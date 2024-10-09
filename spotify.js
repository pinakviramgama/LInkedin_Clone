// Select elements
const profMenu = document.querySelector(".profile-menu-wrap");
const profileImg = document.querySelector(".nav-profile-img");
const post = document.querySelector("#post");
const posting = document.getElementById("myTextarea"); // Correct ID selector
const likes = document.querySelectorAll("#like"); // Note the plural form

// Check if elements are found
if (!profMenu || !profileImg || !post || !posting || !likes.length) {
  console.error(
    "One or more elements were not found. Please check your selectors."
  );
}

// Function to toggle the profile menu
function toggleMenu() {
  if (profMenu) {
    profMenu.classList.toggle("open-menu");
  }
}

// Toggle menu when profile image is clicked
if (profileImg) {
  profileImg.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents the click from bubbling up to the document
    toggleMenu();
  });
}

// Close the menu when clicking anywhere outside of it
document.addEventListener("click", function (event) {
  if (
    profMenu &&
    profileImg &&
    !profMenu.contains(event.target) &&
    !profileImg.contains(event.target)
  ) {
    profMenu.classList.remove("open-menu");
  }
});

// Handle like button click with delayed class addition and removal
likes.forEach(function (like) {
  like.addEventListener("click", function () {
    like.classList.add("bigger");
    setTimeout(function () {
      like.classList.remove("bigger");
    }, 1000); // Remove the class after 1 second
  });
});

// Handle post button click
post.addEventListener("click", function () {
  // Check if the posting content is empty or just whitespace
  if (posting.value.trim() === "") {
    alert("Empty post");
  } else {
    alert("Post Successful");
    posting.value = ""; // Clear the textarea
  }
});
