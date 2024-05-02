// Form xóa tạm thời 

const delbuttonEL = document.querySelectorAll("[delete_buttons]")

if(delbuttonEL.length >0) {
    delbuttonEL.forEach(button =>{
        button.addEventListener("click", ()=>{
            const is_Confirm  = window.confirm("Bạn có muốn xóa sản phẩm này không (Sản phẩm sẽ được chuyển vào thùng rác)?")

            if(is_Confirm){
                const formEL = document.querySelector("#form-delete")
                const path = formEL.getAttribute("product-path")
                const id = button.getAttribute("pro_id")
                
                formEL.action = path + `/${id}` + "?_method=DELETE"
                formEL.submit()
            }
            

        })
    })
}


// Image-Upload field
const uploadImage = document.querySelector("[upload-image]");


    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    
        uploadImageInput.addEventListener("change",(e)=>{
           const file = e.target.files[0]
           if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
           }
        })

// show alert
const show_alertEL = document.querySelector("[show-alert]");
   

if(show_alertEL){
    const time = parseInt( show_alertEL.getAttribute("data-time"))
    const close = document.querySelector("[close-alert]")
    setTimeout(()=>{
        show_alertEL.classList.add("alert-hidden")
    },time)

    close.addEventListener("click",()=>{
        show_alertEL.classList.add("alert-hidden")
    })
}