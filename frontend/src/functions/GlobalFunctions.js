import {hideEdgeButtons} from "./EdgeFunctions";

/**
 * Callback function for adding new node to GraphVis.
 */

export function activateDeleteButton() {
    document.getElementById("deleteButton").disabled = false;
    document.getElementById("deleteButton").style.display = "block";
}

export function hideDeleteButton() {
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("deleteButton").style.display = "none";
}

export function hideEditButtons() {
    document.getElementById("deleteButton").style.display = "none";
    document.getElementById("editNodeButton").style.display = "none";
    document.getElementById("editEdgeButton").style.display = "none";

}

export function hideAllButtons() {
    hideEditButtons();
    hideEdgeButtons();
    hideDeleteButton();
}


export function initializeButtons(item) {
    let div = document.createElement("div");
    div.setAttribute("id", "addButtons");
    let span = document.createElement("span");
    span.setAttribute("id", item.defaultName);
    let iconElement = document.createElement("i");
    let icon = document.createElement("IMG");
    icon.setAttribute("src", item.icon);
    iconElement.appendChild(icon);
    span.appendChild(iconElement);
    let node = document.createTextNode(item.defaultName);
    span.appendChild(node);
    div.appendChild(span);

    let element = document.getElementById("iconBar");
    let child = document.getElementById("addEdgeButton");

    element.insertBefore(div, child);
}