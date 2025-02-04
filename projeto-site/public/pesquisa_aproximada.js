function pesquisar() {
    // Declare variables
    var input, filter, div, h2, i, txtValue, p, box;
    input = document.getElementById('pesquisa');
    filter = input.value.toUpperCase();
    div = document.getElementById("cards");
    h2 = div.getElementsByTagName('h2');
    box = document.getElementsByClassName("card-add");
  
    // Loop through all h1st items, and hide those who don't match the search query
    for (i = 0; i < h2.length; i++) {
      p = h2[i].getElementsByTagName("p")[0];
      txtValue = p.textContent || p.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        box[i].style.display = "";
      }else {
        box[i].style.display = "none";
      }
    }
}