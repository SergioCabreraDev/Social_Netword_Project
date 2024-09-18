package com.springboot.backend.socialnetwork.socialnetwork_backend.entities.DTO;

import lombok.Getter;
import lombok.Setter;

public class LikesDTO {
    
    @Getter @Setter
    private Long post_id;
    @Getter @Setter
    private Long user_id;
    
}
