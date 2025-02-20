package com.backend.backend.Security;

import com.backend.backend.Enum.AccountStatus;
import com.backend.backend.Entities.User;
import com.backend.backend.Repositories.UserRepository;
import com.backend.backend.exception.PendingUserException;
import com.backend.backend.exception.RejectedUserException;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

  @Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

    if (user.getAccountStatus() == AccountStatus.PENDING) {
        throw new PendingUserException("Your account is pending approval.");
    } else if (user.getAccountStatus() == AccountStatus.REJECTED) {
        throw new RejectedUserException("Your account has been rejected.");
    }

    GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name());

    return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            Collections.singletonList(authority)
    );
}

}
