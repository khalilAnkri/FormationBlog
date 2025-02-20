package com.backend.backend.Dto;

import java.util.ArrayList;
import java.util.List;

import com.backend.backend.Entities.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BlogDTO {
    private Long id;
    private String title;
    private String content;
    private String authorUsername;
    private String createdAt;  
    private int likeCount;
    private int commentCount;
    private List<Comment> comments = new ArrayList<>();  
    private String status;
}
