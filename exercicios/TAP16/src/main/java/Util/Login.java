package Util;

import java.sql.ResultSet;
import java.sql.SQLException;

import Util.Conexao;
import Util.Jwt;

public class Login {
	public static String[] login(String cpf, String password) {
		Conexao conexao = null;
		try {
			conexao = new Conexao();
			String query = "SELECT idaluno, nome, dt_nascimento, password FROM aluno WHERE cpf = '" +cpf+ "';";
	        System.out.print(query);
	        ResultSet result = conexao.executeQuery(query);
	        
	        String idAluno = "";
	        String passwordBD = "";
	        String nome = "";
	        String dt_nascimento = "";
	        while(result.next()) {
	        	idAluno = result.getString("idaluno");
	        	passwordBD = result.getString("password");
	        	nome = result.getString("nome");
	        	dt_nascimento = result.getString("dt_nascimento");
	        }
	        result.close();
	        
	        if(idAluno == "") {
	        	String[] retorno = {"1", "CPF Invalido"};
		        return retorno;
	        }
	        if(!passwordBD.equals(password)) {
	        	String[] retorno = {"1", "Senha Invalida"};
		        return retorno;  	
	        }

	        String token = Jwt.generateJwt(idAluno);
	        String[] retorno = {"0", token, nome, dt_nascimento};
	        return retorno;
	        
		}catch(SQLException e){
			System.out.print(e);
			String[] retorno = {"0", "ERRO"};
	        return retorno;
		}
	}
}
