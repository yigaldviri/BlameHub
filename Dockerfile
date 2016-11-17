
FROM openjdk:8-jre
COPY . ./server/build/libs/blamehub.jar
WORKDIR ./server/build/libs/blamehub.jar
EXPOSE 8080
CMD ["java", "-jar", "./server/build/libs/blamehub.jar"]