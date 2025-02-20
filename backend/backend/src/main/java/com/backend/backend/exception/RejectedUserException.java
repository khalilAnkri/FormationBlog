package com.backend.backend.exception;

public class RejectedUserException extends RuntimeException {
    public RejectedUserException(String message) {
        super(message);
    }
}
