let addToy = false;
const toys = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch(toys)
.then(resp => resp.json())
.then(json => renderToys(json));

function renderToys(data){
  data.forEach(toy=>{
    document.querySelector("#toy-collection").innerHTML += `
    <div class = "card"
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src=${toy.image} alt="toy picture" width="150" height="150" />
      <button class="like-btn" id=${toy.id} >Like</button>
      <p class=toy-${toy.id}>${toy.likes} Likes</p>
    </div>
    `
})

document.querySelectorAll(".like-btn").forEach(el => el.addEventListener("click",(e)=>{
  let curr = document.querySelector(`.toy-${e.target.id}`).innerText;

  curr = (parseInt(curr.match(/\d/g)[0]))+1
  document.querySelector(`.toy-${e.target.id}`).innerText = `${curr} Likes`

  fetch(`${toys}${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: curr
    })
  })
}))
