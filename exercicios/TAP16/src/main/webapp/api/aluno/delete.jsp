<%@page import="Dao.AlunoDao"%>
<%@page import="Model.Aluno"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
String id = request.getParameter("idAluno");
AlunoDao alunoDao = new AlunoDao();

if(alunoDao.Delete(id)){
	response.setStatus(200);
}else{
	response.setStatus(400);
}
%>