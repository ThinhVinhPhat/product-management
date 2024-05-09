const Roles = require("../../model/roles.model")



module.exports.index = async (req,res)=>{

    const find = {
        deleted: false
    }


    const records = await Roles.find(find)

    res.render("admin/pages/roles/index",{
        title: "Trang nhóm quyền",
        records: records
    })
}



module.exports.create = async (req,res)=>{
   

      res.render("admin/pages/roles/create",{
        title: "Trang nhóm quyền"
    })
}


module.exports.createPost = async (req,res)=>{ 


    const role = new Roles(req.body)
    console.log(req.body)
    await role.save()

    res.send("OK")
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
    const id= req.params.id

    console.log(req.body)
    await Roles.updateOne({id},req.body)
    res.redirect("back")
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
    const permission = JSON.parse(req.body.permission)

    for (const item of permission) {
        const id = item.id
        const permission = item.permission

        await Roles.updateOne({_id: id},{permission: permission})

    }

    req.flash("success","Cập nhật quyền thành công")
    res.redirect("back")
}