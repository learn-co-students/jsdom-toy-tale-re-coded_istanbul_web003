let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      submitNewToy();

      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetchToys();

});

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    organizeToys(json);

  })
  .catch(function(error){
    console.log(error.message);
  })
}
function organizeToys(toys){
  const toyCollection = document.querySelector("#toy-collection");

 
  toys.forEach(toy => {
    const card = document.createElement("div");
    card.className = "card";
  
    const h2 = document.createElement("h2");
  
    const img = document.createElement("img");
    img.className = "toy-avatar";
  
    const p = document.createElement("p");
  
    const button = document.createElement("button");
    button.className = "like-btn";
  
    
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    toyCollection.appendChild(card);
  
    h2.innerText = toy.name;
    img.setAttribute("src", toy.image);
    p.innerText = `${toy.likes} Likes `;

    button.addEventListener("click", function(e){
      toy.likes++
      p.innerText = `${toy.likes} Likes `
      updateLikes(toy.likes, toy.id);
    });
  
  });
}

function sendToys(toyName, toyImg){
  let toyData = {
    name: toyName,
    image: toyImg,
    likes: 0
  }
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };
  fetch("http://localhost:3000/toys", configObj);
}

function submitNewToy(){
const inputs = document.querySelectorAll(".input-text");
const submit = document.querySelector(".submit");
submit.addEventListener("click", function(e){
  e.preventDefault();
  sendToys(inputs[0].value, inputs[1].value);
  //location.reload(); ask about this ?? it only adds one time
})
}


function updateLikes(input, id){
  let likeData = {
    likes: input
  }
  let configObj = {
    method : "PATCH",
    headers :  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body : JSON.stringify(likeData)
  };
  fetch(`http://localhost:3000/toys/${id}`, configObj);
}

