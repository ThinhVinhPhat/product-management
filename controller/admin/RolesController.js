const Roles = require("../../model/roles.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")


module.exports.index = async (req,res)=>{

    const find = {
        deleted: false
    }

    // thanh lọc sản phẩm
    const filterStatus = filterStatuHelper(req.query);

    if (req.query.status) {
        find.status = req.query.status
    }
    // kết thúc lọc



    // thanh tìm kiếm
    const findObject = findHelper(req.query);

    if (findObject.keyword) {
        const regex_keyword = new RegExp(findObject.keyword, "i")
        find.title = regex_keyword;
        req.flash("find", "Đã tìm thấy");
    }
    // kết thúc tìm kiếm




    // thanh chuyển trang
    const countProduct = await Roles.countDocuments(find)
    const pagination = paginationhelper(
        {
            currentPage: 1,
            limitofProduct: 4,
        },
        req.query,
        countProduct
    )


    // chức năng sort
    const sort = {}
    if(req.query.sort  && req.query.position) {
        sort[req.query.sort] = req.query.position
    }
    else{
        sort[req.query.sort] = "desc"

    }


   const records = await Roles.find(
       find).sort(sort).limit(4).skip(pagination.skip)

    res.render("admin/pages/roles/index",{
        title: "Trang nhóm quyền",
        records: records,
        pagination: pagination,
        filterStatus: filterStatus,
        keyword: findObject.keyword
    })
}



module.exports.create = async (req,res)=>{
   

      res.render("admin/pages/roles/create",{
        title: "Trang nhóm quyền"
    })
}


module.exports.createPost = async (req,res)=>{ 
    if(res.locals.role.permission.includes("roles_create")){

    req.body.createdBy = {
        account_id: res.locals.user.id,
        createdAt: Date.now()
    }
    
    const role = new Roles(req.body)
    console.log(req.body)
    await role.save()

    res.redirect("back")
}
else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}


module.exports.edit = async (req,res)=>{
    const id= req.params.id

    const find = {
        deleted: false,
        _id: id
    }

    const record = await Roles.findOne(find)

    res.render("admin/pages/roles/edit",{
      title: "Trang nhóm quyền",
      record: record
  })
}


module.exports.editPost = async (req,res)=>{
    if(res.locals.role.permission.includes("roles_edit")){

    const id= req.params.id

   
    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    
    
    console.log(req.body)
    await Roles.updateOne({ _id: id }, {...req.body, $push: {UpdatedBy: UpdateAt }});
    res.redirect("back")
}
else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}



module.exports.permission = async (req,res) =>{

    const find = {
        deleted: false
    }

    const record = await Roles.find(find)

    res.render("admin/pages/roles/permission",{
        title: "Phân quyền",
        records: record
    })
} 

module.exports.permissionPatch = async (req,res) =>{
    if(res.locals.role.permission.includes("roles_role")){

    const permission = JSON.parse(req.body.permission)

    for (const item of permission) {
        const id = item.id
        const permission = item.permission

        await Roles.updateOne({_id: id},{permission: permission})

    }

    req.flash("success","Cập nhật quyền thành công")
    res.redirect("back")
} else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}


module.exports.delete = async (req,res) =>{
    const id  = req.params.id

    await Roles.deleteOne({_id: id})
a

    req.flash("success","Xóa thành công")
    res.redirect("back")
}

module.exports.detail = async (req,res) =>{
    const id = req.params.id


    const find = {
        deleted: false,
        _id: id
    }
    
    const role = await Roles.findOne(find)

    res.render("admin/pages/roles/detail",{
        title: "Chi tiết nhóm quyền",
        role: role
    })

}