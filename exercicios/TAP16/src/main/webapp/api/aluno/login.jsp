<%@page import="Util.Jwt"%>
<%@page import="Util.Login"%>
<%@ page import="org.json.JSONObject" %>

<% 
String cpf = request.getParameter("cpf");
String password =  request.getParameter("password");
String[] ok = Login.login(cpf, password);
JSONObject json = new JSONObject();
json.put("cod", ok[0]);
json.put("token", ok[1]);
json.put("nome", ok[2]);
json.put("dtNascimento", ok[3]);

response.setContentType("application/json");
response.getWriter().write(json.toString());
//out.print(json.toString());
%> 
