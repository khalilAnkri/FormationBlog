package com.backend.backend.Mappers;

import org.mapstruct.*;

import com.backend.backend.Dto.BlogDTO;
import com.backend.backend.Entities.Blog;

@Mapper(componentModel = "spring")
public interface BlogMapper {

    @Mapping(source = "author.username", target = "authorUsername")
    @Mapping(target = "likeCount", expression = "java(blog.getLikes() != null ? blog.getLikes().size() : 0)")
    BlogDTO toBlogDTO(Blog blog);
}
