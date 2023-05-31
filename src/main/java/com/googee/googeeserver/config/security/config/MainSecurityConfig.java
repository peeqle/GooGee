package com.googee.googeeserver.config.security.config;

import com.googee.googeeserver.config.security.service.LogoutService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@EnableGlobalAuthentication

public class MainSecurityConfig {

	private final LogoutService logoutService;

	private final AuthenticationProvider authenticationProvider;

	private final JwtAuthenticationFilter authenticationFilter;

	private final AppUserServiceImpl appUserService;

	private final CorsFilter corsFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.cors().configure(http.addFilter(corsFilter));

		http
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/oauth2/**").permitAll()
				.requestMatchers("/api/v1/auth/**").permitAll()
				.requestMatchers("/ws/**").permitAll()
				.requestMatchers("/api/v1/images/**").permitAll()
				.anyRequest().authenticated()
			)
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authenticationProvider(authenticationProvider)
			.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
			.logout()
			.logoutUrl("/api/v1/auth/logout")
			.addLogoutHandler(logoutService)
			.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
		http.oauth2Login().authorizationEndpoint()
			.baseUri("/oauth2/authorization/github")
			.baseUri("/oauth2/authorization/google")
			.and()
			.redirectionEndpoint()
			.baseUri("/oauth2/code/github")
			.baseUri("/oauth2/code/google")
			.and()
			.tokenEndpoint()
			.accessTokenResponseClient(accessTokenResponseClient())
			.and()
			.userInfoEndpoint().userService(oidcUserService());
		return http.build();
	}

	@Bean
	public OAuth2UserService<OAuth2UserRequest, OAuth2User> oidcUserService() {
		final OidcUserService delegate = new OidcUserService();
		return (userRequest) -> {
			// Delegate to the default implementation for loading a user
//			OidcUser oidcUser = delegate.loadUser(userRequest.getClientRegistration();

			//OAuth2AccessToken accessToken = userRequest.getAccessToken();
			//Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

			// TODO
			// 1) Fetch the authority information from the protected resource using accessToken
			// 2) Map the authority information to one or more GrantedAuthority's and add it to mappedAuthorities

			// 3) Create a copy of oidcUser but use the mappedAuthorities instead
			//oidcUser = new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());

			return (OAuth2User) userRequest;
		};
	}

	@Bean
	public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
		DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new DefaultAuthorizationCodeTokenResponseClient();

//		accessTokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter());

//		OAuth2AccessTokenResponseHttpMessageConverter tokenResponseHttpMessageConverter = new OAuth2AccessTokenResponseHttpMessageConverter();
//		tokenResponseHttpMessageConverter.setTokenResponseConverter(new OAuth2AccessTokenResponseConverterWithDefaults());

		RestTemplate restTemplate = new RestTemplate(Arrays.asList(new FormHttpMessageConverter()));
		restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());

		accessTokenResponseClient.setRestOperations(restTemplate);
		return accessTokenResponseClient;
	}
}
