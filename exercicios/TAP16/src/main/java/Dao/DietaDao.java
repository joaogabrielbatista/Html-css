package Dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import Model.Dieta;
import Util.Conexao;

public class DietaDao {
    public boolean Insert(Dieta dieta){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "INSERT INTO dieta (`dt_dieta`, `dieta`, `aluno_idaluno`) VALUES ('"+dieta.getDt_dieta()+"', '"+dieta.getDieta()+"', '"+dieta.getAluno_idaluno()+"');";
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
            String query = "delete from dieta where iddieta = " +id+ ";";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
    
    public ResultSet Get(String idAluno) throws SQLException{
        Conexao conexao = null;
        conexao = new Conexao();
        String query = "SELECT * from dieta Where aluno_idaluno = '"+idAluno+"'";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public boolean Update(Dieta dieta){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "UPDATE dieta SET dt_dieta = '"+dieta.getDt_dieta()+"', `dieta` = '"+dieta.getDieta()+"' WHERE (`iddieta` = '"+dieta.getIddieta()+"');";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
}
