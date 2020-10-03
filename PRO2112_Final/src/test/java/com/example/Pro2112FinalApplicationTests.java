package com.example;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.service.phpRepoService;

import lombok.RequiredArgsConstructor;

@SpringBootTest
class Pro2112FinalApplicationTests {
	@Autowired
	private phpRepoService phpRepoS;

	@Test
	void contextLoads() {
		assertThat(phpRepoS);
	}

}
