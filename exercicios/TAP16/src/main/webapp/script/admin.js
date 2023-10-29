const modalInserirAvaliacao = document.getElementById("modalInserirAvaliacao");
const modalInserirTreino = document.getElementById("modalInserirTreino");
const modalInserirDieta = document.getElementById("modalInserirDieta");

const modalUpdateAvaliacao = document.getElementById("modalUpdateAvaliacao");
const modalUpdateTreino = document.getElementById("modalUpdateTreino");
const modalUpdateDieta = document.getElementById("modalUpdateDieta");

const select = document.getElementById("selectAluno");
const tableBodyAvaliacao = document.getElementById("tableBodyAvaliacao");
const tableBodyDieta = document.getElementById("tableBodyDieta");
const tableBodyTreino = document.getElementById("tableBodyTreino");

// Fecha a modal quando o usuário clica fora da modal
window.onclick = function (event) {
  if (
    event.target == modalInserirAvaliacao ||
    event.target == modalInserirTreino ||
    event.target == modalInserirDieta ||
    event.target == modalUpdateAvaliacao ||
    event.target == modalUpdateTreino ||
    event.target == modalUpdateDieta
  ) {
    modalInserirAvaliacao.style.display = "none";
    modalInserirTreino.style.display = "none";
    modalInserirDieta.style.display = "none";
    modalUpdateAvaliacao.style.display = "none";
    modalUpdateTreino.style.display = "none";
    modalUpdateDieta.style.display = "none";
  }
}

function editTreino(e, id) {
  document.getElementById("updateIdTreino").value = e.parentElement.parentElement.children[0].innerHTML //Id
  document.getElementById("updateTreinoTreino").value = e.parentElement.parentElement.children[2].innerHTML //Treino
  document.getElementById("updateDataTreino").value = reConverteData(e.parentElement.parentElement.children[1].innerHTML) //Data Treino
  modalUpdateTreino.style.display = "block";
}
function editDieta(e, id) {
  document.getElementById("updateIdDieta").value = e.parentElement.parentElement.children[0].innerHTML //Id
  document.getElementById("updateDietaDieta").value = e.parentElement.parentElement.children[2].innerHTML //Dieta
  document.getElementById("updateDateDieta").value = reConverteData(e.parentElement.parentElement.children[1].innerHTML) //Data Dieta
  modalUpdateDieta.style.display = "block";
}
function editAvaliacao(e, id) {
  document.getElementById("updateIdAvaliacao").value = e.parentElement.parentElement.children[0].innerHTML //Id
  document.getElementById("updatePesoAvaliacao").value = e.parentElement.parentElement.children[1].innerHTML.slice(0, -3) //Peso
  document.getElementById("updateAlturaAvaliacao").value = e.parentElement.parentElement.children[2].innerHTML.slice(0, -3) //Altura
  document.getElementById("updateDateAvaliacao").value = reConverteData(e.parentElement.parentElement.children[3].innerHTML) //Data Avaliacao
  modalUpdateAvaliacao.style.display = "block";
}

function deleteTreino(id) {
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

  fetch("api/treino/delete.jsp", options)
    .then(async (response) => {
      data = await response.json();
      if ("error" in data) {
        alert(data.error)
      }else{
        selecionarAluno()
      }
    })
    .catch((err) => {
      alert("Erro no sistema");
    });
}
function deleteDieta(id) {
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

  fetch("api/dieta/delete.jsp", options)
    .then(async (response) => {
      data = await response.json();
      if ("error" in data) {
        alert(data.error)
      }else{
        selecionarAluno()
      }
    })
    .catch((err) => {
      alert("Erro no sistema");
    });
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
        alert(data.error)
      }else{
        selecionarAluno()
      }
    })
    .catch((err) => {
      alert("Erro no sistema");
    });

}

function getAlunos() {
  fetch("api/aluno/list.jsp")
    .then(async (response) => {
      data = await response.json();
      for (x in data) {
        alunosToSelect(data[x]);
      }
    })
    .catch((err) => {
      alert("Erro no sistema - Não foi possivel carregar os alunos");
    });
}

