package com.backend.backend.Repositories;

 

import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlog(Blog blog);
}
