function readData() {
  fetch("boardgames.json.example")
    .then(response => response.json())
    .then(data => {
      var table = document.getElementById('myTable');
      for (i = 0; i < data.boardgames.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + data.boardgames[i].name + '</td>' +
          '<td>' + data.boardgames[i].min_player + '</td>' +
          '<td>' + data.boardgames[i].max_player + '</td>';
        table.appendChild(tr);
      }
    });
}

function playerFilter(p) {
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  var td;
  for (i = 0; i < tr.length; i++) {
    tdMin = tr[i].getElementsByTagName("td")[1];
    tdMax = tr[i].getElementsByTagName("td")[2];
    if (p == 'all') {
      tr[i].style.display = "";
    } else {
      if (tdMin && tdMax) {
        txtValueMin = tdMin.textContent || tdMin.innerText;
        txtValueMax = tdMax.textContent || tdMax.innerText;
        numMin = Number(txtValueMin)
        numMax = Number(txtValueMax)
        if ((numMin <= p) && (numMax >= p)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

function nameFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
 