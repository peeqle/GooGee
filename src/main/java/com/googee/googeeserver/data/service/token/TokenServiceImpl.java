package com.googee.googeeserver.data.service.token;

import com.googee.googeeserver.data.repo.token.TokenRepository;
import com.googee.googeeserver.models.token.Token;
import com.googee.googeeserver.models.user.AppUser;
import io.jsonwebtoken.Jwts;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenServiceImpl {

    private final TokenRepository tokenRepository;

    public void save(Token token) {
        tokenRepository.save(token);
    }

    public void saveAll(List<Token> tokens) {
        tokenRepository.saveAll(tokens);
    }

    public void deleteAllTokensForUser(AppUser appUser) {
        tokenRepository.deleteAllByAppUser(appUser);
    }

	public void deleteTokensByIds(Collection<Integer> ids) {
		tokenRepository.deleteAllById(ids);
	}

    public Token findTokenByValue(String tokenValue) {
        return tokenRepository.findValidTokenByToken(tokenValue);
    }

    public List<Token> findAllTokensForUser(Long id) {
        return tokenRepository.findAllValidTokenByAppUser(id);
    }

    public Token findByTokenString(String token) {
        Optional<Token> tokenOptional = tokenRepository.findByToken(token);

        return tokenOptional.orElse(null);
    }
}
