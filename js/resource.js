let resourceId = new URLSearchParams(window.location.search).get("id");

let postWrapper = document.querySelector('#resource-1');

let postBox = [];



function getPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${resourceId}`)
    .then((response) => response.json())
    .then((data) => {
    

    postBox = data
    renderUI(postBox)
  })

}

getPosts();


function renderUI (arr) {
    let resourceId = '';
         arr.forEach(post => {
             resourceId +=
                `
                <div id= "resource-1">
                <div class="col-lg-6 mt-5">
                <div class="bg-dark px-3 py-3">
                    <h5 class="write text-center text-danger">${post.title}</h5>
                    <p class="blog text-light">${post.body}</p>
                </div>
               </div>
               </div>
             `
});
postWrapper.innerHTML = resourceId;
}
