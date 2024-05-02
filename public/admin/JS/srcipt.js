// tạo query cho nút sort

const sort_button = document.querySelectorAll("[button-status]")

if(sort_button.length >0){
    let url = new URL(window.location.href)
    sort_button.forEach(buttons =>{
        buttons.addEventListener("click", ()=>{
            const status = buttons.getAttribute("button-status")
            
            if(status){

                url.searchParams.set("status",status);
            }
            else{
                
                url.searchParams.delete("status");
            }

            window.location.href = url.href

        })
    })
}



// tạo query cho thanh tìm kiếm 

const file_search = document.getElementById("form-search")

if(file_search){
    const url = new URL(window.location.href)
    file_search.addEventListener("submit", (e) =>{
        e.preventDefault()
        console.log(e);
        const keyword = e.target.keyword.value;
    
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword")}
        
            window.location.href = url.href
    })

}


// tạo query cho thanh trang
const paginationEl = document.querySelectorAll("[button-pagination]")

if(paginationEl.length >0){

    paginationEl.forEach(buttons => {
        buttons.addEventListener("click",()=>{
            const pagerespond  = buttons.getAttribute("button-pagination")
            const url = new URL(window.location.href)
            if(pagerespond) {
                url.searchParams.set("page",pagerespond)
            }
            else{
                url.searchParams.delete("page")
            }
           window.location.href = url.href
        })
    })
}

// tạo chức năng điều chỉnh hoạt động/dừng hoạt động
const statusButtonEL = document.querySelectorAll("[button-change-status]")
const formEL = document.querySelector("#form-change-status")
const data_path = formEL.getAttribute("product-path")
statusButtonEL.forEach(button =>{
    button.addEventListener("click",()=>{
        const currentStatus = button.getAttribute("pro_status")
        const id= button.getAttribute("pro_id")

        let  changestatus = currentStatus
        if(currentStatus == "active") {
            changestatus ="inactive" 
       }
       else if(currentStatus == "inactive") {
        changestatus ="active" 
       }       
       
       formEL.action = data_path + `/${changestatus}/${id}` + "?_method=PATCH"
       
       formEL.submit()


    })
})



// tạo param cho checkall



const tableEL = document.querySelector("[checkbox-multi]");
if(tableEL){
    const CheckALLEL = document.querySelector("input[name='checkall']")
    const ChecklistEL = document.querySelectorAll("input[name='id']")

    CheckALLEL.addEventListener("click",()=>{

        if(CheckALLEL.checked){
            ChecklistEL.forEach(check => {
                check.checked = true;
            } )
        }
        else{
            ChecklistEL.forEach(check => {
                check.checked = false;
            } )
        }
        
    })

    ChecklistEL.forEach(check => {
        check.addEventListener("click",()=>{
            const checkCount = tableEL.querySelectorAll("input[name='id']:checked").length
 
            if(checkCount == ChecklistEL.length){
                CheckALLEL.checked = true;
            }
            else{
                CheckALLEL.checked = false;
            }


        })
    })

    const formEL = document.querySelector("#form-change-multi")
    
    if(formEL){
        formEL.addEventListener("submit",(e)=>{
            e.preventDefault()
            const checkCount = tableEL.querySelectorAll("input[name='id']:checked")
            const chooseEL = document.getElementsByName("type")

            const choose_value = e.target.elements.type.value;

            if(choose_value === "delete_all"){
                const is_Confirm = confirm("Bạn có muốn xóa những trường này không (những trường này sẽ được chuyển vào thùng rác)")
                
                if(!is_Confirm)
                return;
            }   
        // thay đổi thứ tực của sản phẩm
            if(checkCount.length >0){
                const ids= []
                const inputids= document.querySelector("input[name='ids']")
            checkCount.forEach(check =>{
                const id = check.value;
            
                if(choose_value == "change-postion") {
                    
                    const changeEL = check.closest("tr").querySelector("input[name='postion']").value
                    

                    ids.push(`${id}-${changeEL}`)
                    
                }
                else{

                    ids.push(id);
                }

            })

            inputids.value = ids.join(", ")

            formEL.submit();
            }
            else{
                alert("bạn chưa đánh trường nào cả")
            }

        })
    }

}

