#!/bin/bash

gradle
docker build -t yigaldviri/blamehub:v1.0.0 -t yigaldviri/blamehub:latest .
./run-docker-bundle.sh