package com.backend.backend.Services.ServiceImpl;

import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.User;
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

    @Override
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(blogMapper::toBlogDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BlogDTO getBlogById(Long blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        return blog.map(blogMapper::toBlogDTO).orElse(null);
    }

    @Override
    public BlogDTO createBlog(Long userId, BlogDTO blogDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Blog blog = new Blog();
        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());
        blog.setAuthor(user);
        blogRepository.save(blog);
        return blogMapper.toBlogDTO(blog);
    }

    @Override
    public void deleteBlog(Long blogId) {
        blogRepository.deleteById(blogId);
    }

 
    @Override
    public List<BlogDTO> getMyBlogs(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return blogRepository.findByAuthor(user).stream()
                .map(blogMapper::toBlogDTO)
                .collect(Collectors.toList());
    }
}
