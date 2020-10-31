let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  const createToy = document.querySelector("#create-toy");
  createToy.addEventListener('click', addNewToy);

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const fetchToys = () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  //.then(json => console.log(json));
  .then(json => renderToys(json));

}

const renderToys = (toys) => {
  const collection = document.getElementById('toy-collection')

  toys.forEach(toy => {
    const card = `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" id=${toy.id}+${toy.likes}>Like <3</button>
      </div>`
    collection.innerHTML += card;
  })

  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(element=> element.addEventListener("click",function(){
    console.log(element)
    const value = element.id.split("+");
    const currentId = value[0];
    const currentLikes = value[1];
   // console.log(value);
    increaseLikes(currentId, currentLikes)
  }))

}


const addNewToy = () => {

  const toyName = document.querySelector("#name").value;
  const toyImage = document.querySelector("#image").value;

  let toyData = {
    name: toyName,
    image: toyImage,
    likes: 0
  };

  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

  fetch('http://localhost:3000/toys', configurationObject)
  .then(resp => resp.json())
  .then(json => renderToys(json))
  .catch(err => console.log(err));
}


const increaseLikes = (id, likes) => {
  console.log(id)
  console.log(likes)
  let updatedLikes = parseInt(likes)+1;
  
  console.log(updatedLikes)


  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: updatedLikes
    })
  })


}
