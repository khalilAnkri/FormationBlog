package com.backend.backend.Controllers;

import com.backend.backend.Enum.*;
import com.backend.backend.Entities.User;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Dto.LoginRequest;
import com.backend.backend.Dto.UserRegistrationDTO;
import com.backend.backend.exception.InvalidCredentialsException;
import com.backend.backend.exception.UserAlreadyExistsException;
import com.backend.backend.Security.JwtUtils.JwtUtil;
import com.backend.backend.Services.EmailService;

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
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder , EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists!");
        }
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists!");
        }
    
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
    
        // ✅ Set default role to USER
        user.setRole(Role.USER);
    
        // ✅ Set account status to PENDING (requires admin approval)
        user.setAccountStatus(AccountStatus.PENDING);
    
        userRepository.save(user);

        try {
            emailService.sendPendingNotification(user.getEmail());
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
        }    
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully! Waiting for admin approval."));
    }
    

    

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    User user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    String token = jwtUtil.generateToken(user.getUsername(), user.getId() , user.getRole());  

    return ResponseEntity.ok(Collections.singletonMap("token", token));
}

}
