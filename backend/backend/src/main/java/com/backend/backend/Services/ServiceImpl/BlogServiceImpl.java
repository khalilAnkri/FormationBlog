package com.backend.backend.Services.ServiceImpl;

import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.User;
import com.backend.backend.Enum.BlogStatus;
import com.backend.backend.Mappers.BlogMapper;
import com.backend.backend.Repositories.BlogRepository;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Services.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final BlogMapper blogMapper;

    // ✅ Return only APPROVED blogs
    @Override
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findByBlogStatus(BlogStatus.APPROVED).stream()
                .map(blogMapper::toBlogDTO) // ✅ Use correct method
                .collect(Collectors.toList());
    }
    

    // ✅ Ensure blog exists before returning
    @Override
    public BlogDTO getBlogById(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return blogMapper.toBlogDTO(blog);
    }

    // ✅ Ensure blog is PENDING by default when created
    @Override
    public BlogDTO createBlog(Long userId, BlogDTO blogDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Blog blog = blogMapper.toEntity(blogDTO); // ✅ Use Mapper to convert DTO to Entity
        blog.setAuthor(user);
        blog.setBlogStatus(BlogStatus.PENDING); // ✅ Default to PENDING

        blogRepository.save(blog);
        return blogMapper.toBlogDTO(blog);
    }

    @Override
    public void deleteBlog(Long blogId) {
        blogRepository.deleteById(blogId);
    }

    // ✅ Ensure only APPROVED blogs are returned
    @Override
    public List<BlogDTO> getMyBlogs(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return blogRepository.findByAuthorAndBlogStatus(user, BlogStatus.APPROVED).stream()
                .map(blogMapper::toBlogDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get all APPROVED blogs using existing method (Avoids Duplicate Logic)
    public List<BlogDTO> getAllApprovedBlogs() {
        return getAllBlogs();
    }
}
