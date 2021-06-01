const addGlobalVar = function(Obj){
    Object.keys(Obj).forEach((e)=>globalThis[e] = Obj[e]);
    globalThis = Object.assign(globalThis, Obj);
    if(Object.keys(Obj).length === 1){
        return Obj[Object.keys(Obj)[0]]
    }
    return Obj
}

export {addGlobalVar}