package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Posts;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class PostServicesImpl implements PostServices {

    @Autowired
    PostRepository repository;

    @Transactional
    @Override
    public Posts save(Posts post) {
        
        return repository.save(post);
    }

    @Override
    public List<Posts> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Posts> findPostByUserId(Long id) {
       return repository.findPostByUserId(id);
    }

    @Override
    public Optional<Posts> findPostById(Long id) {
        return repository.findPostByPostId(id);
    }

    

}
