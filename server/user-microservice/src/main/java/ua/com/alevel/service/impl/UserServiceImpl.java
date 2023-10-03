package ua.com.alevel.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.alevel.exception.EntityExistException;
import ua.com.alevel.logger.InjectLog;
import ua.com.alevel.logger.LoggerLevel;
import ua.com.alevel.logger.LoggerService;
import ua.com.alevel.persistence.entity.User;
import ua.com.alevel.persistence.repository.UserRepository;
import ua.com.alevel.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @InjectLog
    private final LoggerService loggerService;
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, LoggerService loggerService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loggerService = loggerService;
    }

    @Override
    public User createUser(User user) {
        checkEmail(user.getEmail());
        checkPhoneNumber(user.getPhoneNumber());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);

        loggerService.commit(LoggerLevel.INFO, "Create new User with ID= " + result.getId());
        return result;
    }

    private Boolean checkEmail(String userEmail) throws EntityExistException{
        if(!userRepository.existsByEmail(userEmail)){
            return true;
        }else {
            throw new EntityExistException("A user with this email already exists");
        }
    }

    private Boolean checkPhoneNumber(String userPhoneNumber) {
        if(!userRepository.existsByPhoneNumber(userPhoneNumber)){
            return true;
        }else {
            throw new EntityExistException("A user with this phone number already exists");
        }
    }
}
