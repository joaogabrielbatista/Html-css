package Util;


import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import io.jsonwebtoken.Jwts;

public class Jwt {
    private static final String SECRET_KEY = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // Substitua pela sua chave secreta

    public static String generateJwt(String idUser) {
    	Date expirationDate = new Date(System.currentTimeMillis() + 86400000); // 1 dia de validade

    	String token = Jwts.builder().setSubject(idUser).setExpiration(expirationDate).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    	return token;
    }

    public static String getIdByToken(String token) {
    	try {
    		String subject = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    		return subject;
    	}catch (Exception e) {
    		System.out.print("Erro na validação");
    		return "";
    	}
    }
    
    public static boolean validateJwt(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}