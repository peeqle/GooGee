package com.googee.googeeserver.data.repo.token;

import com.googee.googeeserver.models.token.Token;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.ElementCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
            select t from Token t inner join AppUser u\s
            on t.appUser.id = u.id\s
            where u.id = :id and (t.expired = false or t.revoked = false)\s
            """)
    List<Token> findAllValidTokenByAppUser(Long id);

    @Query(value = """
            select t from Token t where t.token = :token and (t.expired = false or t.revoked = false)\s
                        """)
    Token findValidTokenByToken(String token);

    void deleteAllByAppUser(AppUser appUser);

    Optional<Token> findByToken(String token);
}
