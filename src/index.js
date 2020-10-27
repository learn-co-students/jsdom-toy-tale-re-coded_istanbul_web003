let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", function (e) {
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
      }),
    });
  });
});

function fetchToy() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((json) => showCards(json));
}

function showCards(data) {
  const toyCollection = document.getElementById("toy-collection");
  // data.forEach((card) => {
  //  // console.log(card);
  //   const newDiv = document.createElement("div");
  //   newDiv.innerHTML = `<h2>${card.name}</h2>
  //   <img src=${card.image} class="toy-avatar" />
  //   <p> Likes </p>
  //   <button class="like-btn">${card.likes} <3</button>`;

  //   newDiv.classList.add("card");
  //   toyCollection.appendChild(newDiv);

  // });

  for (let i = 0; i < data.length; i++) {
    toyCollection.innerHTML += `<div class= "card">
      <h2>${data[i].name}</h2>
      <img src=${data[i].image} class="toy-avatar">
      <p>${data[i].likes} likes </p>
      <button class="like-btn" id="${data[i].id}">Like <3</button>
  </div>`;
  }

  const likeBtns = document.querySelectorAll(".like-btn");

  likeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const numberOfLikes =
        parseInt(e.target.previousElementSibling.innerText) + 1;
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: numberOfLikes,
        }),
      };

      fetch(`//localhost:3000/toys/${e.target.id}`, configObj)
        .then((response) => response.json())
        .then((json) => console.log(json));
    });
  });
}

fetchToy();