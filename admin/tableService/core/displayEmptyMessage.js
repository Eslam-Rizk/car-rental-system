export function displayEmptyMessage(tableBody) {
  const msgRow = document.createElement("tr");
  const msgCell = document.createElement("td");
  msgCell.colSpan = 5;
  msgCell.style.padding = "10px"; 
  msgCell.setAttribute("align", "center");
  msgCell.textContent = "The table is empty for now try adding some elements";
  msgRow.appendChild(msgCell);
  tableBody.appendChild(msgRow);
  return;
}
