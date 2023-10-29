package Dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import Model.Avaliacao;
import Util.Conexao;

public class AvaliacaoDao {
    public boolean Insert(Avaliacao avaliacao){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "INSERT INTO avaliacaofisica (`dt_avaliacao`, `peso`, `altura`, `aluno_idaluno`) VALUES ('"+avaliacao.getDt_avaliacao()+"', '"+avaliacao.getPeso()+"', '"+avaliacao.getAltura()+"', '"+avaliacao.getAluno_idaluno()+"');";
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
            String query = "delete from avaliacaofisica where idavaliacaofisica = " +id+ ";";
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
        String query = "SELECT * from avaliacaofisica Where aluno_idaluno = '"+idAluno+"'";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public ResultSet GetFichas() throws SQLException{
        Conexao conexao = null;
        conexao = new Conexao();
        String query = "SELECT a.nome, af.* from aluno as a left join avaliacaofisica as af on a.idaluno = af.aluno_idaluno order by a.nome;";
        System.out.print(query);
        return conexao.executeQuery(query);
    }
    
    public boolean Update(Avaliacao avaliacao){
        Conexao conexao = null;
        try{
            conexao = new Conexao();
            String query = "UPDATE avaliacaofisica SET `dt_avaliacao` = '"+avaliacao.getDt_avaliacao()+"', `peso` = '"+avaliacao.getPeso()+"', `altura` = '"+avaliacao.getAltura()+"' WHERE (`idavaliacaofisica` = '"+avaliacao.getIdavaliacaofisica()+"');";
            System.out.print(query);
            conexao.executeUpdate(query);
            return true;
        }catch(SQLException e){
            return false;
        }
    }
}
