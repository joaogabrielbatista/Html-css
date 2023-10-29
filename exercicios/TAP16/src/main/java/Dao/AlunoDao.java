package Dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import Model.Aluno;
import Util.Conexao;

public class AlunoDao {
    public boolean Insert(Aluno aluno){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "INSERT INTO aluno (`nome`, `dt_nascimento`, `cpf`, `password`) VALUES ('" +aluno.getNome()+ "', '"+aluno.getDt_nascimento()+"', '"+aluno.getCpf()+"', '"+aluno.getPassword()+"');";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
    
    public boolean Delete(String id){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "delete from aluno where idaluno = " +id+ ";";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
    
    public ResultSet Get() throws SQLException{
        Conexao conexao = null;
        conexao = new Conexao();
        String query = "SELECT * from aluno";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public ResultSet GetCpf(String cpf) throws SQLException{
        Conexao conexao = null;
        conexao = new Conexao();
        String query = "SELECT * from aluno Where cpf = " + cpf + ";";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public boolean Update(Aluno aluno){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "UPDATE aluno SET nome = '"+aluno.getNome()+"', `dt_nascimento` = '"+aluno.getDt_nascimento()+"', cpf = '"+aluno.getCpf()+"', password = '"+aluno.getPassword()+"' WHERE (`idaluno` = '"+aluno.getIdaluno()+"');";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
}
