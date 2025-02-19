package com.backend.backend.Mappers;

 
import org.mapstruct.*;

import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Entities.Comment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "user.username", target = "username")
    CommentDTO toCommentDTO(Comment comment);
}
