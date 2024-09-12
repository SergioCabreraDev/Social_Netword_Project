
package com.springboot.backend.socialnetwork.socialnetwork_backend.auth.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.socialnetwork.socialnetwork_backend.auth.AuthCredentials;
import com.springboot.backend.socialnetwork.socialnetwork_backend.auth.TokenUtils;
import com.springboot.backend.socialnetwork.socialnetwork_backend.services.UserDetailsImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenFilter extends UsernamePasswordAuthenticationFilter{

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
       
        AuthCredentials authCredentials = new AuthCredentials();

        try{

            authCredentials = new ObjectMapper().readValue(request.getReader(), AuthCredentials.class);

        } catch (IOException e){}
  
        UsernamePasswordAuthenticationToken usernamePAT = new UsernamePasswordAuthenticationToken(
                                                         authCredentials.getEmail(), 
                                                         authCredentials.getPassword(),
                                                         Collections.emptyList());                                          

        return getAuthenticationManager().authenticate(usernamePAT);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

       UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authResult.getPrincipal();
       String token = TokenUtils.createToken(userDetailsImpl.getUsernameUser(), userDetailsImpl.getUsername());
       
       response.addHeader("Authorization", "Bearer " + token);
       response.getWriter().flush();
       
        // TODO Auto-generated method stub
        super.successfulAuthentication(request, response, chain, authResult);
    }
    
}