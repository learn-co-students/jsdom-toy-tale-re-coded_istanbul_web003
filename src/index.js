let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    function getToys() {
      return fetch('http://localhost:3000/toys')
        .then(response => response.json())
    }
    
    function postToy(toyData) {
      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": toyData.name.value,
            "image": toyData.image.value,
            "likes": 0
    
          })
        })
        .then(response => response.json())
        .then((objToy) => {
          let newToy = renderToys(objToy)
          divCollect.append(newToy)
        })
    }

    function likes(e) {
      e.preventDefault()
      let more = parseInt(e.target.previousElementSibling.innerText) + 1
    
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify({
            "likes": more
          })
        })
        .then(response => response.json())
        .then((likeObj => {
          e.target.previousElementSibling.innerText = ´${more}´
        }))
      }
      

    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
