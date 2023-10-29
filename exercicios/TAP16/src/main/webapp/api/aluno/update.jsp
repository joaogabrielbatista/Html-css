<%@page import="Dao.AlunoDao"%>
<%@page import="Model.Aluno"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
Aluno aluno = new Aluno();
aluno.setNome(request.getParameter("nome"));
aluno.setDt_nascimento(request.getParameter("dt_nascimento"));
aluno.setCpf(request.getParameter("cpf"));
aluno.setPassword(request.getParameter("password"));
aluno.setIdaluno(request.getParameter("idAluno"));

AlunoDao alunoDao = new AlunoDao();

if(alunoDao.Update(aluno)){
	response.setStatus(200);
}else{
	response.setStatus(400);
}
%>