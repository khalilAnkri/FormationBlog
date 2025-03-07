package com.backend.backend.Repositories;


 

import com.backend.backend.Enum.AccountStatus;
import com.backend.backend.Enum.Role;
import com.backend.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
    List<User> findByAccountStatus(AccountStatus pending);
    Integer countByAccountStatus(AccountStatus active);
}
