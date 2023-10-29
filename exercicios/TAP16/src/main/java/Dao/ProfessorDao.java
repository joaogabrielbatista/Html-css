package Dao;

import java.sql.SQLException;

import Model.Professor;
import Util.Conexao;

public class ProfessorDao {

	public boolean InserirProfessor(Professor p) {
		
		Conexao con = null;
		
		try {
			con = new Conexao();
			con.executeUpdate("INSERT INTO professor(nome, dt_nascimento, disciplina) VALUES ("
					+ "'" + p.getNome() + "','"
					+ p.getDt_nascimento() + "','"
					+ p.getDisciplina() +"');");
			return true;
		}catch(SQLException e){
			return false;
		}
	}
}
