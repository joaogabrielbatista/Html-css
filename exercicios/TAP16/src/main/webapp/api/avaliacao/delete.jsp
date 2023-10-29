<%@page import="Dao.AvaliacaoDao"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="Util.Jwt" %>

<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
JSONObject json = new JSONObject();
String idAluno = Jwt.getIdByToken(request.getParameter("token"));
if(Integer.parseInt(idAluno) == 8){//Se for admin - Operação permitida
String id = request.getParameter("id");
AvaliacaoDao avaliacaoDao = new AvaliacaoDao();

if(avaliacaoDao.Delete(id)){
	json.put("ok", "Operação Realizada com sucesso");
	response.getWriter().write(json.toString());
}else{
	json.put("error", "Erro na operação no banco de dados");
	response.getWriter().write(json.toString());
}
}else{
	json.put("error", "Permissão negada");
	response.getWriter().write(json.toString());
}
%>