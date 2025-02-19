package com.backend.backend.Dto;

 

import lombok.*;

import java.util.Set;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles; // Only role names ( "USER", "ADMIN")
    private String password;  

}
