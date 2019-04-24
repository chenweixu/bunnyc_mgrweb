#!/bin/bash
# 0.1.3         2019-04-21 08:42:59
work_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

version=0.1.3

container=bmgrweb
img_dir=/data/share/docker_images

rm dist/*
npm start

docker stop $container
docker rm $container
docker rmi chenwx/$container:$version

tar zcf bmgrweb.tar.gz ./dist/

docker build -t chenwx/$container:$version -f $work_dir/dockerfile .

rm bmgrweb.tar.gz

docker run --name $container -h $container --net="host" -d chenwx/$container:$version
# docker run --name bmgrweb -h bmgrweb --net="host" -d chenwx/bmgrweb:0.1.3

docker save chenwx/$container:$version > $img_dir/chenwx_${container}_${version}.tar
gzip $img_dir/chenwx_${container}_${version}.tar
