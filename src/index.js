let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch Andy's Toys
document.addEventListener("DOMContentLoaded", getToy());
function getToy() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => renderToys(data));
}
// Add Toy Info to the Card
function renderToys(toys) {
  const toyCollection = document.querySelector("#toy-collection");
  toys.map((toy) => {
    toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.likes}>Like <3</button>
  </div>`;
  });
}
// Add a New Toy

// Increase Toy's Likes
