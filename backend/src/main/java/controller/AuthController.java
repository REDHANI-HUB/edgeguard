package com.example.edgeguard.controller;

import com.example.edgeguard.model.User;
import com.example.edgeguard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user) {

        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(
            @RequestBody User user) {

        User existingUser =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        if (existingUser != null) {
            return "Login Successful";
        }

        return "Invalid Email or Password";
    }
}