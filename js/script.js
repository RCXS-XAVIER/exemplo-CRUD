xhttp = new XMLHttpRequest();
var lista;
var api = "https://apibackend01raquel-qua209050.herokuapp.com/api/usuario/";

function listar() {

    xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function() {
        lista = this.responseText;
        // console.log(lista);
        lista = JSON.parse(lista);
        // console.log(lista);
        texto = "";
        i = 0;
        for (const u of lista) {
            texto += `<tr onclick='editar(${i})'><td>${u.produto}</td><td>${u.Descrição}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    u = lista[i];
    document.getElementById("produto").value = u.produto;
    document.getElementById("descrição").value = u.descrição;
    document.getElementById("valor").value = u.valor
    document.getElementById("id").value = u.id;
}

function gravar() {
    //alert("Estamos dentro da function incluir");
    var usuario = {};
    usuario.produto = document.getElementById("produto").value;
    usuario.descrição = document.getElementById("descrição").value;
    usuario.valor = document.getElementById("valor").value;
    // console.log(produto);

    usuario.produto = document.getElementById("id").value;
    if (usuario.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(usuario));
    xhttp.onload = function() {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("produto").value = "";
    document.getElementById("descrição").value = "";
    document.getElementById("valor produto").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("produto").value;
    xhttp.open("DELETE", api + produto);
    xhttp.send();
    xhttp.onload = function() {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();