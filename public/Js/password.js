

const password = document.querySelector("[password]")
const eye = document.querySelector("[showpassword]")

eye.addEventListener("mouseover",()=>{
    eye.className = 'fa-regular fa-eye position-absolute'
})
eye.addEventListener("mouseout",()=>{
    eye.className = 'fa-solid fa-eye position-absolute'
})

eye.addEventListener("click",()=>{
    if(password.type == "password"){
        password.type = "text"
    }
    else if(password.type == "text"){
        password.type = "password"
    }
})