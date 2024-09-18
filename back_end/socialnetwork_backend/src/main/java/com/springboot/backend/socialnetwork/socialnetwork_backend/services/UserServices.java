package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.List;
import java.util.Optional;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;

public interface UserServices {

    Users save(Users user);
    List<Users> findAll();
    Optional<Users> findByEmail(String email);
    Optional<Users> updateUser(Long id, Users user);
    

}
