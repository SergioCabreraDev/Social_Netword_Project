package com.springboot.backend.socialnetwork.socialnetwork_backend.auth;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.springboot.backend.socialnetwork.socialnetwork_backend.auth.filter.JwtAuthenFilter;
import com.springboot.backend.socialnetwork.socialnetwork_backend.auth.filter.JwtAuthorFilter;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SpringSecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthorFilter jwtAuthorFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {

        // Configura el filtro de autenticación JWT
        JwtAuthenFilter jwtAuthenFilter = new JwtAuthenFilter();
        jwtAuthenFilter.setAuthenticationManager(authManager);
        jwtAuthenFilter.setFilterProcessesUrl("/login");

        return http
                .cors() // Habilita CORS
                .and()
                .csrf().disable() // Deshabilita CSRF para APIs sin estado

                // Configura las rutas públicas
                .authorizeRequests()
                .requestMatchers(HttpMethod.POST, "/login").permitAll() // Permite acceso sin autenticación a /login
                .requestMatchers(HttpMethod.POST, "/api/users").authenticated() // Requiere autenticación para /api/users
                .requestMatchers(HttpMethod.GET, "/api/posts").authenticated() // Requiere autenticación para /api/posts
                .requestMatchers(HttpMethod.PUT, "/api/users").authenticated() 
                .anyRequest().authenticated() // Cualquier otra ruta requiere autenticación

                // Configura la gestión de sesiones sin estado
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // Agrega los filtros de autenticación y autorización
                .and()
                .addFilter(jwtAuthenFilter)
                .addFilterBefore(jwtAuthorFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Define el codificador de contraseñas (BCrypt en este caso)
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configura el AuthenticationManager con el UserDetailsService y el codificador de contraseñas
    @Bean
    AuthenticationManager authManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();
    }
}
