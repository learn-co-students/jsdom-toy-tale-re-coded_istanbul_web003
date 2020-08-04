let addToy = false;
//When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
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
  
  const toyCollictionDiv = document.querySelector("#toy-collection");
  const addToyForm = document.querySelector(".add-toy-form");
  const newToyNameInput = document.querySelector(".add-toy-form [name=name]");
  const newToyImageInput = document.querySelector(".add-toy-form [name=image]");
  
  

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => {
    toyCollictionDiv.innerHTML += `
    <div class="card" toyId="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes </p>
    <button class="like-btn" liked="false">Like <3</button>
  </div>
  `
  }));

  addToyForm.addEventListener("submit", e =>{
    e.preventDefault()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newToyNameInput.value,
        image: newToyImageInput.value,
        likes: 0
      })
    })
  })

  
  toyCollictionDiv.addEventListener("click", e => {
    if (e.target.className === "like-btn"){
      const toyId = e.target.parentElement.getAttribute("toyId")
      if (e.target.getAttribute("liked")=== "false"){
        console.log(object);
        e.target.setAttribute("liked", "ture")
        e.target.parentElement.children[2].children[0].innerText++
      } else if (e.target.getAttribute("liked")=== "true"){
        e.target.setAttribute("liked", "false")
        e.target.parentElement.children[2].children[0].innerText--
      }
      let toylikes = e.target.parentElement.children[2].children[0].innerText
      console.log(toyId)
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toylikes
        })
      })
    }
    
  })
});
