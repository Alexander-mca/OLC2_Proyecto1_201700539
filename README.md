<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>OakLand</title>
    <link rel="stylesheet" type="text/css" target="_blank" href="./templates/styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/peggy"></script>
    <script type="text/javascript" src="./script.js"></script>
    <script type="module" src="./parser/parser.js"></script>
    <script type="module" src="./scripts/symbol/env.js"></script>
  </head>
  <body>
    <nav>
      <div class="logo">
        <img src="assets/Logo64x64.png" alt="logo" />
        <h1>OakLand</h1>
      </div>
      <ul>
        <li>
          <a href="#" id="btnEjecutar">Ejecutar</a>
        </li>
        <li>
          <div class="dropdown">
            <a onclick="myFunction()" class="dropbtn">Archivos</a>
            <div id="myDropdown" class="dropdown-content">
              <a href="#" onclick="openFile()" id="file">Abrir</a>
              <a href="#" onclick="SaveFile()">Guardar</a>
              <a href="#" onclick="SaveAsFile()">Guardar Como</a>
            </div>
        </li>
        <li>
              <div class="dropdown">
                <a onclick="myFunction()" class="dropbtn">Reportes</a>
                <div id="myDropdown" class="dropdown-content">
                  <a href="#">Reporte de Errores</a>
                  <a href="/tablasimbolos" onclick()="TablaSimbolos()">Reporte de Tabla de Simboles</a>
                </div>
              </div>
        </li>
      </ul>
    </nav>
    <div class="menubar">
      <ul>
        <li>
            <a href="#" id="btnEjecutar">Ejecutar</a>
          </li>
          <li>
            
            <div class="dropdown">
              <a onclick="myFunction()" class="dropbtn">Archivos</a>
              <div id="myDropdown" class="dropdown-content">
                <a href="#" onclick="openFile()" id="file">Abrir</a>
                <a href="#" onclick="SaveFile()">Guardar</a>
                <a href="#" onclick="SaveAsFile()">Guardar Como</a>
              </div>

            </div>
          </li>
          <li>
              <div class="dropdown">
                  <a onclick="myFunction()" class="dropbtn">Reportes</a>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="#">Reporte de Errores</a>
                    <a href="/tablasimbolos" onclick()="TablaSimbolos()">Reporte de Tabla de Simboles</a>
                  </div>
                </div>
          </li>
      </ul>
    </div>
    <div class="container-sm  mx-auto m-2 p-2 rounded-3" style="background-color: #99AA38;">
      <div class="container p-2 mx-auto">
        <ul class="nav nav-tabs" id="tabs">
          <li class="nav-item" >
            <a class="nav-link active text-white" aria-current="page" href="#" style="background-color: #1c331f;" id="first">new</a>
          </li>
        </ul>
        <div class="container_text">
          <div id="line-numbers" class="container_lines"></div>
          <textarea class="form-control text-black" oninput="numeros()" id="texto1" rows="12" style="background-color: #bff5ca;"></textarea>
        </div>
      </div>
      <div class=" p-2 rounded-3">
        <span>Consola:</span>
        <textarea name="" class="form-control text-white bg-dark" id="consola1" rows="6" disabled></textarea>
      </div>
    </div>
    
  <script>
    function numeros(){
      const textarea = document.getElementById('texto1');
      const lineNumbersEle = document.getElementById('line-numbers');
      const lines = textarea.value.split('\n');
      lineNumbersEle.innerHTML = Array.from({
          length: lines.length,
      }, (_, i) => `<div>${i + 1}</div>`).join('');
    }
    
  </script>
  </body>
</html>



