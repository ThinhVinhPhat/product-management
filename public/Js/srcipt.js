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


const inputQuantity = document.querySelectorAll("input[name=quantity]")
inputQuantity.forEach(input =>{
    input.addEventListener("change",(e)=>{
        const product_id = input.getAttribute("product_id");
        const value = e.target.value
        
        if(value >0){
            window.location.href =`/cart/update/${product_id}/${value}`
        }
        else{
            window.location.href =`/cart/delete/${product_id}`
        }

    })
})