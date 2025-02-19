package com.backend.backend.Dto;

 

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LikeDTO {
    private Long id;
    private String username;
    private Long blogId;
}
