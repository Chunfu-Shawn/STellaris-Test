import fs from "fs";
import archiver from "archiver"

async function zipArchiver(filePath, fileName){
    return new Promise((resolve, reject)=>{
        const basePath = filePath.substring(0, filePath.lastIndexOf('/') + 1)
        const zipStream = fs.createWriteStream(basePath + "tmp.zip")
        const archive = archiver('zip',{ zlib: { level: 9 }})
        archive.pipe(zipStream)
        zipStream.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve(basePath + "tmp.zip")
        });
        zipStream.on('end', () => {
            console.log('Data has been drained');
        });
        // good practice to catch this error explicitly
        zipStream.on('error', (err) => {
            reject(err)
        });

        if(fileName === "table" || fileName === "pdf"){
            archive.directory(filePath,fileName)
        }else if(fileName === "all"){
            archive.directory(filePath+"/pdf","pdf")
            archive.directory(filePath+"/table","table")
            archive.append(fs.createReadStream(basePath+"/sc_registered.h5ad"),{name: "sc_registered.h5ad"})
        }else{
            const createReadStream = fs.createReadStream(filePath)
            archive.append(createReadStream,{name: fileName})
        }
        archive.finalize()
    })
}

export async function getZipFile(ctx, filePath, fileName){
    return new Promise(async (resolve, reject) => {
        try {
            const file = await zipArchiver(filePath, fileName)
            ctx.set('Content-disposition', 'attachment; filename=' + `${ctx.params.rid}_${fileName}.zip`)
            ctx.body = fs.readFileSync(file)
            resolve(file)
            fs.unlinkSync(file)
        } catch (err) {
            reject(err)
        }
    })
}