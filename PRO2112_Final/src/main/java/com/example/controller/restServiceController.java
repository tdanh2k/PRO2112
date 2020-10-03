package com.example.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.entity.phpTest;
import com.example.service.phpRepoService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class restServiceController {

	private final phpRepoService phpRepoService;

	@GetMapping("/rest/getAll")
	public ResponseEntity<List<phpTest>> getAll() {
		List<phpTest> response;
		try {
			response = phpRepoService.getAll();

			if (response == null)
				throw new NullPointerException();

			return ResponseEntity.ok().body(response);
		} catch (NullPointerException npe) {
			return ((BodyBuilder) ResponseEntity.notFound()).body(new ArrayList<phpTest>());
		} catch (Exception e) {
			return ((BodyBuilder) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR))
					.body(new ArrayList<phpTest>());
		}
	}

	@GetMapping(value = "/rest/getByID/{id}")
	public ResponseEntity<phpTest> getphpTestById(@PathVariable(value = "id", required = false) String Id) {
		phpTest response;

		try {
			response = phpRepoService.getByID(Id).get();
			

			return ResponseEntity.ok().body(response);
		} catch (IllegalArgumentException ilarge) {
			return ((BodyBuilder) ResponseEntity.badRequest()).body(new phpTest());
		} catch (NoSuchElementException nsee) {
			return ((BodyBuilder) ResponseEntity.notFound()).body(new phpTest());
		} catch (Exception e) {
			return ((BodyBuilder) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)).body(new phpTest());
		}
	}

	@PostMapping(value = "/rest/create")
	public ResponseEntity<Object> createPhpTest(@RequestBody phpTest requestObj) {
		phpTest response = phpRepoService.insertOrUpdate(requestObj);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
}
