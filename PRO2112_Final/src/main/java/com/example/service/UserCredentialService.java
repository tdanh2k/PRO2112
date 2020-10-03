package com.example.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.entity.UserCredential;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserCredentialService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String Username) throws UsernameNotFoundException {
		User user = userRepository.getUserByUsername(Username);

		if (user == null) {
			throw new UsernameNotFoundException("Could not find user");
		}
		
		String Password = new BCryptPasswordEncoder().encode(user.getPassword());
		user.setPassword(Password);

		return new UserCredential(user);
	}

}
