
import { showToast } from "./script.js";
export function initBranch(parent) {
    const branch = {
        parent,
        children: [],
        panel: null,
        container: null,
        text: "",
        textarea: "",
        generateUI: () => {
            branch.panel = document.createElement("div");
            branch.panel.className = "branchpanel";
            branch.container = document.createElement("div");
            branch.container.id = "branch_container";
            branch.container.innerHTML = TUI;
            branch.textarea = document.createElement("textarea")
            branch.textarea.placeholder = "Type your story timeline here..."
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
            if (parent == null) return;
            parent.children.push(branch);
        }
    }
    return branch;
}
const geralt = (branch) => {


    //return ({text: "text"})
};
let original;
const download = {}
export const generateUITest = () => {
    let parent = {
        text: "\u001f",
        children:[],
        panel: document.body//.getElementById("rootpane")
    }
    original = initBranch(parent);
    original.generateUI();

}

const TUI = `<div class="topflow"></div>`;
