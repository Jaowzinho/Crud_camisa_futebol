package com.example.camisastore.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "API Loja de Camisas",
                version = "1.0",
                description = "Documentação da API para a loja de camisas de academia",
                contact = @Contact(name = "Seu Nome", email = "seu@email.com"),
                license = @License(name = "Apache 2.0", url = "http://springdoc.org")
        )
)
public class OpenApiConfig {
}