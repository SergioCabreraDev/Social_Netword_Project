package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Posts;

public interface PostServices {

    Posts save(Posts post);

    List<Posts> findAll();

    @Query(value = "select posts from Posts posts where posts.user.user_id = ?1")
    List<Posts> findPostByUserId(Long id);
    
}
