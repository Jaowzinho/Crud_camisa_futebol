package com.example.camisastore.model;

import jakarta.persistence.*;  // Certifique-se de usar jakarta.persistence
import java.math.BigDecimal;

@Entity
public class Camisa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCamisa;

    private String nomeCamisa;
    private int anoCamisa;
    private String tamanhoCamisa;
    private BigDecimal precoCamisa;
    private String urlImg;

    // Getters e Setters
    public Long getIdCamisa() {
        return idCamisa;
    }

    public void setIdCamisa(Long idCamisa) {
        this.idCamisa = idCamisa;
    }

    public String getNomeCamisa() {
        return nomeCamisa;
    }

    public void setNomeCamisa(String nomeCamisa) {
        this.nomeCamisa = nomeCamisa;
    }

    public int getAnoCamisa() {
        return anoCamisa;
    }

    public void setAnoCamisa(int anoCamisa) {
        this.anoCamisa = anoCamisa;
    }

    public String getTamanhoCamisa() {
        return tamanhoCamisa;
    }

    public void setTamanhoCamisa(String tamanhoCamisa) {
        this.tamanhoCamisa = tamanhoCamisa;
    }

    public BigDecimal getPrecoCamisa() {
        return precoCamisa;
    }

    public void setPrecoCamisa(BigDecimal precoCamisa) {
        this.precoCamisa = precoCamisa;
    }

    public String getUrlImg() {
        return urlImg;
    }

    public void setUrlImg(String urlImg) {
        this.urlImg = urlImg;
    }
}
