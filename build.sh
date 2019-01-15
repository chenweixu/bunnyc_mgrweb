#!/bin/bash
# 0.1.2         2019-01-11 15:09:56

version=0.1.2
img_dir=/data/share/docker_images
container=bmgrweb

img_file=$img_dir/chenwx_${container}_${version}.tar

docker stop $container
docker rm $container
docker rmi chenwx/$container:$version
rm $img_file

#------------------------------------------------

tar zcf bmgrweb.tar.gz ./dist/

docker build -t chenwx/$container:$version -f dockerfile .

rm bmgrweb.tar.gz

docker save chenwx/$container:$version > $img_file

docker run --name $container -h $container --net="host" -d chenwx/$container:$version
