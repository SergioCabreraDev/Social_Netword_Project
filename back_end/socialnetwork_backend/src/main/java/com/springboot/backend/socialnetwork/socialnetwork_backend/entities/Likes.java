package com.springboot.backend.socialnetwork.socialnetwork_backend.entities;

import java.sql.Timestamp;
import java.util.Optional;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "likes")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    Long like_id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference // Añadido para evitar la recursión
    @Getter @Setter
    private Posts posts;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @Getter @Setter
    private Users user;

    @Getter @Setter
    Timestamp liked_at;
}

