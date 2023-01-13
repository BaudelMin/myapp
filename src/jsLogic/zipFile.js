import JSZip from "jszip";
import { saveAs } from "file-saver";
import { data } from "autoprefixer";

const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')

function zipFile(){
    this.zip = JSZip()
    this.file = undefined
    this.fileTree = {
        name: '',
        isFolder: true,
        relative_path: '',
        children: []
    }
    this.zipContent = null
    this.setFile = function(file){
        this.file = file
    }
    this.subFolderTree = function(fileinfo, current_folder, children){
        // console.log(fileinfo.folderpath)
        if((fileinfo.folderpath.match(/\//).length == 1) && (fileinfo.name.length === 0)){
            children.push({
                name: fileinfo.folderpath.slice(fileinfo.folderpath.indexOf('/') + 1),
                isFolder: true,
                relative_path: fileinfo.relative_path,
                children: []
            })
        }
        else if ((fileinfo.folderpath.match(/\//g).length == 1) && (fileinfo.name.length > 1)){
            children.push({
                name: fileinfo.name,
                isFolder: false,
                relative_path: fileinfo.relative_path
            })
        }
        else{
            for (let index = 0; index < children.length; index++){
                if (fileinfo.folderpath.includes(children[index].name)){
                    fileinfo.folderpath = diff(fileinfo.folderpath, current_folder)
                    children[index].children = this.subFolderTree(fileinfo, children[index].name, children[index].children);
                    break;
                }
            }
        }
        return children
    }
    this.getZipTree = function(){
        this.zipContent = this.zip.loadAsync(this.file)
        var zipcontent = [] 
        return new Promise((resolve, reject) => {
            

            this.zipContent
            .then(zipData => {
                // console.log(zipData)
                zipData.forEach((relative_path, zipEntry) => {
                    let fullname  = zipEntry.name
                    let lastIndex = fullname.lastIndexOf('/')
                    zipcontent.push({
                        name: fullname.slice(lastIndex + 1),
                        folderpath: fullname.slice(0, lastIndex + 1),
                        relative_path: relative_path
                    })
                })
                var tempdata = zipcontent[0]
                this.fileTree = {
                    name: tempdata.folderpath,
                    isFolder: true,
                    relative_path: tempdata.folderpath,
                    children: []
                }
                for (let i = 1; i < zipcontent.length; i++){
                    tempdata = zipcontent[i]
                    if ((tempdata.folderpath.match(/\//g).length === 1) && (tempdata.name.length > 0)){
                        this.fileTree.children.push({
                            name: tempdata.name,
                            isFolder: false,
                            relative_path: tempdata.relative_path
                        })
                    }
                    else if ((tempdata.folderpath.match(/\//g).length === 2) && (tempdata.name.length === 0)){
                        this.fileTree.children.push({
                            name: diff(tempdata.folderpath, this.fileTree.name),
                            relative_path: tempdata.relative_path,
                            isFolder: true,
                            children: []
                        })
                    }
                    else{
                        for (let index = 0; index < this.fileTree.children.length; index++){
                            if (tempdata.folderpath.includes(this.fileTree.children[index].name)){
                                tempdata.folderpath = diff(tempdata.folderpath, this.fileTree.name)
                                this.fileTree.children[index].children = this.subFolderTree(
                                        tempdata,
                                        this.fileTree.children[index].name,
                                        this.fileTree.children[index].children
                                    )
                                break;
                            }
                        }
                    }
                }
            resolve(this.fileTree)
            })
            .catch(err => reject(err))
        })
        
        
    }

    this.getText = function(filepath){
        let allowed =['.py', '.yaml', '.json', '.robot', '.gitignore', '.md']
        let extention = filepath.slice(filepath.lastIndexOf('.'))
        return new Promise((resolve, reject) => {
            this.zipContent
            .then(zipdata => {
                if (allowed.includes(extention)){
                    return zipdata.file(filepath)
                    .async('text')
                }
                else{
                    return new Promise((resolve, _reject) => {
                        resolve('File cannot be opened')
                    })
                }
               
                
            })
            .then(filedata => {
                resolve(filedata)
            })
            .catch(err => reject(`Error in getText method ${err}`))
        })
    }

    this.saveContent = function(filepath, content){
        let contentePromise = new Promise((resolve, reject) => {
            if(content){
                resolve(content)
            }
            else{
                reject('Content not available')
            }
        })
        this.zipContent
        .then(zipData => {
            zipData.file(filepath, contentePromise)
        })
        .catch(err => console.log(err))
    }
    this.saveZipFile = function(){
        this.zipContent
        .then(_zipData => {
            this.zip.generateAsync({type:'blob'})
            .then(blob => {
                saveAs(blob, 'download.zip')
            })
            .catch(err => console.log(err))
        })
    }
    
}


export default zipFile
