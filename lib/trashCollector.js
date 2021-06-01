var fsp     = require('fs').promises,
    appRoot = require('app-root-path');

module.exports = ()=>{


    let     dir                     = `${appRoot}/db/tmp/`,

            files                   = (dir)=> fsp.readdir(dir, (err, dirFiles)=>{
                if (err){
                    throw(err)
                }
                return dirFiles
            }),

            getOrderCreationTime   = filePath => {

                let milliseconds = require(filePath).order_id.slice(4,17);
                return Date.parse(new Date(Number(milliseconds)));
            },

            now                     = ()=>new Date,
            dayInMillseconds        = 86400000,
            thisIsOlderThanADay     = date => Math.floor(now()-date)>dayInMillseconds,
            timeLeft                = date => Math.floor(1-((now()-date-dayInMillseconds)/1000)),

            deleteOldFile           = (dir, file) => {

                let path         = (()=>`${dir}${file}`)(),
                    creationTime = getOrderCreationTime(path);
                
                if(thisIsOlderThanADay(creationTime)){
                    fsp.unlink(path)
                    console.log(`#TrshCl: Created: ${new Date(creationTime)}\n#TrshCl: Time left: ${timeLeft(creationTime)} seconds`)
                    console.log(`#TrshCl: File "${file}" deleted.`)
                }
                if(!thisIsOlderThanADay(creationTime)){
                    console.log(`#TrshCl: ${file} has ${timeLeft(creationTime)} seconds left.`)
                }

            },     
            deleteTrash = async (dir)=>{ 

                console.log("#TrshCl: Collecting trash...")
                let filesNames   = await files(dir); 
                if(filesNames.length == 0){
                    console.log(`#TrshCl: Empty directory --> "${dir}"`)
                };

                filesNames.forEach(
                    (file)=>deleteOldFile(dir, file),
                    (err)=>{
                        if(err){throw err}
                    });
            };

            deleteTrash(dir);
            setInterval(deleteTrash, 14400000, dir);


 
}     