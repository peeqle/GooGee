package com.googee.googeeserver.resource.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

import static java.lang.String.format;


@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthResource {

	@Value("${spring.security.oauth2.client.registration.github.clientId}")
	private String clientId;

	@Value("${spring.security.oauth2.client.registration.github.clientSecret}")
	private String clientSecret;

	@PostMapping("/github/exchange")
	public ResponseEntity<?> fetchOrCreateGit(@RequestParam("code") String code) {
		RestTemplate restTemplate = new RestTemplate();
		String encodedCredentials = new String(Base64.getEncoder().encode(format("%s:%s", clientId, clientSecret).getBytes(StandardCharsets.UTF_8)));

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		httpHeaders.add("Authorization", "Basic " + encodedCredentials);
		HttpEntity<String> request = new HttpEntity<>(httpHeaders);

		String accessTokenUrl = "https://github.com/login/oauth/access_token";
		accessTokenUrl += "?code=" + code;
		accessTokenUrl += "&clientId=" + clientId;
		accessTokenUrl += "&clientSecret=" + clientSecret;
		accessTokenUrl += "&grant_type=";

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(accessTokenUrl);
		URI myUri = builder.buildAndExpand().toUri();

		return restTemplate.exchange(myUri, HttpMethod.POST, request, String.class);
	}
}
