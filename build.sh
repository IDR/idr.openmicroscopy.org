#! /bin/sh
# Script to build the idr.openmicroscopy.org website using Docker

set -e
set -u

docker run -it --rm -v $PWD:/srv/jekyll -eJEKYLL_UID=$UID jekyll/builder:pages jekyll build --config _config.yml,_prod.yml
docker run -it  --rm -v $PWD/_site:/site jekyll/builder:pages /usr/gem/bin/htmlproofer /site --disable-external --url-ignore "/jupyter,/webclient/"
