package com.backend.backend.Dto;

 

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BlogDTO {
    private Long id;
    private String title;
    private String content;
    private String authorUsername;  
    private LocalDateTime createdAt;
    private List<CommentDTO> comments;  
    private int likeCount;  
}
