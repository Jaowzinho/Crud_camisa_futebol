package com.example.camisastore.controller;

import com.example.camisastore.model.Camisa;
import com.example.camisastore.repository.CamisaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camisas")  // Mapeando a URL /camisas
public class CamisaController {

    @Autowired
    private CamisaRepository camisaRepository;

    // GET: Listar todas as camisas
    @GetMapping
    public List<Camisa> getAllCamisas() {
        return camisaRepository.findAll();
    }

    // POST: Criar uma nova camisa
    @PostMapping
    public Camisa createCamisa(@RequestBody Camisa camisa) {
        return camisaRepository.save(camisa);
    }

    // PUT: Atualizar uma camisa existente
    @PutMapping("/{id}")
    public Camisa updateCamisa(@PathVariable Long id, @RequestBody Camisa camisa) {
        camisa.setIdCamisa(id);
        return camisaRepository.save(camisa);
    }

    // DELETE: Deletar uma camisa
    @DeleteMapping("/{id}")
    public void deleteCamisa(@PathVariable Long id) {
        camisaRepository.deleteById(id);
    }
}
