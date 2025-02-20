package com.backend.backend.Repositories;

 
import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.User;
import com.backend.backend.Enum.BlogStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByAuthor(User author);

    List<Blog> findByBlogStatus(BlogStatus approved);
    List<Blog> findByAuthorAndBlogStatus(User author, BlogStatus blogStatus);

    Integer countByBlogStatus(BlogStatus pending);
}

