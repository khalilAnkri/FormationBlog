package com.backend.backend.Services;

import java.util.List;

import com.backend.backend.Dto.CommentDTO;

public interface CommentService {
    List<CommentDTO> getCommentsByBlogId(Long blogId);
    CommentDTO addComment(Long userId, Long blogId, String content);
}