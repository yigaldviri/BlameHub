# BlameHub
**Nail the job to some poor developer**

<br/>
<p align="center">
 <img title="What up, yo?" src="./blamehub.gif"/>
</p>
<br/>

###Background
We are a small team of developers working at CA technologies.  
Every time there's a bug or something like that everyone tries to nail the job on anyone but themselves. When we can’t reach an agreement we simply throw it on Sharon. We have decided to take it to another level.  
**BlameHub** scans your Git repository and indexes your commit messages in Solr. Search for your bug to find the scapegoat. Or… just pin it on Sharon.

**BlameHub** is a Gradle project that generates a JAR and runs it using Spring Boot.  
In the project-root-directory run:  

    project-root-directory> gradle
  
  Then run the jar:  

    project-root-directory/server/build> java -jar blamehub.jar
   
**Note** that you need to have a solr server up and running. unless you are using docker...    
   
###Using Docker
You can run BlameHub on your Docker by simply executing these 2 commands:

First, we need a Solr container so we will have some place for all of our data.  
    docker run --name blamehub-solr -d -p 8983:8983 solr solr-create -c blamehub
    
Now we will start the BlameHub container.  
    docker run --name blamehub -it -p 8080:8080 --link blamehub-solr:blamehub-solr -e solr.docker=http://blamehub-solr yigaldviri/blamehub:latest 
