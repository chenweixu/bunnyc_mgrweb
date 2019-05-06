#!/bin/bash
# 0.1.3         2019-04-21 08:42:59
# 0.1.4         2019-05-06 08:49:43

work_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

version=0.1.4

container=bmgrweb
img_dir=/data/share/docker_images

rm dist/*
npm run build

docker stop $container
docker rm $container
docker rmi chenwx/$container:$version

tar zcf bmgrweb.tar.gz ./dist/

docker build -t chenwx/$container:$version -f $work_dir/dockerfile .

rm bmgrweb.tar.gz

docker run --name $container -h $container --net="host" -d chenwx/$container:$version
# docker run --name bmgrweb -h bmgrweb --net="host" -d chenwx/bmgrweb:0.1.4

docker save chenwx/$container:$version > $img_dir/chenwx_${container}_${version}.tar

rm $img_dir/chenwx_${container}_${version}.tar.gz
gzip $img_dir/chenwx_${container}_${version}.tar
