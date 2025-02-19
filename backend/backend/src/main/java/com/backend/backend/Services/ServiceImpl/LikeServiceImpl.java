package com.backend.backend.Services.ServiceImpl;

 
import com.backend.backend.Dto.LikeDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.Like;
import com.backend.backend.Entities.User;
import com.backend.backend.Mappers.LikeMapper;
import com.backend.backend.Repositories.BlogRepository;
import com.backend.backend.Repositories.LikeRepository;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Services.LikeService;
import com.backend.backend.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final LikeMapper likeMapper;

    @Override
    public void likeBlog(Long userId, Long blogId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));
        likeRepository.save(new Like(null, user, blog));
    }

    @Override
    public void unlikeBlog(Long userId, Long blogId) {
      User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
      Blog blog = blogRepository.findById(blogId)
        .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        likeRepository.findByUserAndBlog(user, blog)
        .ifPresentOrElse(
        likeRepository::delete,
        () -> { throw new ResourceNotFoundException("Like not found"); }
    );

    }

    @Override
    public List<LikeDTO> getLikedBlogs(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return likeRepository.findByUser(user).stream()
                .map(likeMapper::toLikeDTO)
                .collect(Collectors.toList());
    }
}
