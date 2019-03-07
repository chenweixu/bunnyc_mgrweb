#!/bin/bash
# 0.1.2         2019-01-11 15:09:56
work_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

version=0.1.2

container=bmgrweb

docker stop $container
docker rm $container
docker rmi chenwx/$container:$version

tar zcf bmgrweb.tar.gz ./dist/

docker build -t chenwx/$container:$version -f $work_dir/dockerfile .

rm bmgrweb.tar.gz

docker run --name $container -h $container --net="host" -d chenwx/$container:$version
