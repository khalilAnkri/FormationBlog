package com.backend.backend.Services.ServiceImpl;
 

import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.Comment;
import com.backend.backend.Entities.User;
import com.backend.backend.Mappers.CommentMapper;
import com.backend.backend.Repositories.BlogRepository;
import com.backend.backend.Repositories.CommentRepository;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    @Override
    public List<CommentDTO> getCommentsByBlogId(Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));
        return commentRepository.findByBlog(blog).stream()
                .map(commentMapper::toCommentDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO addComment(Long userId, Long blogId, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setBlog(blog);
        commentRepository.save(comment);
        return commentMapper.toCommentDTO(comment);
    }
}

