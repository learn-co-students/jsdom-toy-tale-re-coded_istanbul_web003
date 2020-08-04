let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector("input.submit");
  const likeBtns = document.querySelectorAll(".like-btn");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyForm.addEventListener('click', function (evt) {
    evt.preventDefault();

    const toyName = document.querySelector('input[name="name"]');
    const toyImage = document.querySelector('input[name="image"]');

    const toy = {
      name: toyName.value,
      image: toyImage.value,
      likes: 0
    };

    addNewToy(toy);
  });

  fetchToys();
});

function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => renderToys(toys))
    .then((toyCards => addLikeBtnListener(toyCards)))
    .catch(err => console.log(err));
}

function renderToys(toys) {
  clearToys();

  for (const toy of toys) {
    renderToy(toy);
  }

  return document.querySelectorAll(".card");
}

function clearToys() {
  const toyCollection = document.querySelector('#toy-collection');
  toyCollection.innerHTML = ``;
}

function renderToy(toy) {
  const toyCollection = document.querySelector('#toy-collection');
  const toyCard = `
    <div class="card" data-toyID="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `;

  toyCollection.innerHTML += toyCard;

}

function addNewToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)

  }).then(resp => resp.json())
    .then(toy => renderToy(toy))
    .catch(err => console.log(err))
}

function addLikeBtnListener(cards) {
  for (const card of cards) {
    card.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("like-btn")) {
        const card = evt.target.parentNode;
        const toyLikes = parseInt(card.children[2].innerText);
        console.log(toyLikes);
        const toyID = card.getAttribute('data-toyid');
        updateToyLikes(toyID, toyLikes);
      }
    });
  }
}

function updateToyLikes(toyID, currentLike) {
  return fetch(`http://localhost:3000/toys/${toyID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": ++currentLike
    })
  }).then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}