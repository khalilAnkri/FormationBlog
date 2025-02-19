package com.backend.backend.Services;

import java.util.List;

import com.backend.backend.Dto.LikeDTO;

public interface LikeService {
    void likeBlog(Long userId, Long blogId);
    void unlikeBlog(Long userId, Long blogId);
    List<LikeDTO> getLikedBlogs(Long userId);
}