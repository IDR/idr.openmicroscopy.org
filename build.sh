#! /bin/sh
# Script to build the idr.openmicroscopy.org website using Docker

set -e
set -u

docker run --rm -v $PWD:/srv/jekyll -eJEKYLL_UID=$UID jekyll/builder:pages jekyll build --config _config.yml,_prod.yml
docker run --rm -v $PWD/_site:/site/about jekyll/builder:pages /usr/gem/bin/htmlproofer /site --ignore-urls "/jupyter/,/filezilla-project.org/,/webclient/,/cell/,/tissue/,/login.binder.bioimagearchive.org/,/biii.eu/,/ncbi.nlm.nih.gov/,/localhost/,/github.com/" --only_4xx --no-enforce-https --allow-missing-href --ignore-status-codes "400,404"
