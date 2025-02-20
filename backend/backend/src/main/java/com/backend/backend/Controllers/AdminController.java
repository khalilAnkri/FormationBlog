package com.backend.backend.Controllers;

import com.backend.backend.Enum.AccountStatus;
import com.backend.backend.Enum.BlogStatus;
import com.backend.backend.Mappers.BlogMapper;
import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.User;
import com.backend.backend.Repositories.BlogRepository;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // ✅ Only Admins can access this controller
public class AdminController {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;
    private final BlogMapper blogMapper;
    private final EmailService emailService; // ✅ Inject EmailService
    
    // ✅ Get all pending users
    @GetMapping("/pending-users")
    public ResponseEntity<Object> getPendingUsers() {
        List<User> pendingUsers = userRepository.findByAccountStatus(AccountStatus.PENDING);
        return ResponseEntity.ok().body(pendingUsers);
    }

    // ✅ Approve a user (Set to ACTIVE)
    @PutMapping("/approve-user/{id}")
    public ResponseEntity<Map<String, String>> approveUser(@PathVariable Long id) {
        return updateUserStatus(id, AccountStatus.ACTIVE, "User approved.");
    }

    // ✅ Reject a user (Set to REJECTED)
    @PutMapping("/reject-user/{id}")
    public ResponseEntity<Map<String, String>> rejectUser(@PathVariable Long id) {
        return updateUserStatus(id, AccountStatus.REJECTED, "User rejected.");
    }

    // ✅ Get all pending blogs
    @GetMapping("/pending-blogs")
    public ResponseEntity<List<BlogDTO>> getPendingBlogs() {
        List<BlogDTO> pendingBlogs = blogRepository.findByBlogStatus(BlogStatus.PENDING)
                .stream()
                .map(blogMapper::toBlogDTO) 
                .collect(Collectors.toList());

        return ResponseEntity.ok(pendingBlogs);
    }

    // ✅ Approve a blog
    @PutMapping("/approve-blog/{id}")
    public ResponseEntity<Map<String, String>> approveBlog(@PathVariable Long id) {
        return updateBlogStatus(id, BlogStatus.APPROVED, "Blog approved.");
    }

    // ✅ Reject a blog
    @PutMapping("/reject-blog/{id}")
    public ResponseEntity<Map<String, String>> rejectBlog(@PathVariable Long id) {
        return updateBlogStatus(id, BlogStatus.REJECTED, "Blog rejected.");
    }

    // ✅ Update Blog Status
    private ResponseEntity<Map<String, String>> updateBlogStatus(Long id, BlogStatus newStatus, String message) {
        return blogRepository.findById(id).map(blog -> {
            blog.setBlogStatus(newStatus);
            blogRepository.save(blog);
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Integer>> getDashboardStats() {
        Map<String, Integer> stats = new HashMap<>();

        stats.put("activeUsers", userRepository.countByAccountStatus(AccountStatus.ACTIVE));
        stats.put("pendingUsers", userRepository.countByAccountStatus(AccountStatus.PENDING));
        stats.put("pendingBlogs", blogRepository.countByBlogStatus(BlogStatus.PENDING));
        stats.put("approvedBlogs", blogRepository.countByBlogStatus(BlogStatus.APPROVED));

        return ResponseEntity.ok(stats);
    }

    // ✅ Update User Status + Send Email
    private ResponseEntity<Map<String, String>> updateUserStatus(Long id, AccountStatus newStatus, String message) {
        return userRepository.findById(id).map(user -> {
            user.setAccountStatus(newStatus);
            userRepository.save(user);

            // ✅ Send email notification
            try {
                if (newStatus == AccountStatus.ACTIVE) {
                    emailService.sendApprovalNotification(user.getEmail());
                } else if (newStatus == AccountStatus.REJECTED) {
                    emailService.sendRejectionNotification(user.getEmail());
                }
            } catch (MessagingException e) {
                e.printStackTrace(); // Log error
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}
