package com.example.camisastore.service;

import com.example.camisastore.model.Camisa;
import com.example.camisastore.repository.CamisaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CamisaService {

    @Autowired
    private CamisaRepository camisaRepository;

    public List<Camisa> getAllCamisas() {
        return camisaRepository.findAll();
    }

    public Optional<Camisa> getCamisaById(Long id) {
        return camisaRepository.findById(id);
    }

    public Camisa saveCamisa(Camisa camisa) {
        return camisaRepository.save(camisa);
    }

    public void deleteCamisa(Long id) {
        camisaRepository.deleteById(id);
    }

    public Camisa updateCamisa(Long id, Camisa camisa) {
        camisa.setIdCamisa(id);
        return camisaRepository.save(camisa);
    }
}
