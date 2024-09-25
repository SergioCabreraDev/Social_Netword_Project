package com.springboot.backend.socialnetwork.socialnetwork_backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "config")
public class Config {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    Long id;

    @Getter @Setter
    String theme;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore  // Evitar que Jackson serialice el usuario y cause el bucle
    @Getter @Setter
    private Users user;
    
    
}
