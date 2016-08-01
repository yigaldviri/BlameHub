# BlameHub
**Nail the job to some poor developer**

###Background
We are a small team of developers working for CA technologies.
Every time there's a bug or something like that everyone is trying to nail the job to anyone but themselves.
 We have decided to finish that behaviour.
  
###So what is it?
**BlameHub** scans your Git repository and indexing your commit messages in Solr.
 After that, just search for your bug.

The project is divided to 2 parts.  
###Server 
The server is a Gradle project that generates a JAR and run it using Spring Boot.  
In the project-root-directory run:  

    project-root-directory> gradle build
  
  Then run the jar:  

    project-root-directory/server/build> java -jar blamehub.jar
   
   
###Client
TBD  
