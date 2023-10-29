const modalInserirAvaliacao = document.getElementById("modalInserirAvaliacao");
const modalUpdateAvaliacao = document.getElementById("modalUpdateAvaliacao");
const tableBodyAvaliacao = document.getElementById("tableBodyAvaliacao");

// Fecha a modal quando o usuário clica fora da modal
window.onclick = function (event) {
  if (
    event.target == modalInserirAvaliacao ||
    event.target == modalUpdateAvaliacao 
  ) {
    modalInserirAvaliacao.style.display = "none";
    modalUpdateAvaliacao.style.display = "none";
  }
}

function editAvaliacao(e, id) {
  document.getElementById("updateIdAvaliacao").value =
    e.parentElement.parentElement.children[0].innerHTML; //Id
  document.getElementById("updatePesoAvaliacao").value =
    e.parentElement.parentElement.children[2].innerHTML.slice(0, -3); //Peso
  document.getElementById("updateAlturaAvaliacao").value =
    e.parentElement.parentElement.children[3].innerHTML.slice(0, -3); //Altura
  document.getElementById("updateDateAvaliacao").value = reConverteData(
    e.parentElement.parentElement.children[4].innerHTML
  ); //Data Avaliacao
  modalUpdateAvaliacao.style.display = "block";
}

function deleteAvaliacao(id) {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      id,
    }).toString(),
  };

  fetch("api/avaliacao/delete.jsp", options)
    .then(async (response) => {
      data = await response.json();
      if ("error" in data) {
        alert(data.error);
      } else {
        deletarLinhasTabelas();
        getAvalicao();
      }
    })
    .catch((err) => {
      alert("Erro no sistema");
    });
}

function deletarLinhasTabelas() {
  for (var i = tableBodyAvaliacao.rows.length - 1; i >= 0; i--) {
    tableBodyAvaliacao.deleteRow(i);
  }
}

function reConverteData(data) {
  var partes = data.split("/");
  var dia = partes[0];
  var mes = partes[1];
  var ano = partes[2];

  // Adiciona zero à esquerda se o mês tiver apenas um caractere
  if (mes.length === 1) {
    mes = "0" + mes;
  }

  var novaData = ano + "-" + mes + "-" + dia;
  return novaData;
}

function converterData(data) {
  var partes = data.split("-"); // Divide a string da data em partes separadas pelo hífen
  var ano = partes[0];
  var mes = partes[1];
  var dia = partes[2];

  // Cria um novo objeto Date com os valores extraídos da string da data
  var novaData = new Date(ano, mes - 1, dia);

  // Obtém os componentes da nova data
  var novoDia = novaData.getDate();
  var novoMes = novaData.getMonth() + 1;
  var novoAno = novaData.getFullYear();

  // Formata a data no formato "dd/mm/aaaa"
  var dataFormatada = novoDia + "/" + novoMes + "/" + novoAno;

  return dataFormatada;
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return "0"; // Cookie não encontrado
}
// --------------------------AVALIACAO----------------------------------------
function inserirLinhaAvalicao(data) {
  var row = tableBodyAvaliacao.insertRow(tableBodyAvaliacao.rows.length);
  
  if (!("peso" in data)) {
	row.insertCell(0).innerHTML = "-";
	row.insertCell(1).innerHTML = data.nome;
    row.insertCell(2).innerHTML = "-";
    row.insertCell(3).innerHTML = "-";
    row.insertCell(4).innerHTML = "-";
    row.insertCell(5).innerHTML = "-";
    row.insertCell(6).innerHTML = "-";
 	return
  }
  row.insertCell(0).innerHTML = data.idAvaliacao;
  row.insertCell(1).innerHTML = data.nome;
  row.insertCell(2).innerHTML = data.peso + " KG";
  row.insertCell(3).innerHTML = data.altura + " MT";
  row.insertCell(4).innerHTML = converterData(data.dt_avaliacao);
  row.insertCell(5).innerHTML = `<td><img src="imagens/edit.png" onclick="editAvaliacao(this, ${data.idAvaliacao})"></td>`;
  row.insertCell(6).innerHTML = `<td><img src="imagens/delete.png" onclick="deleteAvaliacao(${data.idAvaliacao})"></td>`;
}

function getAvalicao() {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
    }).toString(),
  };

  fetch("api/avaliacao/listfichas.jsp", options)
    .then(async (response) => {
      const data = await response.json();

      if ("error" in data) {
        document.cookie = "token=";
        alert("Erro Avaliacao: " + data.error);
        window.location.href = "telaLogin.html";
      } else {
        for (x in data) {
          console.log(data[x]);
          inserirLinhaAvalicao(data[x]);
        }
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");
      console.log(err);
      window.location.href = "telaLogin.html";
    });
}

function sair() {
  document.cookie = "token=";
  window.location.href = "index.html";
}

function submitInsertAvaliacao() {
  const peso = document.getElementById("insertPesoAvaliacao").value;
  const altura = document.getElementById("insertPesoAvaliacao").value;
  const dt_avaliacao = document.getElementById("insertDateAvaliacao").value;
  const idAluno = select.value;
  if (idAluno == 0) {
    alert("Selecione um aluno");
    return false;
  }
  if (peso == "" || altura == "" || dt_avaliacao == "") {
    alert("Preencha todos os campos");
    return false;
  }

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
      dt_avaliacao,
      altura,
      peso,
    }).toString(),
  };

  fetch("api/avaliacao/insert.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalInserirAvaliacao.style.display = "none";
        document.getElementById("insertPesoAvaliacao").value = "";
        document.getElementById("insertPesoAvaliacao").value = "";
        document.getElementById("insertDateAvaliacao").value = "";
        deletarLinhasTabelas();
        getAvalicao();
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

//------------------------------UPDATES-----------------------------------------
function submitUpdateAvaliacao() {
  const idAvaliacao = document.getElementById("updateIdAvaliacao").value;
  const altura = document.getElementById("updateAlturaAvaliacao").value;
  const peso = document.getElementById("updatePesoAvaliacao").value;
  const dt_avaliacao = document.getElementById("updateDateAvaliacao").value;

  if (idAvaliacao == "" || altura == "" || peso == "" || dt_avaliacao == "") {
    alert("Preencha todos os campos");
    return false;
  }

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAvaliacao,
      altura,
      peso,
      dt_avaliacao,
    }).toString(),
  };

  fetch("api/avaliacao/update.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalUpdateAvaliacao.style.display = "none";
        deletarLinhasTabelas();
        getAvalicao();
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

getAvalicao();
