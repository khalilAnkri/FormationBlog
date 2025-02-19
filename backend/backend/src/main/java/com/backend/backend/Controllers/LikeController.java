package com.backend.backend.Controllers;

import com.backend.backend.Dto.LikeDTO;
import com.backend.backend.Services.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    //  Requires Authentication to View Liked Blogs
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<LikeDTO>> getLikedBlogs(@RequestParam Long userId) {
        return ResponseEntity.ok(likeService.getLikedBlogs(userId));
    }

    //  Requires Authentication to Like a Blog
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Map<String, String>> likeBlog(@RequestParam Long userId, @RequestParam Long blogId) {
        likeService.likeBlog(userId, blogId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Blog liked successfully");
        return ResponseEntity.ok(response);
    }

    //  Requires Authentication to Unlike a Blog
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping
    public ResponseEntity<Map<String, String>> unlikeBlog(@RequestParam Long userId, @RequestParam Long blogId) {
        likeService.unlikeBlog(userId, blogId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Blog unliked successfully");
        return ResponseEntity.ok(response);
    }
}
