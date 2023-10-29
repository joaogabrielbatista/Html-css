<%@page import="Dao.DietaDao"%>
<%@page import="Model.Dieta"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="Util.Jwt" %>

<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
JSONObject json = new JSONObject();
String idAluno = Jwt.getIdByToken(request.getParameter("token"));
if(Integer.parseInt(idAluno) == 8){//Se for admin - Operação permitida
	Dieta dieta = new Dieta();
	dieta.setDt_dieta(request.getParameter("dt_dieta"));
	dieta.setDieta(request.getParameter("dieta"));
	dieta.setIddieta(request.getParameter("idDieta"));

	DietaDao dietaDao = new DietaDao();

if(dietaDao.Update(dieta)){
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