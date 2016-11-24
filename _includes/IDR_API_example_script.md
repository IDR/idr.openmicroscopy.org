
## Example of using the IDR web API

OMERO.web uses a default session backend authentication scheme for authentication.
First create a HTTP session using the [`requests`](http://docs.python-requests.org/en/master/user/advanced/#session-objects) library:


    import requests

    INDEX_PAGE = "http://idr-demo.openmicroscopy.org/webclient/?experimenter=-1"

    # create http session
    with requests.Session() as session:
        request = requests.Request('GET', INDEX_PAGE)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200:
            response.raise_for_status()

#### Get Screens that are annotated with gene:


    SCREENS_PROJECTS_URL = "http://idr-demo.openmicroscopy.org/mapr/api/{key}/?value={value}"

    qs = {'key': 'gene', 'value': 'CDC20'}
    url = SCREENS_PROJECTS_URL.format(**qs)
    for s in session.get(url).json()['screens']:
        screen_id = s['id']
        print (s['id'], s['name'])


#### Get Plates in Screen that are annotated with gene:


    PLATES_URL = "http://idr-demo.openmicroscopy.org/mapr/api/{key}/plates/?value={value}&id={screen_id}"

    qs = {'key': 'gene', 'value': 'CDC20', 'screen_id': screen_id}
    url = PLATES_URL.format(**qs)
    for p in session.get(url).json()['plates']:
        plate_id = p['id']
        print (p['id'], p['name'])


#### Get Images in Plate that are annotated with gene:


    IMAGES_URL = "http://idr-demo.openmicroscopy.org/mapr/api/{key}/images/?value={value}&node={parent_type}&id={parent_id}"

    IMAGE_URL = "http://idr-demo.openmicroscopy.org/webclient/?show=image-{image_id}"
    IMAGE_VIEWER = "http://idr-demo.openmicroscopy.org/webclient/img_detail/{image_id}/"
    THUMBNAIL_URL = "http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/{image_id}/"
    ATTRIBUTES_URL = "http://idr-demo.openmicroscopy.org/webclient/api/annotations/?type=map&image={image_id}"

    qs = {'key': 'gene', 'value': 'CDC20', 'parent_type': 'plate', 'parent_id': plate_id}
    url = IMAGES_URL.format(**qs)
    for i in session.get(url).json()['images']:
        image_id = i['id']
        print 'Image link:', IMAGE_URL.format(**{'image_id': image_id})
        print 'Image viewer link:', IMAGE_VIEWER.format(**{'image_id': image_id})
        print 'Thumbnail URL:', THUMBNAIL_URL.format(**{'image_id': image_id})
        url = ATTRIBUTES_URL.format(**{'image_id': image_id})
        print 'Annotations:'
        for a in session.get(url).json()['annotations']:
            print '\t%s' % a['values']
