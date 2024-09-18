package com.springboot.backend.socialnetwork.socialnetwork_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Likes;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends CrudRepository<Likes, Long> {

    

    
} 
