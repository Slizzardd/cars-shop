package ua.com.alevel.facade;

import ua.com.alevel.web.dto.request.UserRequestDto;
import ua.com.alevel.web.dto.response.JwtResponse;
import ua.com.alevel.web.dto.response.UserResponseDto;

public interface UserFacade extends BaseFacade<UserRequestDto, UserResponseDto> {


    JwtResponse createUser(UserRequestDto userRequestDto);
}
