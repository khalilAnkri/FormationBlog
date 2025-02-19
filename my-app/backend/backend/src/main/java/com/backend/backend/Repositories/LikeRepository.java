package com.backend.backend.Repositories;

 

import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.Like;
import com.backend.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndBlog(User user, Blog blog);
    List<Like> findByUser(User user);
}
