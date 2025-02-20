package com.backend.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Collections;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ❌ Handle User Already Exists
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", ex.getMessage()));
    }

    // ❌ Handle Invalid Credentials
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<?> handleInvalidCredentials(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", ex.getMessage()));
    }

    // ❌ Handle Unauthorized Access (403 Forbidden)
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<?> handleUnauthorizedAccess(UnauthorizedAccessException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", ex.getMessage()));
    }

    // ❌ Handle Spring Security Access Denied
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "You don't have permission to access this resource."));
    }

    // ❌ Handle Other Unexpected Errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "An unexpected error occurred: " + ex.getMessage()));
    }

     // ❌ Handle Blog Not Found
     @ExceptionHandler(BlogNotFoundException.class)
     public ResponseEntity<?> handleBlogNotFoundException(BlogNotFoundException ex) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", ex.getMessage()));
     }

     @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
     public ResponseEntity<?> handleAuthenticationException(org.springframework.security.core.AuthenticationException ex) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                 .body(Collections.singletonMap("error", ex.getMessage()));  // ✅ Show real error message
     }
     

       // ❌ Handle Unauthorized Actions
    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<?> handleUnauthorizedActionException(UnauthorizedActionException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", ex.getMessage()));
    }



    @ExceptionHandler(PendingUserException.class)
    public ResponseEntity<String> handlePendingUserException(PendingUserException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }

    @ExceptionHandler(RejectedUserException.class)
    public ResponseEntity<String> handleRejectedUserException(RejectedUserException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
 

    

}
