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
}

function getAvalicao() {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ token: getCookie("token") }).toString(),
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
}

function getDieta() {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ token: getCookie("token") }).toString(),
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
}

function getTreino() {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ token: getCookie("token") }).toString(),
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

function sair(){
  document.cookie = "token=";
  window.location.href = "index.html";
}

function dadosAluno(){
  //Fazer conexão com o banco e pegar as infos
  document.getElementById("nomeAluno").textContent = getCookie("nome")
  document.getElementById("dataNascimentoAluno").textContent = converterData(getCookie("dt_nascimento"))
}

