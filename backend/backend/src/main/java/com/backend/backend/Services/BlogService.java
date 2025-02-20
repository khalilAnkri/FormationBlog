package com.backend.backend.Services;

import com.backend.backend.Dto.BlogDTO;
import java.util.List;

public interface BlogService {
    List<BlogDTO> getAllBlogs();
    BlogDTO getBlogById(Long blogId);
    BlogDTO createBlog(Long userId, BlogDTO blogDTO);
    void deleteBlog(Long blogId);
    List<BlogDTO> getMyBlogs(Long userId);  
    List<BlogDTO> getAllApprovedBlogs();
}
