#! /bin/sh
# Script to build the idr.openmicroscopy.org website using Docker

set -e
set -u

docker run --rm -v $PWD:/srv/jekyll -eJEKYLL_UID=$UID jekyll/builder:latest jekyll build --config _config.yml,_prod.yml
docker run --rm -v $PWD/_site:/site/about jekyll/builder:latest /usr/gem/bin/htmlproofer /site --ignore-urls "/jupyter,/webclient/,/cell/,/tissue/,/login.binder.bioimagearchive.org/,/biii.eu/,/localhost/" --only_4xx --allow-missing-href=true
