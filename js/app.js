let postWrapper = document.querySelector('#post-holder');
let title = document.querySelector('#title')
let body = document.querySelector('#body')
let postForm = document.querySelector('#post-form')

let postBox = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
    console.log(postBox)
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

getPosts()


function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
    {
        method: 'DELETE',
    }) .then((response) => response.json())
    .then((data) => {
    console.log(data)
    postBox = postBox.filter((e) => e.id !== id);
    let postHolder = ""
    console.log(postBox)

    postBox.forEach(post =>{
        postHolder +=
        `
        <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card">
                            <div class="card-body bg-dark text-light">
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
    postWrapper.innerHTML = postHolder
});
}

function updatePost() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify({
            id:1,
            title: title.value,
            body: body.value,
            userId: 2,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data)=> {
        console.log(postBox)
        postBox.forEach(post =>{
            postHolder +=
            `
            <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card bg-light">
                                <div class="card-body text-dark">
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
        postWrapper.innerHTML = postHolder
    });
    }



function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
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
        let postHolder = '';
        postBox.push(data)
        console.log(postBox)
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

        postWrapper.innerHTML = postHolder
    });
}
