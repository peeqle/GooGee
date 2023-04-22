package com.googee.googeeserver.resource;

import com.googee.googeeserver.models.request.AuthenticationRequest;
import com.googee.googeeserver.models.request.AuthenticationResponse;
import com.googee.googeeserver.config.security.service.AuthenticationService;
import com.googee.googeeserver.models.request.RegisterRequest;
import com.googee.googeeserver.utils.exceptions.token.TokenExpiredException;
import com.googee.googeeserver.utils.exceptions.token.TokenNotFoundException;
import com.googee.googeeserver.utils.exceptions.token.TokenNotValidException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.TextScore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshTokens(@RequestParam String refreshToken) {
		var authResponse = new AuthenticationResponse();
		authResponse.setSuccess(false);
        try {
            var tokens = service.refresh(refreshToken);

			authResponse.setRefreshToken(tokens.getRefreshToken());
			authResponse.setAccessToken(tokens.getAccessToken());
			authResponse.setSuccess(true);

            return ResponseEntity.ok(authResponse);
        } catch (TokenNotFoundException e) {
            return ResponseEntity.status(404).build();
        } catch (TokenNotValidException e) {
            return ResponseEntity.status(404).build();
        } catch (TokenExpiredException e) {
            return ResponseEntity.status(404).build();
        }
    }
}

