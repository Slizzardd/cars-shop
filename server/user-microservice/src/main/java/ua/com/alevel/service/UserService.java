package ua.com.alevel.service;

import ua.com.alevel.exception.EntityExistException;
import ua.com.alevel.persistence.entity.User;

public interface UserService extends BaseService<User> {

    User createUser(User user) throws EntityExistException;
}
