package com.backend.backend.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.backend.backend.Dto.UserDTO;
import com.backend.backend.Entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

 
    UserDTO toUserDTO(User user);

    // @Named("mapRoles")
    // default Set<String> mapRoles(Set<com.example.blog.entity.Role> roles) {
    //     return roles.stream().map(com.example.blog.entity.Role::getName).collect(Collectors.toSet());
    // }
}