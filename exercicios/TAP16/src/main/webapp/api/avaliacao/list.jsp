<%@page import="Dao.AvaliacaoDao"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="Util.Jwt" %>

<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
JSONObject json = new JSONObject();
String idAluno = Jwt.getIdByToken(request.getParameter("token"));
if(idAluno == ""){
	json.put("error", "token invalido");
	response.getWriter().write(json.toString());
}else{
	System.out.print("agoraaa " + idAluno);
	if(Integer.parseInt(idAluno) == 8 && request.getParameter("idAluno") != null){ idAluno = request.getParameter("idAluno"); }//Se for o admin
AvaliacaoDao avaliacaoDao = new AvaliacaoDao();
ResultSet results = avaliacaoDao.Get(idAluno);
int contador = 0;
while(results.next()){
	String dt_avaliacao = results.getString("dt_avaliacao");
	String peso = results.getString("peso");
	String altura = results.getString("altura");
	String idAvaliacao = results.getString("idavaliacaofisica");
	json.put(Integer.toString(contador), new JSONObject().put("idAvaliacao", idAvaliacao).put("peso", peso).put("altura", altura).put("dt_avaliacao", dt_avaliacao));
	contador = contador + 1;
}
results.close();
response.getWriter().write(json.toString());
}


%>