package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Config;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.transaction.Transactional;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    UserRepository repository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Users save(Users user) {

        Config config = new Config();
        config.setTheme("light");
        config.setUser(user);
        
        user.setConfig(config);
        // Codifica (hashea) la contraseña del usuario usando el passwordEncoder y la establece en el usuario
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repository.save(user);
    }

    @Override
    public List<Users> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Users> findByEmail(String email) {
       return repository.findByEmail(email);
    }

    @Override
    @Transactional
    public Optional<Users> updateUser(Long id, Users user) {
        Optional<Users> findUser = repository.findById(id);
    
        if (findUser.isPresent()) {
            Users existingUser = findUser.get(); // Obtener el usuario del Optional
    
            // Actualiza solo los campos que han sido proporcionados en la solicitud
            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            }
            if (user.getBio() != null) {
                existingUser.setBio(user.getBio());
            }
            if (user.getProfilePicture() != null) {
                existingUser.setProfilePicture(user.getProfilePicture());
            }
    
            repository.save(existingUser); // Guarda el usuario actualizado
            return Optional.of(existingUser);
        }
    
        return Optional.empty();
    }


    



}
