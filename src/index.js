let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCard = document.getElementById("toy-collection");
const newToy = document.getElementsByClassName("add-toy-form")[0];

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

// document.addEventListener("DOMContentLoaded", function() {
//   fetchToys();
// });

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!

fetchToys = () => {
  fetch("http://localhost:3000/toys")
    .then(res => {
      return res.json();
    })
    .then(arr => {
      clearCards();
      displayToys(arr);
    })
    .catch(err => {
      console.log(err);
    });
};

createToy = toy => {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(response => fetchToys())
    .catch(err => {
      console.log(err);
    });
};

newToy.addEventListener("submit", e => {
  e.preventDefault();

  const toy = {
    name: newToy.name.value,
    image: newToy.image.value,
    likes: 0
  };

  createToy(toy);
});

displayToys = toys => {
  toys.forEach(toy => {
    toyCard.appendChild(displayCard(toy));
  });
};

displayCard = toy => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`;
  card.querySelector("button").addEventListener("click", () => {
    toy.likes++;
    card.querySelector("p").innerText = `${toy.likes} Likes`;
    sendRequest(toy);
  });
  return card;
};

clearCards = () => {
  toyCard.innerHTML = "";
};

sendRequest = toy => {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(response)
    .catch(err => {
      console.log(err);
    });
};