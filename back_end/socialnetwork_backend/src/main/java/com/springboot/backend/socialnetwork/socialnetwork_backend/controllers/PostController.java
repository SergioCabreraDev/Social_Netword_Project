package com.springboot.backend.socialnetwork.socialnetwork_backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Posts;
import com.springboot.backend.socialnetwork.socialnetwork_backend.entities.Users;
import com.springboot.backend.socialnetwork.socialnetwork_backend.repositories.UserRepository;
import com.springboot.backend.socialnetwork.socialnetwork_backend.services.PostServices;

@CrossOrigin(origins =  {"http://localhost:4200"}, originPatterns = {"*"})  // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    PostServices services;

    @Autowired
    UserRepository repositoryUser;

    // Método para crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> create(@Validated @RequestBody Posts post, BindingResult result, @RequestParam Long userId) {

        Optional<Users> userOptional = repositoryUser.findById(userId);


        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        

        if (result.hasErrors()) {  // Si hay errores de validación, retorna una respuesta de validación
            return validation(result);
        }

    // Obtener el objeto User del Optional
    Users user = userOptional.get();

    // Asociar el usuario con el post
    post.setUser(user);

    // Si no hay errores, guarda el usuario y retorna CREATED con el usuario guardado
    return ResponseEntity.status(HttpStatus.CREATED).body(services.save(post));
    }

    @GetMapping
    public List<Posts> findAllPosts(){
        return services.findAll();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> findPostById(@PathVariable Long id){
        Optional<Posts> post = services.findPostById(id);
        Posts postSuccess =post.get();
        if (!post.isPresent()) {
            return ResponseEntity.badRequest().body("post not found");
        }

        return ResponseEntity.ok(postSuccess);
    }

    @GetMapping("/profile")
    public List<Posts> findPostsByUserId(@RequestParam Long id){
        return services.findPostByUserId(id);
    }
   





             // Método privado para manejar los errores de validación
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        // Itera sobre los errores y los agrega al mapa de errores
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "The field  " + error.getField() + " " + error.getDefaultMessage());
        });
        // Retorna una respuesta de error badRequest con los errores de validación
        return ResponseEntity.badRequest().body(errors);
    }
}
