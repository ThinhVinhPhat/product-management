// Form xóa tạm thời và vĩnh viễn

const delbuttonEL = document.querySelectorAll("[delete_buttons]")

if(delbuttonEL.length >0) {
    delbuttonEL.forEach(button =>{
        button.addEventListener("click", ()=>{
            const is_Confirm  = window.confirm("Bạn có muốn xóa vĩnh viễn sản phẩm này không ?")

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

// Form khôi phục sản phẩm

const recoverbuttonEL = document.querySelectorAll("[recover_buttons]")

if(recoverbuttonEL.length >0) {
    recoverbuttonEL.forEach(button =>{
        button.addEventListener("click", ()=>{
            const is_Confirm  = window.confirm("Bạn có muốn khôi phục sản phẩm này không ?")

            if(is_Confirm){
                const formEL = document.querySelector("#form-recover")
                const path = formEL.getAttribute("product-path")
                const id = button.getAttribute("pro_id")
                
                formEL.action = path + `/${id}` + "?_method=PATCH"
                formEL.submit()
            }
            

        })
    })
}