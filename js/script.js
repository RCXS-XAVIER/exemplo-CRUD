xhttp = new XMLHttpRequest();
var lista;
var api = "https://raquel-qua209050.herokuapp.com/api/usuario/";
//
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
    var produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descrição = document.getElementById("descrição").value;
    produto.valor = document.getElementById("valor").value;
    // console.log(produto);

    produto.id = document.getElementById("id").value;
    if (produto.id > 0) {
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
    document.getElementById("nome").value = "";
    document.getElementById("descrição").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function() {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();