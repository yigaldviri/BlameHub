#!/bin/bash

gradle
docker build -t blamehub:v1.0.0 .
./run-docker-bundle.sh