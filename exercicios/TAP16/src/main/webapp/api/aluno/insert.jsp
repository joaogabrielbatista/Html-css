<%@page import="Dao.AlunoDao"%>
<%@page import="Model.Aluno"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
JSONObject json = new JSONObject();
//Pegamos os dados do Aluno
Aluno aluno = new Aluno();
aluno.setNome(request.getParameter("nome"));
aluno.setDt_nascimento(request.getParameter("dt_nascimento"));
aluno.setCpf(request.getParameter("cpf"));
aluno.setPassword(request.getParameter("password"));
//Fazemos a conexao com o aluno Dao
AlunoDao alunoDao = new AlunoDao();
//Verificamos se o cpf já existe no banco de dados
ResultSet results = alunoDao.GetCpf(aluno.getCpf());
boolean existeCpf = false;
while(results.next()){
	existeCpf = true;
}
results.close();

if(existeCpf){
	//Se existe, retornamos um erro
	response.getWriter().write(json.put("0", false).put("1", "CPF já cadastrado").toString());
}else{
	//Se não existe, cadastramos o aluno no banco de dados
	boolean sucess = alunoDao.Insert(aluno);
	if(sucess){
		response.getWriter().write(json.put("0", true).toString());
	}else{
		response.getWriter().write(json.put("0", false).put("1", "Erro na execução").toString());
	}
}



%>