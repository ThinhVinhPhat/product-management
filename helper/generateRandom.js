module.exports.Random = (length) =>{
    const character = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = ""
    for(var i=0;i<length;i++){
        result+= character.charAt(Math.floor(Math.random() * character.length) )
    }

    return result;
    
}