let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];



function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
    console.log(data)

    let postHolder = ''
    postBox = data;
    postBox.forEach(post => {
        postHolder += `
       <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card bg-dark">
                            <div class="card-body text-light">
                                <p>${post.id}</p>
                                <h4 id="post-title" class="text-center text-primary">${post.title}</h4>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-primary" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                                    <button class="btn btn-outline-primary" onclick="viewPost"(${post.id})">View post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    });
    postWrapper.innerHTML = postHolder;
  });

}
getPosts();

//create post
postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
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
        console.log(data)
        postBox.unshift(data)
        console.log(postBox)
        let postHolder = '';
        postBox.forEach(post => {
            postHolder += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <p>${post.id}</p>
                            <h6 id="post-title">${post.title}</h6>
                            <p id="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                                <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
           `
        });
        postWrapper.innerHTML = postHolder;
    })
}


//update post
function updatePost(id) {
    console.log(id)

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
    .then((data)=> {
        console.log(data)
        let postTitles = document.querySelectorAll('.post-title')
        let postBodies = document.querySelectorAll('.post-body')
        console.log(postTitles)
        postTitles.forEach((postTitle, index) => {
            if (index + 1 === id) {
                if (data.title !== ""){
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

function openSpace(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        localStorage.setItem('viewedPost', JSON.stringify(data))
        window.location.href = 'myspace.html'
        //console.log(data)
    });
}

function renderSingle() {
    let newObject = localStorage.getItem('viewedPost')
    console.log(newObject);
    let post = JSON.parse(newObject)
    console.log(post)
    // console.log(post.title)
    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
}

renderSingle();

//delete post

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method: 'DELETE',
    }) 
    .then((response) => response.json())
    .then((data) => {
    console.log(data)
    postBox = postBox.filter(post => post.id !== id)
    console.log(postBox)
    
    renderUI(postBox)
    })
}
    
    function renderUI (arr) {
        let postHolder = '';
             arr.forEach(post => {
                 postHolder +=
                    `
                    <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body bg-dark text-light">
                                <p>${post.id}</p>
                                <h4 id="post-title" class="text-center text-primary">${post.title}</h4>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-primary" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                                    <button class="btn btn-outline-primary" onclick="viewPost"(${post.id})"><a href="resource.html">View post</a></button>
                             </div>
                            </div>
                        </div>
                    </div>
                 `
    });
    postWrapper.innerHTML = postHolder;
}
