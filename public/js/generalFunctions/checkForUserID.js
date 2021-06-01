function generateUserID() {
    let t = new Date();
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return {
        user_id: ("usr."+S4()+"."+t.getTime()),
        order_id: ("odr."+t.getTime()+"."+S4())
    };
}


function checkForUserID(){
    if(localStorage.getItem("user_id")===null){
        localStorage.setItem("user_id", generateUserID().user_id);
    }
    localStorage.setItem("order_id", generateUserID().order_id)
}


export{checkForUserID}