function alunosToSelect(data) {
  var novaOpcao = document.createElement("option");

  // Define o texto e o valor da opção
  novaOpcao.text = data.nome;
  novaOpcao.value = data.idAluno;

  // Adiciona a nova opção ao <select>
  select.appendChild(novaOpcao);
}

function deletarLinhasTabelas(){
  for (var i = tableBodyTreino.rows.length - 1; i >= 0; i--) {
    tableBodyTreino.deleteRow(i);
  }
  for (var i = tableBodyAvaliacao.rows.length - 1; i >= 0; i--) {
    tableBodyAvaliacao.deleteRow(i);
  }
  for (var i = tableBodyDieta.rows.length - 1; i >= 0; i--) {
    tableBodyDieta.deleteRow(i);
  }
}

function selecionarAluno() {
  var idAlunoSelecionado = select.value;
  deletarLinhasTabelas()
  getTreino(idAlunoSelecionado);
  getAvalicao(idAlunoSelecionado);
  getDieta(idAlunoSelecionado);
}
function reConverteData(data){
  var partes = data.split('/');
  var dia = partes[0];
  var mes = partes[1];
  var ano = partes[2];

  // Adiciona zero à esquerda se o mês tiver apenas um caractere
  if (mes.length === 1) {
    mes = '0' + mes;
  }

  var novaData = ano + '-' + mes + '-' + dia;
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
  row.insertCell(0).innerHTML = data.idAvaliacao;
  row.insertCell(1).innerHTML = data.peso + " KG";
  row.insertCell(2).innerHTML = data.altura + " MT";
  row.insertCell(3).innerHTML = converterData(data.dt_avaliacao);
  row.insertCell(4).innerHTML = `<td><img src="imagens/edit.png" onclick="editAvaliacao(this, ${data.idAvaliacao})"></td>`
  row.insertCell(5).innerHTML = `<td><img src="imagens/delete.png" onclick="deleteAvaliacao(${data.idAvaliacao})"></td>`          
}

function getAvalicao(idAluno) {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
    }).toString(),
  };

  fetch("api/avaliacao/list.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        document.cookie = "token=";
        alert("Erro Avaliacao: " + data.error);
        window.location.href = "telaLogin.html";
      } else {
        for (x in data) {
          inserirLinhaAvalicao(data[x]);
        }
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");
      window.location.href = "telaLogin.html";
    });
}

//---------------------DIETA--------------------------------------------
function inserirLinhaDieta(data) {
  var row = tableBodyDieta.insertRow(tableBodyDieta.rows.length);
  row.insertCell(0).innerHTML = data.idDieta;
  row.insertCell(1).innerHTML = converterData(data.dt_dieta);
  row.insertCell(2).innerHTML = data.dieta;
  row.insertCell(3).innerHTML = `<td><img src="imagens/edit.png" onclick="editDieta(this, ${data.idDieta})"></td>`
  row.insertCell(4).innerHTML = `<td><img src="imagens/delete.png" onclick="deleteDieta(${data.idDieta})"></td>`
}

