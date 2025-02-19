package com.backend.backend.Controllers;

import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Services.BlogService;
import com.backend.backend.exception.BlogNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    // ✅ Get All Blogs (Requires Authentication)
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    // ✅ Get Blog By ID (Requires Authentication)
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        BlogDTO blog = blogService.getBlogById(id);
        if (blog == null) {
            throw new BlogNotFoundException("Blog with ID " + id + " not found.");
        }
        return ResponseEntity.ok(blog);
    }

    // ✅ Create Blog (Requires Authentication)
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public ResponseEntity<BlogDTO> createBlog(@RequestParam Long userId, @RequestBody BlogDTO blogDTO) {
        return ResponseEntity.ok(blogService.createBlog(userId, blogDTO));
    }

    // ✅ Delete Blog (Requires Authentication)
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get Blogs by User ID (Requires Authentication)
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-blogs")
    public ResponseEntity<List<BlogDTO>> getMyBlogs(@RequestParam Long userId) {
        List<BlogDTO> blogs = blogService.getMyBlogs(userId);
        if (blogs.isEmpty()) {
            throw new BlogNotFoundException("No blogs found for user ID " + userId);
        }
        return ResponseEntity.ok(blogs);
    }
}
