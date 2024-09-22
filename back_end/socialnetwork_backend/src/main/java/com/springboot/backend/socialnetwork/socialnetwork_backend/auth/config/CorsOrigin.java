package com.springboot.backend.socialnetwork.socialnetwork_backend.auth.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsOrigin {

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            
            @Override
            public void addCorsMappings(CorsRegistry registry){
                
                registry.addMapping("/login")
                    .allowedOrigins("http://localhost:4200", "http://192.168.0.27:4200")
                    .allowedMethods("*")
                    .exposedHeaders("Authorization"); // Asegúrate de exponer el encabezado Authorization

                registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200", "http://192.168.0.27:4200")
                    .allowedMethods("*")
                    .exposedHeaders("Authorization"); // Asegúrate de exponer el encabezado Authorization
            }
        };
    }
}

