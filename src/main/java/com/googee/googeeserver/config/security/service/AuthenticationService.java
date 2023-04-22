package com.googee.googeeserver.config.security.service;

import com.googee.googeeserver.models.request.AuthenticationRequest;
import com.googee.googeeserver.models.request.AuthenticationResponse;
import com.googee.googeeserver.models.request.RegisterRequest;
import com.googee.googeeserver.config.security.service.jwt.JwtService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.data.service.token.TokenServiceImpl;
import com.googee.googeeserver.models.token.Token;
import com.googee.googeeserver.models.token.TokenType;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.utils.exceptions.token.TokenExpiredException;
import com.googee.googeeserver.utils.exceptions.token.TokenNotFoundException;
import com.googee.googeeserver.utils.exceptions.token.TokenNotValidException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final JwtService jwtService;

	private final AppUserServiceImpl appUserService;

	private final TokenServiceImpl tokenService;

	private final PasswordEncoder passwordEncoder;

	private final DaoAuthenticationProvider daoAuthenticationProvider;

	public AuthenticationResponse register(RegisterRequest request) {
		AppUser appUser = new AppUser();

		appUser.setUsername(request.getUsername());
		appUser.setPassword(passwordEncoder.encode(request.getPassword()));
		appUser.setEmail(request.getEmail());

		var savedUser = appUserService.save(appUser);
		var jwtAccessToken = jwtService.generateAccessToken(appUser);
		var jwtRefreshToken = jwtService.generateRefreshToken(appUser);

		saveUserToken(savedUser, jwtAccessToken, TokenType.BEARER);
		saveUserToken(savedUser, jwtRefreshToken, TokenType.REFRESH);
		return AuthenticationResponse.builder()
			.accessToken(jwtAccessToken)
			.refreshToken(jwtRefreshToken)
			.build() ;
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(request.getUsername(), request.getPassword()));
		try {
			var user = appUserService.loadUserByUsername(request.getUsername());

			var accessTokenJwt = jwtService.generateAccessToken(user);
			var refreshTokenJwt = jwtService.generateRefreshToken(user);

			updateUserTokenData(accessTokenJwt, refreshTokenJwt, user);

			return AuthenticationResponse.builder()
				.accessToken(accessTokenJwt)
				.refreshToken(refreshTokenJwt)
				.build();
		} catch (UsernameNotFoundException e) {
			return null;
		}
	}

	public AuthenticationResponse refresh(String refreshToken) throws TokenNotFoundException, TokenNotValidException, TokenExpiredException {
		Token token = tokenService.findTokenByValue(refreshToken);

		if (token == null) {
			throw new TokenNotFoundException(format("Token %s not found", refreshToken));
		}

		AppUser appUser = token.getAppUser();

		if (appUser == null) {
			throw new TokenNotValidException();
		}

		var accessTokenJwt = jwtService.generateAccessToken(appUser);
		var refreshTokenJwt = jwtService.generateRefreshToken(appUser);

		updateUserTokenData(accessTokenJwt, refreshTokenJwt, appUser);

		return AuthenticationResponse.builder()
			.accessToken(accessTokenJwt)
			.refreshToken(refreshTokenJwt)
			.build();
	}

	private void saveUserToken(AppUser user, String jwtToken, TokenType tokenType) {
		var token = Token.builder()
			.appUser(user)
			.token(jwtToken)
			.tokenType(tokenType)
			.expired(false)
			.revoked(false)
			.build();
		tokenService.save(token);
	}

	private List<Integer> fetchAllUserTokens(AppUser appUser) {
		return tokenService.findAllTokensForUser(appUser.getId()).stream().map(Token::getId).toList();
	}

	private void revokeAllUserTokens(AppUser appUser) {
		var validUserTokens = tokenService.findAllTokensForUser(appUser.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		tokenService.saveAll(validUserTokens);
	}

	private void deleteAllTokensForUser(AppUser appUser) {
		tokenService.deleteAllTokensForUser(appUser);
	}

	private void updateUserTokenData(String accessTokenJwt, String refreshTokenJwt, AppUser appUser) {
		List<Integer> appUserTokensIds = fetchAllUserTokens(appUser);

		saveUserToken(appUser, accessTokenJwt, TokenType.BEARER);
		saveUserToken(appUser, refreshTokenJwt, TokenType.REFRESH);

		tokenService.deleteTokensByIds(appUserTokensIds);
	}
}
