const table = document.querySelector("[table_permission]")
const button = document.querySelector("[button-submit]")

// thiếp lập để cập nhật quyền bên database
if(table)
{   
    button.addEventListener("click",()=>{
        const permission = []
        const table_tr = table.querySelectorAll("tr")
        table_tr.forEach(tr =>{
            const name = tr.getAttribute("data-name");
            const input = tr.querySelectorAll("input")
            
            if(name == "id"){
                input.forEach(input =>{
                    permission.push({
                        id: input.value,
                        permission: []
                        })
                })
            
            }
            else{
                input.forEach((input,index)=>{
                    const checked = input.checked;
    
                    if(checked){
                        permission[index].permission.push(name)
                    }
                })
            }
    
        })
    
        console.log(permission)

        if(permission.length>0){
            const form = document.querySelector("#form-change-permission")
            const input = form.querySelector("input[name=permission]")

            input.value = JSON.stringify(permission)
            form.submit()
        }

    })

  
}


// dùng để check những quyền đã chọn
const permission = document.querySelectorAll("[data-record]")

permission.forEach((item,index) =>{
    const per_value = JSON.parse(item.getAttribute("data-record")) 

    per_value.forEach((per) =>{
        const row = document.querySelector(`[data-name=${per}]`)
        const input = row.querySelectorAll("input")[index]

        input.checked = true
    })
})  


// dùng cho nút chọn tất cả

const check_all = document.querySelectorAll("[select-all]")

check_all.forEach((check,index)=>{
    const check_button  = check.querySelector(".check_all")  
    check_button.addEventListener("change",()=>{
        const rows = document.querySelectorAll(`[data-name]`)
       rows.forEach(row =>{
        const input = row.querySelectorAll("input")[index]

      input.checked = true
       } )
    })
    
})