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


