package com.springboot.backend.socialnetwork.socialnetwork_backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Likes;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Posts;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.DTO.LikesDTO;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.LikeRepository;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.PostRepository;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.UserRepository;
import com.springboot.backend.socialnetwork.socialnetwork_backend.services.LikeServices;

@CrossOrigin(origins =  {"http://localhost:4200"}, originPatterns = {"*"})  // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/likes")
public class LikeController {


    @Autowired
    LikeRepository repository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LikeServices services;

    @DeleteMapping
    public ResponseEntity<?> deleteLikeById(@RequestParam Long id) {

        services.deleteById(id);
        
        return ResponseEntity.noContent().build(); // Retorna 204 No Content

    }

    @PostMapping
    public ResponseEntity<Likes> addLike(@RequestBody LikesDTO likeDTO) {
        // Buscar el post usando el post_id
        Posts post = postRepository.findById(likeDTO.getPost_id())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        // Buscar el user usando el user_id
        Users user = userRepository.findById(likeDTO.getUser_id())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Crear el objeto Likes y asignar el post y el user
        Likes like = new Likes();
        like.setPosts(post);  // Ahora se pasa el 'Post' directamente
        like.setUser(user);

        // Guardar el Like
        Likes addLike = services.addLikes(like);

        return ResponseEntity.ok().body(addLike);
    }

    




    
}
