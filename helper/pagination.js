module.exports = (pagination,query,countProduct) => {
    if(query.page){
        pagination.currentPage =parseInt(query.page ) ;
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitofProduct

    console.log(countProduct);
    const totalPage = Math.ceil(countProduct/pagination.limitofProduct);
    pagination.totalPage = totalPage;


    return pagination;
}