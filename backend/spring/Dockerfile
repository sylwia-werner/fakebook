# Stage 1: Build the application
FROM maven:3.8.7-eclipse-temurin-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Run Maven to build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
