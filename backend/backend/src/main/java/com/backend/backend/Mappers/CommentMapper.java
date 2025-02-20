package com.backend.backend.Mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Entities.Comment;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "user.username", target = "username") // ✅ Map user to username
    CommentDTO toCommentDTO(Comment comment);

    // ✅ Convert List<Comment> → List<CommentDTO>
    List<CommentDTO> toCommentDTOList(List<Comment> comments);
}
