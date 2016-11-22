
# Example of using the IDR web API

OMERO.web uses a default session backend authentication scheme for authentication.
First create a HTTP session using the `requests` library:


```python
import requests

INDEX_PAGE = "http://idr-demo.openmicroscopy.org/webclient/?experimenter=-1"

# create http session
with requests.Session() as session:
    request = requests.Request('GET', INDEX_PAGE)
    prepped = session.prepare_request(request)
    response = session.send(prepped)
    if response.status_code != 200:
        response.raise_for_status()
```

## Get Screens that are annotated with gene:


```python
SCREENS_PROJECTS_URL = "http://idr-demo.openmicroscopy.org/mapr/api/{key}/?value={value}"

qs = {'key': 'gene', 'value': 'CDC20'}
url = SCREENS_PROJECTS_URL.format(**qs)
for s in session.get(url).json()['screens']:
    screen_id = s['id']
    print (s['id'], s['name'])
```

    (102, u'idr0002-heriche-condensation/screenA (24)')
    (51, u'idr0003-breker-plasticity/screenA (15)')
    (253, u'idr0006-fong-nuclearbodies/screenA (48)')
    (201, u'idr0007-srikumar-sumo/screenA (9)')
    (1351, u'idr0010-doil-dnadamage/screenA (4)')
    (1551, u'idr0011-ledesmafernandez-dad4/screenB (13)')
    (1602, u'idr0011-ledesmafernandez-dad4/screenD (21)')
    (1202, u'idr0012-fuchs-cellmorph/screenA (2)')
    (1101, u'idr0013-neumann-mitocheck/screenA (6)')
    (1302, u'idr0013-neumann-mitocheck/screenB (8)')
    (1204, u'idr0020-barr-chtog/screenA (120)')


## Get Plates in Screen that are annotated with gene:


```python
PLATES_URL = "http://idr-demo.openmicroscopy.org/mapr/api/{key}/plates/?value={value}&id={screen_id}"

qs = {'key': 'gene', 'value': 'CDC20', 'screen_id': screen_id}
url = PLATES_URL.format(**qs)
for p in session.get(url).json()['plates']:
    plate_id = p['id']
    print (p['id'], p['name'])
```

    (4357, u'200972429 TOG[2702]')
    (4401, u'200972430 TOG[2703]')
    (4451, u'200972431 NS[2667]')
    (4453, u'200972432 NS[2668]')


## Get Images in Plate that are annotated with gene:


```python
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
```

    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915895
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915895/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915895/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	...
