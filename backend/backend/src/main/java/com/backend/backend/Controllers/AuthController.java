package com.backend.backend.Controllers;

import com.backend.backend.Entities.Role;
import com.backend.backend.Entities.User;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Dto.LoginRequest;
import com.backend.backend.exception.InvalidCredentialsException;
import com.backend.backend.exception.UserAlreadyExistsException;
import com.backend.backend.Security.JwtUtils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

     
@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        throw new UserAlreadyExistsException("Username already exists!");
    }
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        throw new UserAlreadyExistsException("Email already exists!");
    }

    
    if (user.getRole() == null) {
        user.setRole(Role.USER);  
    }

    user.setPassword(passwordEncoder.encode(user.getPassword())); 
    userRepository.save(user);  

    return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully!"));
}

    

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    User user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    String token = jwtUtil.generateToken(user.getUsername(), user.getId());  

    return ResponseEntity.ok(Collections.singletonMap("token", token));
}

}
