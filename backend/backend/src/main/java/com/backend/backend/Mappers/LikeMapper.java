package com.backend.backend.Mappers;

 
import org.mapstruct.*;

import com.backend.backend.Dto.LikeDTO;
import com.backend.backend.Entities.Like;

@Mapper(componentModel = "spring")
public interface LikeMapper {

    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "blog.id", target = "blogId")
    LikeDTO toLikeDTO(Like like);
}

