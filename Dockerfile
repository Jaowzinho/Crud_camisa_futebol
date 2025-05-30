# Etapa 1: Build da aplicação usando imagem Maven com Java 17
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copia o pom.xml e o código fonte
COPY pom.xml .
COPY src ./src

# Faz o build do jar, ignorando testes para acelerar
RUN mvn clean package -DskipTests

# Etapa 2: Imagem leve só para rodar o jar
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copia o jar gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para rodar o jar
ENTRYPOINT ["java", "-jar", "app.jar"]
