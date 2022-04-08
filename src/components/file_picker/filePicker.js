const openFileButton = document.getElementById('openFile');
const openFolderButton = document.getElementById('openFolder');
const fileContent = document.getElementById('fileContent');
const saveFileButton = document.getElementById('saveButton');
const saveAsFileButton = document.getElementById('saveAsButton');
const test = document.getElementById('test');


let fileHandle;
let fileNameArr = [];
let fileContentArr = [];
let buttonArr = [];


openFileButton.onclick = async()=>{
    [fileHandle] = await window.showOpenFilePicker({
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt', '.csv', '.xlsx', '.py'],
                },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: true,
    });
    var file = await fileHandle.getFile();
    var contents = await file.text();
    //fileContent.innerText = contents;


    fileNameArr.push(contents);
    fileContent.innerText = fileNameArr[fileNameArr.length-1];
    
    console.log(fileHandle.name);
    addButton(fileHandle.name);
    printButton();
};

openFolderButton.onclick = async()=>{
    const dirHandle = await window.showDirectoryPicker();

    for await (const entry of dirHandle.values()){
        console.log(entry.kind, entry.name);
        addButton(entry.name);
    }

    //list file contents as buttons
    printButton();
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


test.onclick=async()=>{
    var testArray=[];
    var testString="This is a test to see if this array can store paragraphs";
    var testString2="This is a test to see if this array can store more than one paragraph";
    testArray.push(testString);
    testArray.push(testString2);
    var fileName = 'sample2.txt';
    // const temp = await fetch('sample.txt');
    //console.log(await temp.text());

    //var temp = await fun(fileName);
    // testArray.push(await temp.text());


    // for (var i = 0; i < testArray.length; i++){
    //     fileContent.innerText = testArray[2];
    // }
    fileContent.innerText = await (await fetch(fileName)).text();
}


//searches button array for any duplicate names
async function addButton(buttonName){
    if (buttonArr.includes(buttonName) === true){
        return;
    }
    else {
        buttonArr.push(buttonName);
    }
}

async function printButton(){
    //clears prev buttons
    const elements = document.getElementsByClassName('btnList');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }


    //sort by alphabetical order so that if 2 different buttons are used file names show up in same space
    buttonArr.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

    //adds buttons and button class variables
    for (var i = 0; i < buttonArr.length; i++){
    let newbtn = document.createElement("button");
    newbtn.type='button';
    newbtn.className = 'btnList';
    newbtn.innerHTML = buttonArr[i];
    newbtn.onclick = async function(){
        console.log(newbtn.innerHTML);
        fileContent.innerText = await (await fetch(newbtn.innerHTML)).text();
    };

    const postButtons = document.querySelector(".blist");
    postButtons.append(newbtn);
    }
}
