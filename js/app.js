let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];

/*let postsArray = {}
const titleInput = document.getElementById("title")
const bodyInput = document.getElementById("body")
const form = document.getElementById("post-form")*/


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

//delete post
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

    postBox.forEach(post => {
        postHolder +=
        `
        <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body bg-dark text-light">
                                <p>${post.id}</p>
                                <h4 id="post-title" class="text-center text-primary">${post.title}</h4>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                             </div>
                            </div>
                        </div>
                    </div>
        `
    });
    postWrapper.innerHTML = postHolder
});
}

//update post
function updatePost() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify({
        title: title.value,
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
                                        <button class="btn btn-outline-primary" onclick="viewPost"(${post.id})"><a href="resource.html">View post</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
        });
        postWrapper.innerHTML = postHolder
    });
    }

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

/*document.getElementById("post-form").addEventListener("submit", funtion(e)); {
    e.prevenDefault ()
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        titleInput: title,
        bodyInput: body
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then((res) => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()

        form.reset()
    })
}*/ 
