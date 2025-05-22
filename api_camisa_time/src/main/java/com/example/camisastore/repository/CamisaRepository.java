package com.example.camisastore.repository;

import com.example.camisastore.model.Camisa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CamisaRepository extends JpaRepository<Camisa, Long> {
}
