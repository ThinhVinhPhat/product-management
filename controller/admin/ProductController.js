const Product = require("../../model/product-model")
const filterStatuHelper = require("../../helper/filterStatus")
const findHelper = require("../../helper/find")
const paginationhelper = require("../../helper/pagination")
const { default: mongoose } = require("mongoose")
const validate = require("../../validate/tilte_create.validate")
const Product_category = require("../../model/product.category.model")
const createTree = require("../../helper/createTree")
const Account = require("../../model/account.model")
// moudle display sản phẩm 
module.exports.product = async (req, res) => {

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
    const countProduct = await Product.countDocuments(find)
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
        sort["price"] = "asc"

    }

    const products = await Product.find(
        find).sort(sort).limit(4).skip(pagination.skip)

    for(const product of products){
        // tìm ra user tạo sản phẩm
        const user = await Account.findOne({
            _id: product.createdBy.account_id,
            deleted: false
        })
        if(user){
            product.user_name = user.fullname
        }
        // tìm ra user cập nhật gần đây nhất
       const latestUpdate = product.UpdatedBy.slice(-1)[0]
       if(latestUpdate){

           const user_update = await Account.findOne({
               _id: latestUpdate.account_id,
               deleted: false
           }) 
           if(user_update){
               product.user_update = user_update.fullname
           }
       }
    }


    res.render("admin/pages/product/index", {
        title: "Trang Sản Phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: findObject.keyword,
        pagination: pagination
    })

}


// moudle cho phép thay đổi status của một thuộc tính
module.exports.changestatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    

    req.flash("success", "Cập nhật trạng thái thành công");

    await Product.updateOne({ _id: id }, { status: status , $push:{UpdatedBy: UpdateAt}})

    res.redirect("back")
}



// moudle cho phép thay đổi status của nhiều thuộc tính
module.exports.changemulti = async (req, res) => {
    const reqid = req.body.ids.split(", ");
    const reqstatus = req.body.type

    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }   

    switch (reqstatus) {
        case "active":
            await Product.updateMany({ _id: { $in: reqid } }, { status: "active" ,$push:{UpdatedBy: UpdateAt} })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: reqid } }, { status: "inactive" ,$push:{UpdatedBy: UpdateAt} })
            break;
        case "delete_all":
            await Product.updateMany({ _id: id }, { deleted: true ,deletedBy:{account_id: res.locals.user.id,deletedAt: Date.now()} })
            break;
        case "change-postion":
            for (const item of reqid) {
                const [id, postion] = item.split("-")
                await Product.updateMany({ _id: { $in: id } }, { position: postion, $push:{UpdatedBy: UpdateAt} })
            }

            break;
    }
    req.flash("success", "Cập nhật trạng thái thành công");

    res.redirect("back")
}

// hàm cho phép xóa một sản phẩm tạm thời 
module.exports.delete = async (req, res) => {
    if(res.locals.role.permission.includes("product_delete")){

    const id = req.params.id;

    await Product.updateOne({ _id: id }, { deleted: true ,deletedBy:{account_id: res.locals.user.id,deletedAt: Date.now()} })
    req.flash("delete", "Xóa thành công");
    res.redirect("back")

} else{
        alert("Bạn không có quyền sử dụng chức năng này")
        res.send("403")
    }
}



//hàm thêm mới một sản phẩm
module.exports.create = async (req, res) => {
   

    const find = {
        deleted: false
    }


    const categories = await Product_category.find(find)

    const sorted_categories = createTree.tree(categories)

    res.render("admin/pages/product/create", {
        title: "Thêm mới Sản Phẩm",
        categories: sorted_categories
    })
}

module.exports.createPost = async (req, res) => {
    if(res.locals.role.permission.includes("product_create")){

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock)
    
        if (req.body.position == "") {
            const pro_count = await Product.countDocuments();
    
            req.body.position = pro_count + 1;
        }
        else {
            req.body.position = parseInt(req.body.position);
        }
    
        req.body.createdBy = {
            account_id: res.locals.user.id,
            createdAt: Date.now()
        }
    
        const product = new Product(req.body);
        console.log(req.file)
        await product.save();
    
    
    
        res.redirect("back")
    }
    else{
        alert("Bạn không có quyền sử dụng chức năng này")
        res.send("403")
    }
}




// chỉnh sửa sản phẩm


module.exports.edit = async (req, res) => {

    try {

        const id = req.params.id;

        const find = {
            deleted: false,
            _id: id
        }

        const products = await Product.findOne(find);

        const categories = await Product_category.find({
            deleted: false
        });

     
        const sorted_categories = createTree.tree(categories)
    
        res.render("admin/pages/product/edit", {
            title: "Chỉnh sửa sản phẩm",
            product: products,
            categories: sorted_categories
        })
    }
    catch {
        req.flash("error", "lỗi")
    }

}


module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permission.includes("product_edit")){

    const id = req.params.id;

   
    const UpdateAt = {
        account_id: res.locals.user.id,
        UpdateAt: Date.now()
    }    
    

    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập vào tiêu đề")
        res.redirect("back")
        return;
    }
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = Math.floor(parseInt(req.body.discountPercentage));
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file) {

        req.body.thumbnail = `/upload/${req.file.filename}`
    }
    try {
        await Product.updateOne({ _id: id }, {...req.body, $push: {UpdatedBy: UpdateAt }});
        req.flash("success", "Cập nhật thành công");
        res.redirect("back")
    } catch (error) {
        req.flash("error", "cập nhật thất bại")
    }

}
else{
    alert("Bạn không có quyền sử dụng chức năng này")
    res.send("403")
}

}

// xem chi tiết 1 sản phẩm

module.exports.detail = async(req,res)=>{
    const id = req.params.id

    const find ={
        deleted: false,
        _id: id
    }

    const product = await Product.findOne(find);


    res.render("admin/pages/product/detail", {
        title: "Chi tiết sản phẩm",
        product: product
    })
}