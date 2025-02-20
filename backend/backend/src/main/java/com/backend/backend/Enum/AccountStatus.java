package com.backend.backend.Enum;

public enum AccountStatus {
    PENDING,  // ✅ User needs admin approval
    ACTIVE,   // ✅ User is approved
    REJECTED  // ❌ User is rejected
}
