package com.springboot.backend.socialnetwork.socialnetwork_backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    List<Users> findAll();

    Optional<Users> findByEmail(String email);
    
    Optional<Users> findById(Long user_id);

}