function getDieta(idAluno) {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
    }).toString(),
  };

  fetch("api/dieta/list.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        //alert("Erro: " + data.error);
        document.cookie = "token=";
        window.location.href = "telaLogin.html";
      } else {
        for (x in data) {
          inserirLinhaDieta(data[x]);
        }
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

//-------------------------TREINO---------------------------------------------------
function inserirLinhaTreino(data) {
  var row = tableBodyTreino.insertRow(tableBodyTreino.rows.length);
  row.insertCell(0).innerHTML = data.idTreino;
  row.insertCell(1).innerHTML = converterData(data.dt_treino);
  row.insertCell(2).innerHTML = data.treino;
  row.insertCell(3).innerHTML = `<td><img src="imagens/edit.png" onclick="editTreino(this, ${data.idTreino})"></td>`
  row.insertCell(4).innerHTML = `<td><img src="imagens/delete.png" onclick="deleteTreino(${data.idTreino})"></td>`
}

function getTreino(idAluno) {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
    }).toString(),
  };

  fetch("api/treino/list.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        //alert("Erro: " + data.error);
        document.cookie = "token=";
        window.location.href = "telaLogin.html";
      } else {
        for (x in data) {
          inserirLinhaTreino(data[x]);
        }
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

function sair() {
  document.cookie = "token=";
  window.location.href = "index.html";
}

function submitInsertAvaliacao(){
  const peso = document.getElementById("insertPesoAvaliacao").value
  const altura = document.getElementById("insertPesoAvaliacao").value
  const dt_avaliacao = document.getElementById("insertDateAvaliacao").value
  const idAluno = select.value
  if(idAluno == 0){
	  alert("Selecione um aluno")
	  return false
  }
  if(peso == "" || altura == "" || dt_avaliacao == ""){
	  alert("Preencha todos os campos")
	  return false
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
      peso
    }).toString(),
  };

  fetch("api/avaliacao/insert.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalInserirAvaliacao.style.display = 'none'
        document.getElementById("insertPesoAvaliacao").value = ""
        document.getElementById("insertPesoAvaliacao").value = ""
        document.getElementById("insertDateAvaliacao").value = ""
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

function submitInsertDieta(){
  const dieta = document.getElementById("insertDietaDieta").value
  const dt_dieta = document.getElementById("insertDataDieta").value
  const idAluno = select.value
  if(idAluno == 0){
	  alert("Selecione um aluno")
	  return false
  }
  if(dt_dieta == "" || dieta == "" ){
	  alert("Preencha todos os campos")
	  return false
  }
  

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
      dt_dieta,
      dieta
    }).toString(),
  };

  fetch("api/dieta/insert.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalInserirDieta.style.display = 'none'
        document.getElementById("insertDietaDieta").value = ""
        document.getElementById("insertDataDieta").value = ""
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

function submitInsertTreino(){
  const treino = document.getElementById("insertTreinoTreno").value
  const dt_treino = document.getElementById("insertDataTreino").value
  const idAluno = select.value
  if(idAluno == 0){
	  alert("Selecione um aluno")
	  return false
  }
  if(dt_treino == "" || treino == "" ){
	  alert("Preencha todos os campos")
	  return false
  }
  

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idAluno,
      dt_treino,
      treino
    }).toString(),
  };

  fetch("api/treino/insert.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalInserirTreino.style.display = 'none'
        document.getElementById("insertTreinoTreno").value = ""
        document.getElementById("insertDataTreino").value = ""
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

//------------------------------UPDATES-----------------------------------------
function submitUpdateAvaliacao(){
  const idAvaliacao = document.getElementById("updateIdAvaliacao").value
  const altura = document.getElementById("updateAlturaAvaliacao").value
  const peso = document.getElementById("updatePesoAvaliacao").value
  const dt_avaliacao = document.getElementById("updateDateAvaliacao").value

  if(idAvaliacao == "" || altura == "" || peso == "" || dt_avaliacao == ""){
	  alert("Preencha todos os campos")
	  return false
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
      dt_avaliacao
    }).toString(),
  };

  fetch("api/avaliacao/update.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalUpdateAvaliacao.style.display = 'none'
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

function submitUpdateTreino(){
  const idTreino = document.getElementById("updateIdTreino").value
  const treino = document.getElementById("updateTreinoTreino").value
  const dt_treino = document.getElementById("updateDataTreino").value

  if(idTreino == "" || treino == "" || dt_treino == ""){
	  alert("Preencha todos os campos")
	  return false
  }
  
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idTreino,
      treino,
      dt_treino
    }).toString(),
  };

  fetch("api/treino/update.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalUpdateTreino.style.display = 'none'
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}

function submitUpdateDieta(){
  const idDieta = document.getElementById("updateIdDieta").value
  const dieta = document.getElementById("updateDietaDieta").value
  const dt_dieta = document.getElementById("updateDateDieta").value

  if(idDieta == "" || dieta == "" || dt_dieta == ""){
	  alert("Preencha todos os campos")
	  return false
  }
  
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: getCookie("token"),
      idDieta,
      dieta,
      dt_dieta
    }).toString(),
  };

  fetch("api/dieta/update.jsp", options)
    .then(async (response) => {
      const data = await response.json();
      if ("error" in data) {
        alert("Erro: " + data.error);
      } else {
        modalUpdateDieta.style.display = 'none'
        selecionarAluno()
      }
    })
    .catch((err) => {
      document.cookie = "token=";
      alert("Erro no sistema");

      window.location.href = "telaLogin.html";
    });
}
getAlunos();
