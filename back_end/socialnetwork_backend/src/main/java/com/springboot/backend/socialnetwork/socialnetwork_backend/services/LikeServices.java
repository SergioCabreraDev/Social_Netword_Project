package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Likes;

public interface LikeServices {
    
    void deleteById(Long id);

    Likes addLikes(Likes like);

}
