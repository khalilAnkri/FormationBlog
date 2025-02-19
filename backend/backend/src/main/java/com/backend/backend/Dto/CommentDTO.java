package com.backend.backend.Dto;

 

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;
    private String username;  
    private LocalDateTime createdAt;
}
