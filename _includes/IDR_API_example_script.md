
# Example of using the IDR web API

OMERO.web uses a default session backend authentication scheme for authentication.
First create a HTTP session using the [`requests`](http://docs.python-requests.org/en/master/) library:


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

# Studies:

## Get Study map annotation:


```python
# initial data
screen_id = 102
```


```python
MAP_URL = "http://idr-demo.openmicroscopy.org/webclient/api/annotations/?type=map&{type}={screen_id}"

qs = {'type': 'screen', 'screen_id': screen_id}
url = MAP_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    for v in a['values']:
        key = v[0]
        value = v[1]
        print (key, value)
```

    (u'Publication Title', u'Integration of biological data by kernels on graph nodes allows prediction of new genes involved in mitotic chromosome condensation.')
    (u'Publication Authors', u'Heriche JK, Lees JG, Morilla I, Walter T, Petrova B, Roberti MJ, Hossain MJ, Adler P, Fernandez JM, Krallinger M, Haering CH, Vilo J, Valencia A, Ranea JA, Orengo C, Ellenberg J.')
    (u'PubMed ID', u'24943848 http://www.ncbi.nlm.nih.gov/pubmed/24943848')
    (u'PMC ID', u'PMC4142622 http://europepmc.org/search?query=PMC4142622')
    (u'Publication DOI', u'10.1091/mbc.E13-04-0221 http://dx.doi.org/10.1091/mbc.E13-04-0221')
    (u'Annotation File', u'idr0002-screenA-annotation.csv https://github.com/IDR/idr-metadata/blob/master/idr0002-heriche-condensation/screenA/idr0002-screenA-annotation.csv')


## Get Plates in the given Screen:


```python
PLATES_URL = "http://idr-demo.openmicroscopy.org/webclient/api/plates/?id={screen_id}"

qs = {'screen_id': screen_id}
url = PLATES_URL.format(**qs)
for p in session.get(url).json()['plates']:
    plate_id = p['id']
    print (p['id'], p['name'], p['childCount'])
```

    (422, u'plate1_1_013', 1)
    (492, u'plate1_2_006', 1)
    (559, u'plate1_3_003', 1)
    (620, u'plate1_7_015', 1)
    (680, u'plate2_2_007', 1)
    (728, u'plate2_3_018', 1)
    (800, u'plate2_5_015', 1)
    (869, u'plate2_7_028', 1)
    (944, u'plate3_11_007', 1)
    (1015, u'plate3_4_034', 1)
    (1072, u'plate3_5_002', 1)
    (4554, u'plate3_8_010', 1)


## Get PlateGrid:


```python
WELLS_IMAGES_URL = "http://idr-demo.openmicroscopy.org/webgateway/plate/{plate_id}/{field}/"

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

    (1046859, 1938559, u'/webgateway/render_thumbnail/1938559/', 0)
    (1046944, 1938650, u'/webgateway/render_thumbnail/1938650/', 0)
    (1046877, 1938583, u'/webgateway/render_thumbnail/1938583/', 0)
    (1046904, 1938610, u'/webgateway/render_thumbnail/1938610/', 0)
    (1046910, 1938616, u'/webgateway/render_thumbnail/1938616/', 0)
    (1046869, 1938575, u'/webgateway/render_thumbnail/1938575/', 0)
    (1046864, 1938570, u'/webgateway/render_thumbnail/1938570/', 0)
    (1046940, 1938646, u'/webgateway/render_thumbnail/1938646/', 0)
    (1046930, 1938636, u'/webgateway/render_thumbnail/1938636/', 0)
    (1046853, 1938560, u'/webgateway/render_thumbnail/1938560/', 0)
    (1046920, 1938626, u'/webgateway/render_thumbnail/1938626/', 0)
    (1046863, 1938569, u'/webgateway/render_thumbnail/1938569/', 0)
    (1046890, 1938596, u'/webgateway/render_thumbnail/1938596/', 0)
    (1046889, 1938595, u'/webgateway/render_thumbnail/1938595/', 0)
    (1046942, 1938648, u'/webgateway/render_thumbnail/1938648/', 0)
    (1046915, 1938621, u'/webgateway/render_thumbnail/1938621/', 0)
    (1046934, 1938640, u'/webgateway/render_thumbnail/1938640/', 0)
    (1046880, 1938586, u'/webgateway/render_thumbnail/1938586/', 0)
    (1046881, 1938587, u'/webgateway/render_thumbnail/1938587/', 0)
    (1046919, 1938625, u'/webgateway/render_thumbnail/1938625/', 0)
    (1046870, 1938576, u'/webgateway/render_thumbnail/1938576/', 0)
    (1046947, 1938653, u'/webgateway/render_thumbnail/1938653/', 0)
    (1046892, 1938598, u'/webgateway/render_thumbnail/1938598/', 0)
    (1046856, 1938563, u'/webgateway/render_thumbnail/1938563/', 0)
    (1046900, 1938606, u'/webgateway/render_thumbnail/1938606/', 0)
    (1046901, 1938607, u'/webgateway/render_thumbnail/1938607/', 0)
    (1046945, 1938651, u'/webgateway/render_thumbnail/1938651/', 0)
    (1046873, 1938579, u'/webgateway/render_thumbnail/1938579/', 0)
    (1046936, 1938642, u'/webgateway/render_thumbnail/1938642/', 0)
    (1046908, 1938614, u'/webgateway/render_thumbnail/1938614/', 0)
    (1046897, 1938603, u'/webgateway/render_thumbnail/1938603/', 0)
    (1046867, 1938573, u'/webgateway/render_thumbnail/1938573/', 0)
    (1046865, 1938571, u'/webgateway/render_thumbnail/1938571/', 0)
    (1046921, 1938627, u'/webgateway/render_thumbnail/1938627/', 0)
    (1046922, 1938628, u'/webgateway/render_thumbnail/1938628/', 0)
    (1046855, 1938562, u'/webgateway/render_thumbnail/1938562/', 0)
    (1046887, 1938593, u'/webgateway/render_thumbnail/1938593/', 0)
    (1046906, 1938612, u'/webgateway/render_thumbnail/1938612/', 0)
    (1046931, 1938637, u'/webgateway/render_thumbnail/1938637/', 0)
    (1046875, 1938581, u'/webgateway/render_thumbnail/1938581/', 0)
    (1046866, 1938572, u'/webgateway/render_thumbnail/1938572/', 0)
    (1046854, 1938561, u'/webgateway/render_thumbnail/1938561/', 0)
    (1046860, 1938566, u'/webgateway/render_thumbnail/1938566/', 0)
    (1046911, 1938617, u'/webgateway/render_thumbnail/1938617/', 0)
    (1046907, 1938613, u'/webgateway/render_thumbnail/1938613/', 0)
    (1046876, 1938582, u'/webgateway/render_thumbnail/1938582/', 0)
    (1046857, 1938564, u'/webgateway/render_thumbnail/1938564/', 0)
    (1046926, 1938632, u'/webgateway/render_thumbnail/1938632/', 0)
    (1046932, 1938638, u'/webgateway/render_thumbnail/1938638/', 0)
    (1046891, 1938597, u'/webgateway/render_thumbnail/1938597/', 0)
    (1046874, 1938580, u'/webgateway/render_thumbnail/1938580/', 0)
    (1046903, 1938609, u'/webgateway/render_thumbnail/1938609/', 0)
    (1046935, 1938641, u'/webgateway/render_thumbnail/1938641/', 0)
    (1046898, 1938604, u'/webgateway/render_thumbnail/1938604/', 0)
    (1046899, 1938605, u'/webgateway/render_thumbnail/1938605/', 0)
    (1046939, 1938645, u'/webgateway/render_thumbnail/1938645/', 0)
    (1046858, 1938565, u'/webgateway/render_thumbnail/1938565/', 0)
    (1046923, 1938629, u'/webgateway/render_thumbnail/1938629/', 0)
    (1046896, 1938602, u'/webgateway/render_thumbnail/1938602/', 0)
    (1046912, 1938618, u'/webgateway/render_thumbnail/1938618/', 0)
    (1046884, 1938590, u'/webgateway/render_thumbnail/1938590/', 0)
    (1046924, 1938630, u'/webgateway/render_thumbnail/1938630/', 0)
    (1046937, 1938643, u'/webgateway/render_thumbnail/1938643/', 0)
    (1046938, 1938644, u'/webgateway/render_thumbnail/1938644/', 0)
    (1046941, 1938647, u'/webgateway/render_thumbnail/1938647/', 0)
    (1046893, 1938599, u'/webgateway/render_thumbnail/1938599/', 0)
    (1046861, 1938567, u'/webgateway/render_thumbnail/1938567/', 0)
    (1046928, 1938634, u'/webgateway/render_thumbnail/1938634/', 0)
    (1046927, 1938633, u'/webgateway/render_thumbnail/1938633/', 0)
    (1046948, 1938654, u'/webgateway/render_thumbnail/1938654/', 0)
    (1046933, 1938639, u'/webgateway/render_thumbnail/1938639/', 0)
    (1046862, 1938568, u'/webgateway/render_thumbnail/1938568/', 0)
    (1046929, 1938635, u'/webgateway/render_thumbnail/1938635/', 0)
    (1046888, 1938594, u'/webgateway/render_thumbnail/1938594/', 0)
    (1046917, 1938623, u'/webgateway/render_thumbnail/1938623/', 0)
    (1046902, 1938608, u'/webgateway/render_thumbnail/1938608/', 0)
    (1046918, 1938624, u'/webgateway/render_thumbnail/1938624/', 0)
    (1046882, 1938588, u'/webgateway/render_thumbnail/1938588/', 0)
    (1046943, 1938649, u'/webgateway/render_thumbnail/1938649/', 0)
    (1046885, 1938591, u'/webgateway/render_thumbnail/1938591/', 0)
    (1046879, 1938585, u'/webgateway/render_thumbnail/1938585/', 0)
    (1046916, 1938622, u'/webgateway/render_thumbnail/1938622/', 0)
    (1046871, 1938577, u'/webgateway/render_thumbnail/1938577/', 0)
    (1046946, 1938652, u'/webgateway/render_thumbnail/1938652/', 0)
    (1046914, 1938620, u'/webgateway/render_thumbnail/1938620/', 0)
    (1046905, 1938611, u'/webgateway/render_thumbnail/1938611/', 0)
    (1046886, 1938592, u'/webgateway/render_thumbnail/1938592/', 0)
    (1046909, 1938615, u'/webgateway/render_thumbnail/1938615/', 0)
    (1046868, 1938574, u'/webgateway/render_thumbnail/1938574/', 0)
    (1046895, 1938601, u'/webgateway/render_thumbnail/1938601/', 0)
    (1046925, 1938631, u'/webgateway/render_thumbnail/1938631/', 0)
    (1046883, 1938589, u'/webgateway/render_thumbnail/1938589/', 0)
    (1046913, 1938619, u'/webgateway/render_thumbnail/1938619/', 0)
    (1046894, 1938600, u'/webgateway/render_thumbnail/1938600/', 0)
    (1046878, 1938584, u'/webgateway/render_thumbnail/1938584/', 0)
    (1046872, 1938578, u'/webgateway/render_thumbnail/1938578/', 0)


## Get Image:


```python
qs = {'image_id': image_id}
IMAGE_DETAILS_URL = "http://idr-demo.openmicroscopy.org/webclient/imgData/{image_id}/"
url = IMAGE_DETAILS_URL.format(**qs)
r = session.get(url)
if r.status_code == 200:
    
    print (r.json())

```

    {u'init_zoom': 0, u'tiles': False, u'perms': {u'canAnnotate': False, u'canEdit': False, u'canDelete': False, u'canLink': False}, u'split_channel': {u'c': {u'width': 2694, u'border': 2, u'gridy': 2, u'gridx': 2, u'height': 2054}, u'g': {u'width': 2694, u'border': 2, u'gridy': 1, u'gridx': 2, u'height': 1028}}, u'rdefs': {u'defaultT': 0, u'model': u'color', u'defaultZ': 0, u'invertAxis': False, u'projection': u'normal'}, u'pixel_range': [0, 65535], u'interpolate': True, u'channels': [{u'color': u'FF0000', u'active': True, u'window': {u'max': 4095.0, u'min': 169.0, u'end': 4095.0, u'start': 169.0}, u'emissionWave': None, u'label': u'Cy3'}, {u'color': u'00FF00', u'active': True, u'window': {u'max': 4095.0, u'min': 313.0, u'end': 4095.0, u'start': 313.0}, u'emissionWave': None, u'label': u'eGFP'}], u'meta': {u'projectDescription': u'', u'datasetName': u'Multiple', u'projectId': None, u'wellSampleId': 1742577, u'projectName': u'Multiple', u'imageDescription': u'', u'imageId': 1938578, u'imageAuthor': u'Demo User', u'imageName': u'plate3_8_010 [Well 96, Field 1 (Spot 96)]', u'datasetDescription': u'', u'wellId': 1046872, u'imageTimestamp': 1463841504.0, u'pixelsType': u'uint16', u'datasetId': None}, u'id': 1938578, u'pixel_size': {u'y': 0.3225, u'x': 0.3225, u'z': None}, u'size': {u'width': 1344, u'c': 2, u'z': 1, u't': 350, u'height': 1024}}


## Get Image map annotation:


```python
MAP_URL = "http://idr-demo.openmicroscopy.org/webclient/api/annotations/?type=map&{type}={image_id}"

qs = {'type': 'image', 'image_id': image_id}
url = MAP_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    for v in a['values']:
        key = v[0]
        value = v[1]
        print (key, value)
```

    (u'Control Type', u'empty well')
    (u'Quality Control', u'fail')
    (u'Channels', u'H2B- mCherry/Cy3:chromatin;eGFP:nuclear lamina and report on nuclear envelope breakdown')


## Get Image Thumbnail:


```python
THUMBNAIL_URL = "http://idr-demo.openmicroscopy.org{thumb_url}"

qs = {'thumb_url': thumb_url}
url = THUMBNAIL_URL.format(**qs)
r = session.get(url, stream=True)
if r.status_code == 200:
    with open("path_to_thumbnail", 'wb') as f:
        # read the data in 128 byte chunks
        for chunk in r:
            f.write(chunk)

# For other images (non-HCS) use:

THUMBNAIL_URL = "http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/{image_id}/"
```

## Get bulk annotation:


```python
BULK_URL = "http://idr-demo.openmicroscopy.org/webgateway/table/Screen.plateLinks.child.wells/{well_id}/query/?query=Well-{well_id}"

qs = {'well_id': well_id}
url = BULK_URL.format(**qs)
r = session.get(url)
print (r.json())


# or download entire bulk_annotation file:

FILEANNOTATION_URL = "http://idr-demo.openmicroscopy.org/webclient/api/annotations/?type=file&screen={screen_id}"
DOWNLOAD_URL = "http://idr-clone.openmicroscopy.org/webclient/annotation/{ann_id}"

qs = {'screen_id': screen_id}
url = FILEANNOTATION_URL.format(**qs)
for a in session.get(url).json()['annotations']:
    namespace = a['ns']
    ann_id = a['id']
    qs2 = {'ann_id':  a['id']}
    url2 = DOWNLOAD_URL.format(**qs2)
    print ("Download URL:", url2)
```

    {u'parentId': 102, u'addedBy': u'Demo User', u'parentType': u'Screen', u'annId': 2913804, u'owner': u'Demo User', u'data': {u'rows': [[4554, u'96', 1046872, u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'empty well', u'', u'fail', u'H2B- mCherry/Cy3:chromatin;eGFP:nuclear lamina and report on nuclear envelope breakdown', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'plate3_8_010', u'h12']], u'descriptions': [u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u'', u''], u'columns': [u'Plate', u'Well Number', u'Well', u'Characteristics [Organism]', u'Term Source 1 REF', u'Term Source 1 Accession', u'Characteristics [Cell Line]', u'Term Source 2 REF', u'Term Source 2 Accession', u'siRNA Identifier', u'Sense Sequence', u'Antisense Sequence', u'Reagent Design Gene Annotation Build', u'Gene Identifier', u'Gene Symbol', u'Gene Symbol Synonyms', u'Gene Annotation Comments', u'Analysis Gene Annotation Build', u'Control Type', u'Control Comments', u'Quality Control', u'Channels', u'Comments', u'Median Deviation Fraction - Shorter Prophase', u'Median Deviation Fraction - Longer Prophase', u'Phenotype Reproducibility - Shorter Prophase', u'Phenotype Reproducibility - Longer Prophase', u'Has Phenotype', u'Phenotype Annotation Level', u'Phenotype 1', u'Phenotype 1 Term Name', u'Phenotype 1 Term Accession', u'Phenotype 2', u'Phenotype 2 Term Name', u'Phenotype 2 Term Accession', u'Plate Name', u'Well Name']}, u'id': 14208610, u'addedOn': 1478857167507}
    ('Download URL:', 'http://idr-clone.openmicroscopy.org/webclient/annotation/2913804')
    ('Download URL:', 'http://idr-clone.openmicroscopy.org/webclient/annotation/2891866')


# Attributes (e.g. Gene, Phenotype...)

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
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915879
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915879/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915879/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915899
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915899/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915899/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915893
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915893/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915893/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915894
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915894/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915894/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915903
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915903/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915903/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915904
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915904/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915904/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915887
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915887/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915887/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915883
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915883/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915883/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915890
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915890/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915890/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915882
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915882/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915882/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915897
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915897/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915897/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915906
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915906/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915906/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915880
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915880/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915880/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915884
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915884/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915884/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915891
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915891/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915891/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915896
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915896/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915896/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915907
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915907/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915907/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915881
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915881/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915881/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915886
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915886/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915886/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915888
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915888/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915888/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915878
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915878/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915878/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915900
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915900/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915900/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915905
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915905/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915905/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915898
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915898/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915898/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915885
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915885/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915885/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915889
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915889/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915889/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915901
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915901/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915901/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915892
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915892/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915892/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915902
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915902/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915902/
    Annotations:
    	[[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    	[[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    	[[u'Organism', u'Homo sapiens']]
    	[[u'siRNA Identifier', u'L-003225-00']]
    	[[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    	[[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]

