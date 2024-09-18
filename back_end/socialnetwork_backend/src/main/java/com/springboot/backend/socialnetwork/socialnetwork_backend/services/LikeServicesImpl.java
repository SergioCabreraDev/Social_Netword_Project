package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Likes;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.LikeRepository;


@Service
public class LikeServicesImpl implements LikeServices {


    @Autowired
    LikeRepository repository;

    @Override
    @Transactional
    public void deleteById(Long id) {


    repository.deleteById(id);


    }

    @Override
    @Transactional
    public Likes addLikes(Likes like) {
        return repository.save(like);
    }


    
}
