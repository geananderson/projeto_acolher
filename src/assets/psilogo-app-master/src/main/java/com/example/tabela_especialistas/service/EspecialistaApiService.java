package com.example.tabela_especialistas.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EspecialistaApiService {

    private final RestTemplate restTemplate;

    public EspecialistaApiService() {
        this.restTemplate = new RestTemplate();
    }

    public String buscarEspecialistaExterno() {

        String url = "https://jsonplaceholder.typicode.com/users/1";

        return restTemplate.getForObject(url, String.class);
    }
}

//criação do consumo de API da tabela especialista
