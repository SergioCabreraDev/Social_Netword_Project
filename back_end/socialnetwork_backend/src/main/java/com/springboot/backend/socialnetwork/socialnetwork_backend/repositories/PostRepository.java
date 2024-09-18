package com.springboot.backend.socialnetwork.socialnetwork_backend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Posts;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;

@Repository
public interface PostRepository extends CrudRepository<Posts, Long> {

    List<Posts> findAll();

    Optional<Posts> findPostByPostId(Long id);
    
    @Query(value = "select posts from Posts posts where posts.user.user_id = ?1")
    List<Posts> findPostByUserId(Long id);

    

}
