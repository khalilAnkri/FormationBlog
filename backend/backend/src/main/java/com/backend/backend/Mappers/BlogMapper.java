package com.backend.backend.Mappers;

import org.mapstruct.*;
import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Entities.Blog;
import com.backend.backend.Entities.Comment;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CommentMapper.class}) // ✅ Use CommentMapper
public interface BlogMapper {

    @Mapping(source = "author.username", target = "authorUsername")
    @Mapping(source = "blogStatus", target = "status")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(target = "likeCount", expression = "java(blog.getLikes() != null ? blog.getLikes().size() : 0)")
    @Mapping(target = "commentCount", expression = "java(blog.getComments() != null ? blog.getComments().size() : 0)")
    @Mapping(target = "comments", source = "comments") // ✅ Fix: Uses CommentMapper
    BlogDTO toBlogDTO(Blog blog);

    // ✅ Convert `List<Comment>` to `List<CommentDTO>` using CommentMapper
    @Named("toCommentDTOList")
    default List<CommentDTO> toCommentDTOList(List<Comment> comments) {
        return comments != null ? comments.stream().map(comment -> new CommentDTO(
            comment.getId(),
            comment.getContent(),
            comment.getUser().getUsername(),
            comment.getCreatedAt()
        )).toList() : List.of(); // ✅ Ensure it returns an empty list if `null`
    }
    
    
    // ✅ Fix: Prevent circular dependency
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "comments", ignore = true)
    Blog toEntity(BlogDTO blogDTO);

}
