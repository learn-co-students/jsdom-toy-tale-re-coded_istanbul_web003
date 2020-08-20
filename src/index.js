let addToy = false;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const url = 'http://localhost:3000/toys';
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {// SHOW FORM 
    e.preventDefault();
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  //SHOWCASE ALL TOYS-GET REQUEST
  
    fetch(url)
    .then(response=> response.json())
    .then(function(allToys) {
      console.log(allToys);
      for (const toy of allToys){  
        //create the dom elements
        const toyCollection = document.getElementById("toy-collection");
        const divCard =document.createElement("div");
        const heading = document.createElement("h2");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const btn = document.createElement("button");
    
        //add attributes and sources to dom elements
        divCard.className = "card";
        btn.className = "like-btn";
        img.alt = "toy-avatar";
        img.style.width= "15em";
        //img.style.margin="0, auto"; ?????????
        img.style.paddingLeft="25px";
        img.src = toy.image;
        heading.innerText= toy.name;
        p.innerText = toy.likes;
        btn.innerText = "LIKE";
        btn.style.padding= "15px 25px";
    
        // Append tags to the dom
        toyCollection.appendChild(divCard);
        divCard.appendChild(heading);
        divCard.appendChild(img);
        divCard.appendChild(p);
        divCard.appendChild(btn);
        
        //increase likes
        btn.addEventListener('click', function(e){
          e.preventDefault();
          console.log('patch')
          increaseLike(toy.id, toy.likes);
          console.log(toy.id)
        })
      
      }// for loop end!!!!
    })
    .catch(error => console.log(error.message));
    

    //INCREASE LIKES- PATCH REQUEST

    function increaseLike(id, likes) {
      let formDataPatch = {
        likes:  likes+1
      }
      let confObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formDataPatch)
      }
      console.log(id)
      
      fetch(`${url}/${id}`, confObj)
      
    }


    // ADD NEW TOY - POST REQUEST

    const formAddToy = document.querySelector('form');
    const name = document.querySelector('[name="name"]');
    const imgUrl = document.querySelector('[name="image"]');
    formAddToy.addEventListener('submit', function(e){
      e.preventDefault();
      console.log('add new toy')
      let formData = {
        name: name.value,
        image: imgUrl.value,
        likes: 0
      }
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }
      fetch(url, configObj)
      .then(response=> response.json())
      .then(obj=>console.log(obj))
      .catch(err=> err.message)

    })
    
    
});   
   