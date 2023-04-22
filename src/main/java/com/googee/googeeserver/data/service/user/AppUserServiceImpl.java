package com.googee.googeeserver.data.service.user;

import com.googee.googeeserver.data.repo.user.AppUserRepository;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static com.googee.googeeserver.models.user.Role.ADMIN;
import static com.googee.googeeserver.models.user.Role.USER;
import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements UserDetailsManager {

	private final AppUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public AppUser loadUserByUsername(String username) {
		return userRepository.findAppUserByUsername(username).orElseThrow(
			() -> new UsernameNotFoundException(MessageFormat.format("Username {0} doesn't exist!", username)));
	}

	@Override
	public void createUser(UserDetails user) {
		save(user);
	}

	@Override
	public void updateUser(UserDetails user) {
		save(user);
	}

	@Override
	public void deleteUser(String username) {
	}

	@Override
	public void changePassword(String oldPassword, String newPassword) {

	}

	@Override
	public boolean userExists(String username) {
		return usernameExists(username);
	}


	public AppUser save(AppUser appUser) {
		return userRepository.save(appUser);
	}

	public AppUser save(UserDetails userDetails) {
		AppUser appUser = new AppUser();
		appUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
		appUser.setUsername(userDetails.getUsername());
		appUser.setRoles(userDetails.getAuthorities().stream().map(ath -> Role.valueOf(ath.getAuthority())).toList());

		return userRepository.save(appUser);
	}

	public AppUser findAppUserByUsername(String username) {
		return userRepository.findAppUserByUsername(username).get();
	}

	public AppUser tryGetAppUserById(Long userId) {
		return userRepository.findAppUserById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public boolean usernameExists(String username) {
		return userRepository.findAppUserByUsername(username).isPresent();
	}

	public boolean emailExists(String email) {
		return userRepository.findAppUserByEmail(email).isPresent();
	}

	public boolean exists(Long id) {
		return userRepository.findAppUserById(id).isPresent();
	}

	public Role getRole(String roleName) {
		return switch (roleName) {
			case "ADMIN" -> ADMIN;
			default -> USER;
		};
	}
}
