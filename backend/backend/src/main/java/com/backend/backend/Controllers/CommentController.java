package com.backend.backend.Controllers;

import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // ✅ Requires Authentication to View Comments
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<CommentDTO>> getCommentsByBlog(@RequestParam Long blogId) {
        return ResponseEntity.ok(commentService.getCommentsByBlogId(blogId));
    }

    // ✅ Requires Authentication to Add Comments
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<CommentDTO> addComment(
            @RequestParam Long userId,
            @RequestParam Long blogId,
            @RequestBody CommentDTO commentDTO) {
        
        CommentDTO createdComment = commentService.addComment(userId, blogId, commentDTO.getContent());
        return ResponseEntity.ok(createdComment);
    }
}
