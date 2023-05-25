package com.googee.googeeserver.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.post.Post;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

import static org.hibernate.annotations.CascadeType.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AppUser implements UserDetails, Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;

	private String password;

	private String email;

	private String imageKey;

	private String status;

	private Long lastActive;

	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "user_role",
		joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private Collection<Role> roles = List.of(Role.USER);

	@Cascade(ALL)
	@OneToMany(mappedBy = "appUser")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Token> tokens;

	@Cascade(ALL)
	@OneToMany(mappedBy = "creatorUser")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Post> posts;

	@ManyToMany
	@Cascade(PERSIST)
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<AppUser> blockedUsers;

	@ManyToMany
	@Cascade(PERSIST)
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<AppUser> friendlyUsers;

	private boolean isAccountNonExpired = true;

	private boolean isAccountNonLocked = true;

	private boolean isCredentialsNonExpired = true;

	private boolean isEnabled = true;

	private AppUserAdditionalInfo appUserAdditionalInfo = new AppUserAdditionalInfo();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.isEnabled;
	}

	public AppUser (Long id) {
		this.id = id;
	}

	public AppUser (Long id, String username) {
		this.id = id;
	}

	public static AppUserDTO mapToDTO(AppUser appUser) {
		return AppUserDTO.builder()
			.id(appUser.getId())
			.username(appUser.getUsername()).build();
	}
}
