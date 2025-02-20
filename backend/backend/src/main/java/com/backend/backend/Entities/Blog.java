package com.backend.backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.backend.Dto.CommentDTO;
import com.backend.backend.Enum.BlogStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "blogs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("blog")
    private List<Comment> comments;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    private List<Like> likes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING) // ✅ Stores as String in DB
    @Column(nullable = false)
    private BlogStatus blogStatus = BlogStatus.PENDING; // ✅ Default to PENDING
}
