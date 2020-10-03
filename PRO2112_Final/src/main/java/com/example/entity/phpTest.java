package com.example.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "phpTest", schema = "dbo")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class phpTest implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5063957832515847148L;

	@Id
	@Column(name = "Id")
	@JsonProperty("id")
	private String id;
	
	@NotBlank(message = "Name cannot be blank")
	@Column(name = "Name", nullable = false)
	@JsonProperty("name")
	private String name;
	
	@NotBlank(message = "Logo cannot be blank")
	@Column(name = "Logo", nullable = false)
	@JsonProperty("logo")
	private String logo;
}

