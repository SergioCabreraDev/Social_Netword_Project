package com.springboot.backend.socialnetwork.socialnetwork_backend.services;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDetailsImpl implements UserDetails{

    private final Users user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
       return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public String getUsernameUser(){
        return user.getUsername();
    }
 
    
 }