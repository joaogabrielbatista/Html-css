  if(getCookie('token') != ""){
    	window.location.href = "dashboard.html"
    }
    
    function getCookie(name) {
    	  const value = "; " + document.cookie;
    	  const parts = value.split("; " + name + "=");
    	  if (parts.length === 2) {
    	    return parts.pop().split(";").shift();
    	  }
    	  return "0"; // Cookie não encontrado
    	}
    
    async function login() {
    	cpf = document.getElementById("cpf").value
    	password = document.getElementById("password").value

    	options = {
    		method: 'POST',
    		headers: {
    			'Content-Type': 'application/x-www-form-urlencoded'
    		},
    		body: new URLSearchParams({ cpf, password }).toString()
    	}

    	fetch('api/aluno/login.jsp', options)
    	.then(async (response) => {
    		const data = await response.json()
    		console.log(data)
    		if(data.cod == 0){
    			document.cookie = `token=${data.token}`
    			document.cookie = `dt_nascimento=${data.dtNascimento}`
    			document.cookie = `nome=${data.nome}`
    			window.location.href = "dashboard.html"
    		}else{
    			document.getElementById("erro").textContent = data.token
    		}
    	})
    	.catch(err => {
    		console.log(err)
    		document.getElementById("erro").textContent = "Erro na execução!"
    	})
    }
   