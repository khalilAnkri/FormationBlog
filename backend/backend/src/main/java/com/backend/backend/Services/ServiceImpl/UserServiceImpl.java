package com.backend.backend.Services.ServiceImpl;

import com.backend.backend.Dto.UserDTO;
import com.backend.backend.Entities.User;
import com.backend.backend.Mappers.UserMapper;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDTO getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(userMapper::toUserDTO).orElse(null);
    }

    @Override
    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(userMapper::toUserDTO);
    }

     
    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());  
        userRepository.save(user);
        return userMapper.toUserDTO(user);
    }

 
    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }
}
