<%@page import="Dao.TreinoDao"%>
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
	TreinoDao treinoDao = new TreinoDao();
	ResultSet results = treinoDao.Get(idAluno);
	int contador = 0;
	while(results.next()){
		String dt_treino = results.getString("dt_treino");
		String treino = results.getString("treino");
		String idTreino = results.getString("idTreino");
		json.put(Integer.toString(contador), new JSONObject().put("idTreino", idTreino).put("dt_treino", dt_treino).put("treino", treino));
		contador = contador + 1;
	}
	results.close();
	response.getWriter().write(json.toString());
}
%>