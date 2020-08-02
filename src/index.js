let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection= document.querySelector("#toy-collection")
  const submitBtn= document.querySelectorAll(".submit");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  submitBtn[0].addEventListener('click', () => {
    let textInput= document.querySelectorAll(".input-text");
    console.log(textInput[0]);
    console.log(textInput[1]);
    fetch("http://localhost:3030/toys",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": textInput[0],
        "image": textInput[1],
        "likes": 0
      })
    })
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      console.log(object);
    })
    .catch(function(error){
      console.log(error.message);
    })
  })

  fetch("http://localhost:3030/toys")
  .then(function(response){
  return response.json()
})
  .then(function(object){
  for (const toy in object){
    let toyDiv= document.createElement('div');
    let toyName= document.createElement('h2');
    let toyImg= document.createElement('img');
    let toyLikes= document.createElement('p');
    let toyBtn= document.createElement('button');
    toyName.innerText= object[toy].name;
    toyImg.src= object[toy].image;
    toyImg.style.width= '55%';
    toyImg.style.height= 'auto';
    toyImg.style.display= 'flex';
    toyImg.style.justifyContent= 'center';
    toyLikes.innerText= `${object[toy].name} has ${object[toy].likes} likes`;
    toyBtn.classList.add('like-btn')
    toyBtn.innerText= 'Like <3'
    toyDiv.classList.add('card');
    toyCollection.appendChild(toyDiv);
    toyDiv.appendChild(toyName);
    toyDiv.appendChild(toyImg);
    toyDiv.appendChild(toyLikes);
    toyDiv.appendChild(toyBtn);

}});
});
