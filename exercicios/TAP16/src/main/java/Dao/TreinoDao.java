package Dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import Model.Treino;
import Util.Conexao;

public class TreinoDao {
    public boolean Insert(Treino treino){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "INSERT INTO treino (`dt_treino`, `treino`, `aluno_idaluno`) VALUES ('"+treino.getDt_treino()+"', '"+treino.getTreino()+"', '"+treino.getAluno_idaluno()+"');";
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
            String query = "delete from treino where idtreino = " +id+ ";";
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
        String query = "SELECT * from treino Where aluno_idaluno = '"+idAluno+"'";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public boolean Update(Treino treino){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "UPDATE treino SET dt_treino = '"+treino.getDt_treino()+"', `treino` = '"+treino.getTreino()+"' WHERE (`idtreino` = '"+treino.getIdtreino()+"');";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
}
