
import { showToast } from "./script.js";
export function initBranch(parent, text="", childs = []) {
    const branch = {
        parent,
        children: [],
        panel: null,
        container: null,
        text,
        textarea: null,
        generateUI: () => {
            branch.panel = document.createElement("div");
            branch.panel.className = "branchpanel";
            branch.container = document.createElement("div");
            branch.container.id = "branch_container";
            branch.container.innerHTML = TUI;
            branch.textarea = document.createElement("textarea")
            branch.textarea.placeholder = "Type your story timeline here..."
            branch.textarea.value = branch.text;
            branch.container.appendChild(branch.textarea)
            branch.panel.appendChild(document.createElement("hr"))
            branch.panel.appendChild(branch.container);

            let addButton = document.createElement("button");
            addButton.innerText = "ADD";
            addButton.className = "branchbtn addbtn"
            addButton.onclick = () => {
                initBranch(branch).generateUI();
            }
            let delButton = document.createElement("button");
            delButton.innerText = "DELETE";
            delButton.className = "branchbtn delbtn"
            delButton.onclick = () => {
                if (parent.text == "\u001F") {
                    alert("Why would you wanna delete the origin branch -_-\nDo you really think that's a good idea?");
                } else if (confirm("Do you really want to delete it?\nAll of its branches will be removed!")) {
                    if (confirm("SUPER CONFIRM THE DELETION")) {
                        branch.panel.remove();
                    }
                } 
            }
            let saveButton = document.createElement("button");
            saveButton.innerText = "SAVE";
            saveButton.className = "branchbtn savebtn"
            saveButton.onclick = () => {
                branch.text = branch.textarea.value;
                showToast("Succesfully Saved!");
            }
            let loadButton = document.createElement("button");
            loadButton.innerText = "LOAD";
            loadButton.className = "branchbtn loadbtn"
            loadButton.onclick = () => {
                if (branch.text == "") {
                    showToast("No save found!");
                } else if (confirm("Confirm loading last save.")) {
                    branch.textarea.value = branch.text;
                    showToast("Succesfully Loaded!");
                }

            }
            branch.container.appendChild(addButton);
            branch.container.appendChild(delButton);
            branch.container.appendChild(saveButton);
            branch.container.appendChild(loadButton);

            const bottomDiv = document.createElement("div");
            bottomDiv.className = "topflow";
            branch.container.appendChild(bottomDiv);
            
            branch.panel.appendChild(document.createElement("br"))
            parent.panel.appendChild(branch.panel);
            parent.children.push(branch);
            if (childs.length > 0) {
                childs.map(c => initBranch(branch, c.text, c.children).generateUI());
            }
        }
    }
    return branch;
}
const geralt = (branch) => {
    return ({
        text: branch.text,
        children: branch.children.map(c => geralt(c))
    })
};
const upload = (text) => {
    let branch = JSON.parse(text);
    original.panel.remove();
    original = initBranch(parent, branch.text, branch.children)
    original.generateUI();
}
let parent = {
        text: "\u001f",
        children:[],
        panel: document.body//.getElementById("rootpane")
    }
let original;

export const generateUITest = () => {
    original = initBranch(parent);
    original.generateUI();

}

const TUI = `<div class="topflow"></div>`;
document.getElementById("download").onclick = () => {
    let filename = prompt("Enter the title: ");
    if (filename == null) return;
    let text = JSON.stringify(geralt(original));
    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename + ".txt";
    link.click();
    URL.revokeObjectURL(link.href);
}
const fileload = document.getElementById("fileload");
document.getElementById("upload").onclick = () => {
    document.getElementById("fileload").click();
    
}
fileload.addEventListener("change", () => {
    const file = fileload.files[0]; // first selected file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        console.log(e.target.result)
        upload(e.target.result); // file contents
    };
    reader.readAsText(file);
})