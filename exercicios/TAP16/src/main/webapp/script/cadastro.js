function cadastrar(){
    nome = document.getElementById("nome").value
    dt_nascimento = document.getElementById("dt_nascimento").value
    cpf = document.getElementById("cpf").value
    password = document.getElementById("password").value
    passwordCheck = document.getElementById("password-confirmation").value
    
    if(password != passwordCheck){
        document.getElementById("erro").textContent = "Senhas divergentes";
        return false
    }
    
options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ nome, dt_nascimento, cpf, password }).toString()
    }

fetch('api/aluno/insert.jsp', options)
.then(async (response) => {
    const data = await response.json()
    console.log(data)
    if(data[0]){
        alert("Usuario cadastrado com sucesso")
        window.location.href = "telaLogin.html"
    }else{
        document.getElementById("erro").textContent = data[1]
    }
})
.catch(err => {
    document.getElementById("erro").textContent = "Erro na execução!"
})
}