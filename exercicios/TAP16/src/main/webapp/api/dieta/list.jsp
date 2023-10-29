<%@page import="Dao.DietaDao"%>
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
	if(Integer.parseInt(idAluno) == 8 && request.getParameter("idAluno") != null){ idAluno = request.getParameter("idAluno"); }//Se for o admin
DietaDao dietaDao = new DietaDao();
ResultSet results = dietaDao.Get(idAluno);
int contador = 0;
while(results.next()){
	String dt_dieta = results.getString("dt_dieta");
	String dieta = results.getString("dieta");
	String idDieta = results.getString("idDieta");
	json.put(Integer.toString(contador), new JSONObject().put("idDieta", idDieta).put("dt_dieta", dt_dieta).put("dieta", dieta));
	contador = contador + 1;
}
results.close();
response.getWriter().write(json.toString());
}
%>