
package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      Users user =  userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado" + email));

      return new UserDetailsImpl(user);
    }


     
}