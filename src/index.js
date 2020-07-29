let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection");
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

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => {
      for(const object of json){
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const img = document.createElement("img");
        const likeButton = document.createElement("button");
        likeButton.classList.add("like-btn");
        div.classList.add("card");
        img.classList.add("toy-avatar");

        toyCollection.appendChild(div);

        console.log(object);

        h2.innerHTML= object["name"];
        div.appendChild(h2);

        p.innerHTML=`${object["likes"]} likes.`;
        div.appendChild(p);

        img.src = `${object["image"]}`;
        div.appendChild(img);

        likeButton.innerHTML= "Like <3"
        div.appendChild(likeButton);
        likeButton.addEventListener("click", (e)=>{
          object["likes"]+=1
          p.innerHTML=`${object["likes"]} likes.`;
          
        })
      }});

  
  const toyForm = document.querySelector(".add-toy-form");

  

 
toyForm.addEventListener("submit", (e)=>{
  const toyName = document.getElementsByClassName("name")[0].value;
  const toyImageUrl = document.getElementsByClassName("image")[0].value;
  e.preventDefault();
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      name : toyName,
      image : toyImageUrl,
      likes : 0
    })
})
  .then(resp=> resp.json())
  .then(json => console.log(json))
})

})


