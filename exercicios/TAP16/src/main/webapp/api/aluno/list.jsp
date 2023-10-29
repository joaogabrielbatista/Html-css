<%@page import="Dao.AlunoDao"%>
<%@page import="Model.Aluno"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>

<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
AlunoDao alunoDao = new AlunoDao();
ResultSet results = alunoDao.Get();
JSONObject json = new JSONObject();
int contador = 0;
while(results.next()){
	String id = results.getString("idaluno");
	String nome = results.getString("nome");
	String dt_nascimento = results.getString("dt_nascimento");
	json.put(Integer.toString(contador), new JSONObject().put("idAluno", id).put("nome", nome).put("dt_nascimento", dt_nascimento));
	contador = contador + 1;
}
results.close();
response.getWriter().write(json.toString());
%>