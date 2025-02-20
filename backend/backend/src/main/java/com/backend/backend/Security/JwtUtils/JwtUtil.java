package com.backend.backend.Security.JwtUtils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.backend.backend.Enum.Role;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "key-dyali-ghir-ana-hhhhhhhhhhhhhhhhhhh"; 
    private static final long EXPIRATION_TIME = 86400000; // 1 day expiration

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // ✅ Generate Token with Role & User ID
    public String generateToken(String username, Long userId, Role role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role.name()); 
    
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract Role from Token
    public Role extractRole(String token) {
        return Role.valueOf(extractClaims(token).get("role", String.class));
    }

    // ✅ Extract Username
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ Extract User ID
    public Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }

    // ✅ Extract Expiration Date
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // ✅ Check if Token is Expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ✅ Extract All Claims (Reusable)
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Validate Token (Checks Expiry & Signature)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            
            if (isTokenExpired(token)) {
                System.out.println("❌ Token has expired.");
                return false;
            }
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("❌ Token expired: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("❌ Malformed token: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("❌ Invalid signature: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("❌ JWT error: " + e.getMessage());
        }
        return false;
    }

    // ✅ Validate Token with UserDetails
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && validateToken(token);
    }
}
