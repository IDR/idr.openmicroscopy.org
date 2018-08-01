docker run -it --rm -v $PWD:/srv/jekyll -eJEKYLL_UID=$UID jekyll/jekyll jekyll build
docker run -it  --rm -v $PWD/_site:/site jekyll/builder /usr/gem/bin/htmlproofer /site --disable-external --url-ignore "/jupyter,/webclient/"
