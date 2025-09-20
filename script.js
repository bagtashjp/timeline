import { generateUITest } from "./branch.js";
generateUITest();
document.getElementsByTagName("hr")[0].style.display = "none";
document.getElementsByClassName("topflow")[0].style.display = "none";


export function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.style.visibility = 'hidden', 500);
    }, 2000); 
}