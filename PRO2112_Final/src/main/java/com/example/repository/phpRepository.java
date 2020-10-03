package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SearchCriteria;
import com.example.entity.phpTest;

@Repository
public interface phpRepository extends JpaRepository<phpTest, String> {

}
