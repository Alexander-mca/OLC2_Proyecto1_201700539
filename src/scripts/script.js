const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");
let archivos = []



const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function openFile(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
              let files =   Array.from(input.files);
              console.log(files);
              const reader = new FileReader()
              resultado = ""
              reader.readAsText(files[0])
              reader.onload = function() {
                document.getElementById("texto1").value = reader.result
                resultado = reader.result
                archivos.push([files[0].name,resultado])
                console.log(archivos)
                //se colocan los nombres en las la tabs
                writeTabs()
              };
            
              reader.onerror = function() {
                console.log(reader.error);
              };
          };
    input.click();
}

function writeTabs(){
  let tabs = document.getElementById("tabs")
  tabs.innerHTML = ""
  for (let i = 0; i < archivos.length; i++) {
    let li = document.createElement('li')
    li.classList.add("nav-item")
    let a = document.createElement('a')
    if(i==0){
      a.classList.add("active")
    }
    a.classList.value = "nav-link text-white"
    a.style = "background-color: white;"
    a.ariaCurrent = "page"
    a.href = "#"
    a.text = archivos[i][0]
    a.setAttribute("onclick","getDataFile(\""+a.text+"\")")
    console.log(a.onclick)
    li.appendChild(a)
    tabs.appendChild(li)
  }
}

function getDataFile(a){
  for (let i = 0; i < archivos.length; i++) {
    let nombre = archivos[i][0]
    let contenido = archivos[i][1]
    if(nombre==a){
      document.getElementById("texto1").value = contenido
    }
  } 
}