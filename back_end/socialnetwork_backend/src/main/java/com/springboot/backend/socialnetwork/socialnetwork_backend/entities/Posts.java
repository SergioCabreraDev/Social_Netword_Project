package com.springboot.backend.socialnetwork.socialnetwork_backend.entities;

import java.sql.Timestamp;
import java.util.Optional;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    Long post_id;

    @Getter @Setter
    private String content;

    @Getter @Setter
    private String imageUrl;


    @Getter @Setter
    Timestamp createdAt;


    @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        @Getter  @Setter
        private Users user;
}
