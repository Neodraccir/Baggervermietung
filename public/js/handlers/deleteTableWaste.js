function deleteTableWaste(){
    let additionalTables = document.getElementsByTagName("table");
    let wasteTables = []
    for(let key in additionalTables){
        if(!Number.isNaN(key)){
          wasteTables.push(additionalTables[key])
        }
    }
    wasteTables.forEach((e)=>{
        if(e instanceof HTMLElement){e.remove()}
    })
}

export {deleteTableWaste}