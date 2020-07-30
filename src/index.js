document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  let card = document.createElement("div");
  card.classList.add("card");
  let submit = document.querySelector(".submit");
  let toyCollection = document.querySelector("#toy-collection");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", (e) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const fetchToys = async () => {
    const response = await fetch("http://localhost:3000/toys");
    const toys = await response.json();
    renderToys(toys);
  };
  fetchToys();

  const renderToys = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      toyCollection.innerHTML += `<div class= "card">
        <h2>${arr[i].name}</h2>
        <img src=${arr[i].image} class="toy-avatar">
        <p>${arr[i].likes} likes </p>
        <button class="like-btn" id="${arr[i].id}">Like <3</button>
    </div>`;
      console.log(arr[i]);
    }
    const likeBtns = document.querySelectorAll(".like-btn");
    likeBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const numberOfLikes =
          parseInt(e.target.previousElementSibling.innerText) + 1;

        console.log(numberOfLikes);

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
  };

  submit.addEventListener("click", (e) => {
    let newToy = {
      name: document.querySelectorAll(".input-text")[0].value,
      image: document.querySelectorAll(".input-text")[1].value,
      likes: "0",
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy),
    };

    fetch("http://localhost:3000/toys", configObj)
      .then((response) => response.json())
      .then((json) => console.log(json));
  });
});
