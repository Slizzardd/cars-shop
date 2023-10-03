package ua.com.alevel.facade.impl;

import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.alevel.exception.EntityExistException;
import ua.com.alevel.facade.UserFacade;
import ua.com.alevel.persistence.entity.User;
import ua.com.alevel.service.UserService;
import ua.com.alevel.util.JwtUtil;
import ua.com.alevel.web.dto.request.UserRequestDto;
import ua.com.alevel.web.dto.response.JwtResponse;

@Service
public class UserFacadeImpl implements UserFacade {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    public UserFacadeImpl(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public JwtResponse createUser(UserRequestDto userRequestDto) throws EntityExistException, JwtException {
        User user = new User();

        setUserData(userRequestDto, user);

        user.setPassword(userRequestDto.getPassword());

       userService.createUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword())
        );

        String username = authentication.getName();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new JwtResponse(JwtUtil.generateJwtToken(username), username);
    }

    private void setUserData(UserRequestDto userRequestDto, User user){
        user.setEmail(userRequestDto.getEmail());
        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setPhoneNumber(userRequestDto.getPhoneNumber());    }
}
