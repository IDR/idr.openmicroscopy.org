
# Example of using the IDR web API

OMERO.web uses a default session backend authentication scheme for authentication.
First create a HTTP session using the [`requests`](https://requests.readthedocs.io) library:


```python
import requests

INDEX_PAGE = "https://idr.openmicroscopy.org/webclient/?experimenter=-1"

# create http session
with requests.Session() as session:
    request = requests.Request('GET', INDEX_PAGE)
    prepped = session.prepare_request(request)
    response = session.send(prepped)
    if response.status_code != 200:
        response.raise_for_status()
```

----

## Studies:


### Get Study map annotation:
```python
# initial data
screen_id = 102

MAP_URL = "https://idr.openmicroscopy.org/webclient/api/annotations/?type=map&{type}={screen_id}"

qs = {'type': 'screen', 'screen_id': screen_id}
url = MAP_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    for v in a['values']:
        key = v[0]
        value = v[1]
        print (key, value)
```

----

### Get Plates in the given Screen:
```python
PLATES_URL = "https://idr.openmicroscopy.org/webclient/api/plates/?id={screen_id}"

qs = {'screen_id': screen_id}
url = PLATES_URL.format(**qs)
for p in session.get(url).json()['plates']:
    plate_id = p['id']
    print (p['id'], p['name'], p['childCount'])
```


----


### Get PlateGrid:
```python
WELLS_IMAGES_URL = "https://idr.openmicroscopy.org/webgateway/plate/{plate_id}/{field}/"

qs = {'plate_id': plate_id, 'field': 0}
url = WELLS_IMAGES_URL.format(**qs)
grid = session.get(url).json()
rowlabels = grid['rowlabels']
collabels = grid['collabels']
for row in grid['grid']:
    for cell in row:
        if cell is not None:
            well_id = cell['wellId']
            image_id = cell['id']
            thumb_url = cell['thumb_url']
            field = cell['field']
            print (cell['wellId'], cell['id'], cell['thumb_url'], cell['field'])

```


----
### Get Image:
```python
qs = {'image_id': image_id}
IMAGE_DETAILS_URL = "https://idr.openmicroscopy.org/webclient/imgData/{image_id}/"
url = IMAGE_DETAILS_URL.format(**qs)
r = session.get(url)
if r.status_code == 200:
    print (r.json())

```


----
### Get Image map annotation:
```python
MAP_URL = "https://idr.openmicroscopy.org/webclient/api/annotations/?type=map&{type}={image_id}"

qs = {'type': 'image', 'image_id': image_id}
url = MAP_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    for v in a['values']:
        key = v[0]
        value = v[1]
        print (key, value)
```


----


### Get Image Thumbnail:
```python
THUMBNAIL_URL = "https://idr.openmicroscopy.org{thumb_url}"

qs = {'thumb_url': thumb_url}
url = THUMBNAIL_URL.format(**qs)
r = session.get(url, stream=True)
if r.status_code == 200:
    with open("path_to_thumbnail", 'wb') as f:
        # read the data in 128 byte chunks
        for chunk in r:
            f.write(chunk)

# For other images (non-HCS) use:

THUMBNAIL_URL = "https://idr.openmicroscopy.org/webclient/render_thumbnail/{image_id}/"
```


----


### Get bulk annotation:
```python
BULK_URL = "https://idr.openmicroscopy.org/webgateway/table/Screen.plateLinks.child.wells/{well_id}/query/?query=Well-{well_id}"

qs = {'well_id': well_id}
url = BULK_URL.format(**qs)
r = session.get(url)
print (r.json())


# or download entire bulk_annotation file:

FILEANNOTATION_URL = "https://idr.openmicroscopy.org/webclient/api/annotations/?type=file&screen={screen_id}"
DOWNLOAD_URL = "https://idr.openmicroscopy.org/webclient/annotation/{ann_id}"

qs = {'screen_id': screen_id}
url = FILEANNOTATION_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    ann_id = a['id']
    qs2 = {'ann_id':  a['id']}
    url2 = DOWNLOAD_URL.format(**qs2)
    print ("Download URL:", url2)
```


----


## Attributes (e.g. Gene Symbol, Phenotype Term Accession...)

### Load all the possible values associated to a specific key e.g. Gene Symbol:
```python
KEYS_SEARCH = "https://idr.openmicroscopy.org/searchengine/api/v1/resources/{type}/searchvaluesusingkey/?key={key}"

values = []
qs1 = {'type': 'image', 'key': KEY}
url = KEYS_SEARCH.format(**qs1)  
json = session.get(url).json()
for d in json['data']:
    if d['Value']:
        values.append(d['Value'])
 values.sort()
 print(values)
```

----


### Get the Ids of the Images that are annotated with a given gene:
```python

IMAGE_URL = "{base}/webclient/?show=image-{image_id}"
IMAGE_VIEWER = "{base}/webclient/img_detail/{image_id}/"
THUMBNAIL_URL = "{base}/webclient/render_thumbnail/{image_id}/"
ATTRIBUTES_URL = "{base}/webclient/api/annotations/?type=map&image={image_id}"  # noqa

KEY_VALUE_SEARCH = "https://idr.openmicroscopy.org/searchengine/api/v1/resources/{type}/search/?key={key}&value={value}"
gene = "ade8"
qs1 = {'type': 'image', 'key': KEY, 'value': gene}
url = KEY_VALUE_SEARCH.format(**qs1)  
json = session.get(url).json()
if 'results' in json['results']:
    images = json['results']['results']
    for image in images:
        image_id = image['id']
        print('Image link:', IMAGE_URL.format(**{'base': IDR_BASE_URL, 'image_id': image_id}))
        print('Image viewer link:', IMAGE_VIEWER.format(**{'base': IDR_BASE_URL, 'image_id': image_id}))
        print('Thumbnail URL:', THUMBNAIL_URL.format(**{'base': IDR_BASE_URL, 'image_id': image_id}))
        key_values = image['key_values']
        for k in key_values:
            print("%s, %s" % (k['name'], k['value']))
```
