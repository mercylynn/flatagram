// write your code here
/*const postUrl="http://localhost:3000/posts"
const commentUrl="http://localhost:3000/comments"
Const profileUrl="http://localhost:3000/profile"*/
document.addEventListener("DOMContentLoaded", function(){
    renderImage();
    function renderImage(){
        return fetch('http://localhost:3000/images/1')
         .then(resp => resp.json())
         .then((data) => {
            document.querySelector('#card-image').src=data.image
            document.querySelector('#card-title').innerHTML = data.title
         });
        }

        fetch('http://localhost:3000/images/1')
        .then(resp => resp.json())
        .then((data) =>{
            addLikes(data)
              })

    function addLikes(data){

        const likesCounter = document.querySelector('.likes')
        likesCounter.innerText =`${data.likes} likes `
        const likeButton = document.querySelector('.like-button')
        likeButton.addEventListener('click', function(event){
        likesCounter.innerText = incrementLikes(data)
        })
    }

            

            function incrementLikes(image){
                let like = 0
                fetch (`http://localhost:3000/images/${image.id}`)
                .then(resp => resp.json())
                .then((data) => {
                    likes = data.likes
                })
                let newLikes = likes + 1
            
                fetch('http://localhost:3000/images/1',{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        "likes": newLikes
                    })
            
                })
            
                let likesText = `${newLikes} likes`
                return likesText
            }


            
            renderComments();
            function renderComments(){
                return fetch('http://localhost:3000/images/1')
                 .then(resp => resp.json())
                 .then((data) => {
                    data.comments.forEach(comment => {
                    commentList=document.createElement('li')
                    commentList.innerHTML= comment.content;
                    document.querySelector('#comments-list').appendChild(commentList)
            
                    });
            
                    
                commentForm=document.querySelector('#comment-form')
                commentForm.addEventListener('submit', (e)=>{
                    e.preventDefault();
                 commentInput=document.querySelector('#comment')
                
                console.log(commentInput);
                 commentList=document.createElement('li');
                commentList.textContent=commentInput.value;
                document.querySelector(".comments").appendChild(commentList) 
                let newComment = {
                    id: data.comments.length+1,
                    imageId: 1,
                    content: commentInput.value
                } 
            
                data.comments.push(newComment);
                
                fetch('http://localhost:3000/images/1', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(`Error: ${err}`));
            
            fetch('http://localhost:3000/comments/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newComment)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(`Error: ${err}`));
            
           // commentForm.reset();
            
                })
                    
            
                 });
                }

            

})