package com.example.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.entity.phpTest;
import com.example.service.phpRepoService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class phpController {
	
	private final phpRepoService phpRepoService;

	@GetMapping("/login")
	public ModelAndView login() {
		return new ModelAndView("login/login");
	}

	@GetMapping("/index")
	public ModelAndView redirectToMain() throws IOException {
		ModelAndView mav = new ModelAndView("index");
		return mav;
	}

	@GetMapping(value = "/phpTest/getAll")
	public ModelAndView getAllValue() {
		ModelAndView mav = new ModelAndView("data");
		mav.addObject("dataObj", phpRepoService.getAll());
		return mav;
	}

	@GetMapping(value = "/testTable")
	public ModelAndView tableUI(HttpServletRequest request) {
		ModelAndView mav = new ModelAndView("testTable/testTable");
		return mav;
	}

	@PostMapping(value = "/testTable", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> testTable(HttpEntity<String> httpEntity) throws JSONException {
		JSONObject requestData = null;
		try {
			requestData = new JSONObject(httpEntity.getBody());
			return ResponseEntity.ok().body(phpRepoService.tableRequest(requestData, true));
		} catch (JSONException je) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(je.getMessage());
		} catch (DataAccessException dae) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(dae.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(e.getMessage());
		}
	}
	
	@PostMapping(value = "/DataTablesInput")
    public ResponseEntity<DataTablesOutput<phpTest>> list(@Valid @RequestBody DataTablesInput input) {
		DataTablesOutput<phpTest> response = phpRepoService.list(input);
		
    	return ResponseEntity.ok().body(response);
    }

	@PostMapping(value = "/testTable/insert", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<Object> insert(@ModelAttribute phpTest req) {
		try {
			phpTest returnObj = phpRepoService.insertOrUpdate(req);
			return ResponseEntity.ok().body(returnObj);
		} catch (IllegalArgumentException ilae) {
			return ResponseEntity.badRequest().body(ilae.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PutMapping(value = "/testTable/update", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<Object> update(@ModelAttribute phpTest req) {
		try {
			phpTest returnObj = phpRepoService.insertOrUpdate(req);
			return ResponseEntity.ok().body(returnObj);
		} catch (IllegalArgumentException ilae) {
			return ResponseEntity.badRequest().body(ilae.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@DeleteMapping(value = "/testTable/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(HttpEntity<String> httpEntity) {
		ObjectMapper objMapper = new ObjectMapper();
		phpTest requestedObj = null;
		try {
			requestedObj = objMapper.readValue(httpEntity.getBody(), phpTest.class);
			System.out.println(requestedObj.getId() + ", " + requestedObj.getName() + ", " + requestedObj.getLogo());
			phpRepoService.delete(requestedObj);
			
			return ResponseEntity.ok().body("Request completed!");
		} catch (IllegalArgumentException ilae) {
			ilae.printStackTrace();
			return ResponseEntity.badRequest().body(ilae.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@DeleteMapping(value = "/testTable/bulkDelete", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> bulkDelete(HttpEntity<String> httpEntity) {
		ObjectMapper objMapper = new ObjectMapper();
		List<phpTest> requestedList = null;
		try {
			requestedList = Arrays.asList(objMapper.readValue(httpEntity.getBody(), phpTest[].class));
			phpRepoService.deleteAllIn(requestedList);
			
			return ResponseEntity.ok().body("Request completed!");
		} catch (IllegalArgumentException ilae) {
			return ResponseEntity.badRequest().body(ilae.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}


}
