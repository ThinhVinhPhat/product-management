const News  = require("../../model/news.model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")
const { default: mongoose } = require("mongoose")
const validate = require("../../validate/tilte_create.validate")
const Product_category = require("../../model/product.category.model")
const createTree = require("../../helper/createTree")
const Account = require("../../model/account.model")


module.exports.index = async(req,res)=>{
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
    const countnews = await News.countDocuments(find)
    const pagination = paginationhelper(
        {
            currentPage: 1,
            limitofProduct: 4,
        },
        req.query,
        countnews
    )


    // chức năng sort
    const sort = {}
    if(req.query.sort  && req.query.position) {
        sort[req.query.sort] = req.query.position
    }
    else{
        sort["price"] = "asc"

    }

    const news = await News.find(
        find).sort(sort).limit(4).skip(pagination.skip)

    for(const onenew of news){
        // tìm ra user tạo sản phẩm
        const user = await Account.findOne({
            _id: onenew.createdBy.account_id,
            deleted: false
        })
        if(user){
            news.user_name = user.fullname
        }
        // tìm ra user cập nhật gần đây nhất
       const latestUpdate = onenew.UpdatedBy.slice(-1)[0]
       if(latestUpdate){

           const user_update = await Account.findOne({
               _id: latestUpdate.account_id,
               deleted: false
           }) 
           if(user_update){
            news.user_update = user_update.fullname
           }
       }
    }

    res.render("admin/pages/news/index",{
        title: "Danh sách bài viêt",
        records: news,
        filterStatus: filterStatus,
        keyword: findObject.keyword,
        pagination: pagination
    })
}

module.exports.create = async(req,res)=>{

    const find = {
        deleted: false
    }
    
    const categories = await Product_category.find(find)

    const sorted_categories = createTree.tree(categories)

  
    res.render("admin/pages/news/create",{
        title: "Tạo mới bài viêt",
        categories: sorted_categories,
    })
}

module.exports.createPost = async(req,res)=>{
    if(res.locals.role.permission.includes("product_create")){
    req.body.createdBy = {
        account_id: res.locals.user.id,
        createdAt: Date.now()
    }

    const news = new News(req.body)
    await news.save()
    req.flash("success","Tạo thành công")
    res.redirect("back")
}
else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}


module.exports.edit = async(req,res)=>{
    const id = req.params.id;

    const find = {
        deleted: false
    }
    
    const categories = await Product_category.find(find)

    const sorted_categories = createTree.tree(categories)

    const news= await News.findOne({
        deleted: false,
        _id: id
    })
  
    res.render("admin/pages/news/edit",{
        title: "Tạo mới bài viêt",
        product: news,
        categories: sorted_categories,
    })
}

module.exports.editPatch = async(req,res)=>{
    if(res.locals.role.permission.includes("product_edit")){
    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    

    const id = req.params.id
    
    await News.updateOne({_id:id},{...req.body, $push:{UpdatedBy: UpdateAt}})
    req.flash("success","Cập nhật thành công")
    res.redirect("back")
}else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}

}


module.exports.changestatus = async (req,res)=>{
    if(res.locals.role.permission.includes("product_edit")){
    const id = req.params.id
    const status = req.params.status

    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    


    await News.updateOne({_id: id},{status: status,$push:{UpdatedBy: UpdateAt}})
    req.flash("success","Cập nhật thành công")
    res.redirect("back")

}
else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}
module.exports.delete = async (req,res)=>{
    if(res.locals.role.permission.includes("product_delete")){
    const id = req.params.id
  

    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    


    await News.deleteOne({_id: id})
    req.flash("success","Xóa thành công")
    res.redirect("back")

}else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}
}

module.exports.detail = async(req,res)=>{
    const id = req.params.id

    const find ={
        deleted: false,
        _id: id
    }

    const product = await News.findOne(find);


    res.render("admin/pages/news/detail", {
        title: "Chi tiết sản phẩm",
        product: product
    })
}