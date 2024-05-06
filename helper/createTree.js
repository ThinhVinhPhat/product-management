let count = 0;

const CreateTree = (arr , parentID = "") =>{
    const tree = []
    arr.forEach((item) =>{
        if(item.danhmuccha_id === parentID) {
            count++;
            const Newitem = item
            Newitem.index = count;
            const children = CreateTree(arr,item.id);

            if(children.length >0 ){
                Newitem.children = children;

            }
            tree.push(Newitem)
        }

    })
    return tree;
}




module.exports.tree = (arr , parentID = "")=>{
    count=0;
    const tree = CreateTree(arr,parentID = "");
    return tree;
}