package com.backend.backend.Services;

import com.backend.backend.Dto.UserDTO;
import java.util.Optional;

public interface UserService {
    UserDTO getUserById(Long userId);
    Optional<UserDTO> getUserByEmail(String email);
    UserDTO addUser(UserDTO userDTO);  
    void deleteUser(Long userId);  
}
