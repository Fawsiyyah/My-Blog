let resourceId = new URLSearchParams(window.location.search).get("id");
console.log(resourceId);

let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')

let postBox = [];



function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
    console.log(postBox)

    //let postHolder = ''
    postBox = data
    renderUI(postBox)
  })

}

getPosts();


function renderUI (arr) {
    let postHolder = '';
         arr.forEach(post => {
             postHolder +=
                `
                <div class="col-lg-6 mt-5">
                <div class="bg-dark px-3 py-3">
                    <h5 class="write text-center text-danger">${post.title}</h5>
                    <p class="blog text-light">${post.body}</p>
                </div>
              </div>
             `
});
postWrapper.innerHTML = postHolder;
}
