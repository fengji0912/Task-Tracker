package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {
    System.out.println("收到注册请求: " + user.getUsername());

    if (userRepository.findByUsername(user.getUsername()) != null) {
        System.out.println("用户名已存在");
        return ResponseEntity.badRequest().body(Map.of("error", "用户名已存在"));
    }

    userRepository.save(user);
    System.out.println("用户保存成功");

    return ResponseEntity.ok(Map.of("message", "注册成功"));
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser, HttpSession session) {
        User user = userRepository.findByUsername(loginUser.getUsername());
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "用户不存在"));
        }
        if (!user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "密码错误"));
        }

        // 保存用户到 session
        session.setAttribute("user", user.getUsername());

        return ResponseEntity.ok(Map.of(
                "message", "登录成功",
                "username", user.getUsername()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(HttpSession session) {
        Object username = session.getAttribute("user");
        if (username != null) {
            return ResponseEntity.ok(Map.of("username", username));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "未登录"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "已退出"));
    }
}
