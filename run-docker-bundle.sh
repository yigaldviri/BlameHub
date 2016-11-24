#!/bin/bash
docker run --name blamehub-solr -d -p 8983:8983 solr solr-create -c blamehub
docker run --name blamehub -it -p 8080:8080 --link blamehub-solr:blamehub-solr -e solr.docker=http://blamehub-solr b1