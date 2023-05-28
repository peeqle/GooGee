package com.googee.googeeserver;

import com.googee.googeeserver.data.repo.mongo.messages.ChatMessagesRepository;
import com.googee.googeeserver.models.chat.ChatMessage;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = ChatMessagesRepository.class)
public class GooGeeServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GooGeeServerApplication.class, args);
    }
}
