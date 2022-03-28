const openFileButton = document.getElementById('openFile');
const fileContent = document.getElementById('fileContent');
const saveFileButton = document.getElementById('saveButton');
const saveAsFileButton = document.getElementById('saveAsButton');
let fileHandle;

openFileButton.onclick = async()=>{
    [fileHandle] = await window.showOpenFilePicker({
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt'],
                },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
    });
    const file = await fileHandle.getFile();
    const contents = await file.text();
    fileContent.innerText = contents;
};

saveFileButton.onclick = async()=>{
    let stream = await fileHandle.createWritable();
    await stream.write(fileContent.innerText);
    await stream.close();
};


saveAsFileButton.onclick = async()=>{
    fileHandle = await window.showSaveFilePicker(); 
    let stream = await fileHandle.createWritable();
    await stream.write(fileContent.innerText);
    await stream.close();
};
