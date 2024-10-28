FROM openjdk:11

COPY target/myapp.jar /usr/app/

WORKDIR /usr/app

EXPOSE 8080

CMD ["java", "-jar", "myapp.jar"]