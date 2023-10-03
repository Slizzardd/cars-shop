package ua.com.alevel.web.rest;

import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.alevel.exception.EntityExistException;
import ua.com.alevel.facade.UserFacade;
import ua.com.alevel.util.JwtUtil;
import ua.com.alevel.web.dto.request.UserRequestDto;
import ua.com.alevel.web.dto.response.JwtResponse;

@RestController
@RequestMapping("/api/v1/user")
public class UserRestController {

    private final UserFacade userFacade;

    private final AuthenticationManager authenticationManager;

    public UserRestController(UserFacade userFacade, AuthenticationManager authenticationManager) {
        this.userFacade = userFacade;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserRequestDto userRequestDto) {
        try {
            return ResponseEntity.ok(userFacade.createUser(userRequestDto));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (EntityExistException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @PostMapping("/loginUser")
    public ResponseEntity<?> login(@RequestBody UserRequestDto userRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword())
            );

            String username = authentication.getName();
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok(new JwtResponse(JwtUtil.generateJwtToken(username), username));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You entered the wrong email/password");
        }
    }
}
