let postContainer = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];



function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
    postBox = data
    renderUI(postBox)
  })

}

getPosts();

//create post
postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
                }
    })
    .then((response) => response.json())
    .then((data)=> {
        
        postBox.unshift(data)
        
        let postHolder = '';
        postBox.forEach(post => {
            postHolder += `
                <div class="col-lg-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <p>${post.id}</p>
                            <h6 id="post-title" class="write">${post.title}</h6>
                            <p id="post-body" class="blog">${post.body}</p>
                            <div class="d-flex justify-content-between">
                                 <button class="btn btn-outline-primary write create-btn" id="view-btn onclick="viewPost(${post.id})">View</button>
                                 <button class="btn btn-outline-danger write" onclick="deletePost(${post.id})">Delete</button>
                                <button class="btn btn-outline-primary write" onclick="updatePost(${post.id})">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
           `
        });
        postContainer.innerHTML = postHolder;
    })
}


//update post
function updatePost(id) {

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('#post-title') 
            let postBodies = document.querySelectorAll('#post-body')
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })
             
        });

}

/*function openSpace(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        localStorage.setItem('viewedPost', JSON.stringify(data))
        window.location.href = 'myspace.html'
        //console.log(data)
    });
}*/


//delete post

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method: 'DELETE',
    }) 
    .then((response) => response.json())
    .then((data) => {
        postBox = postBox.filter(post => post.id !== id)
        
    renderUI(postBox)
    })
}
    
    function renderUI (arr) {
        let postHolder = '';
             arr.forEach(post => {
                 postHolder +=
                    `
                    <div class="col-lg-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body bg-dark text-light">
                                <p class="blog">${post.id}</p>
                                <h4 id="post-title" class="text-center text-primary">${post.title}</h4>
                                <p id="post-body" class="blog">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                <button class="btn btn-outline-danger write" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-outline-danger write" onclick="deletePost(${post.id})">Delete</button>
                                    <a href="resource1.html?id=${post.id}"><button class="btn btn-outline-primary write">View Post</button></a>
                             </div>
                            </div>
                        </div>
                    </div>
                 `
    });
    postContainer.innerHTML = postHolder;
}
