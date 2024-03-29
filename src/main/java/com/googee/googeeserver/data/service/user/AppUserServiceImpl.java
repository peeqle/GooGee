package com.googee.googeeserver.data.service.user;

import com.googee.googeeserver.data.repo.user.AppUserRepository;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Set;

import static java.lang.String.format;
import static org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements UserDetailsManager {

	private final AppUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	@Cache(include = "all", region = "", usage = READ_WRITE)
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
		return userRepository.findAppUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
	}

	public AppUser tryGetAppUserById(Long userId) {
		return userRepository.findAppUserById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public boolean addToFriends(AppUser appUser, Long userId) {
		AppUser targetUser = tryGetAppUserById(userId);
		Set<AppUser> friendlyUsers = appUser.getFriendlyUsers();
		friendlyUsers.add(targetUser);

		appUser.setFriendlyUsers(friendlyUsers);
		return userRepository.saveAndFlush(appUser) != null;
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
}
