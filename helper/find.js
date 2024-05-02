module.exports = (query) => {
   const findObject = {
     keyword : ""
   }

    if(query.keyword){
        findObject.keyword = query.keyword;

      
    }
    else{
      
    }

    return findObject;
}