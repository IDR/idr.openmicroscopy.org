
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

Get Screens that are annotated with gene:


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


Get Plates in Screen that are annotated with gene:


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


Get Images in Plate that are annotated with gene:


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
    print "Image link:", IMAGE_URL.format(**{'image_id': image_id})
    print "Image viewer link:", IMAGE_VIEWER.format(**{'image_id': image_id})
    print 'Thumbnail URL:', THUMBNAIL_URL.format(**{'image_id': image_id})
    url = ATTRIBUTES_URL.format(**{'image_id': image_id})
    for a in session.get(url).json()['annotations']:
        print 'Annotations:'
        print a['values']
```

    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915895
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915895/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915895/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915879
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915879/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915879/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915899
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915899/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915899/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915893
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915893/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915893/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915894
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915894/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915894/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915903
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915903/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915903/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915904
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915904/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915904/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915887
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915887/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915887/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915883
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915883/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915883/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915890
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915890/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915890/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915882
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915882/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915882/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915897
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915897/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915897/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915906
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915906/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915906/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915880
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915880/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915880/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915884
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915884/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915884/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915891
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915891/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915891/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915896
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915896/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915896/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915907
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915907/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915907/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915881
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915881/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915881/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915886
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915886/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915886/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915888
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915888/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915888/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915878
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915878/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915878/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915900
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915900/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915900/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915905
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915905/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915905/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915898
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915898/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915898/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915885
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915885/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915885/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915889
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915889/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915889/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915901
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915901/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915901/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915892
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915892/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915892/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]
    Image link: http://idr-demo.openmicroscopy.org/webclient/?show=image-1915902
    Image viewer link: http://idr-demo.openmicroscopy.org/webclient/img_detail/1915902/
    Thumbnail URL: http://idr-demo.openmicroscopy.org/webclient/render_thumbnail/1915902/
    Annotations:
    [[u'Gene Identifier', u'991'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/991'], [u'Gene Symbol', u'CDC20'], [u'Gene Identifier URL', u'http://www.ncbi.nlm.nih.gov/gene/?term=991']]
    Annotations:
    [[u'RefSeq Accession', u'NM_001255'], [u'RefSeq Accession URL', u'http://www.ncbi.nlm.nih.gov/nuccore/NM_001255'], [u'RefSeq GI Number', u'4557436']]
    Annotations:
    [[u'Organism', u'Homo sapiens']]
    Annotations:
    [[u'siRNA Identifier', u'L-003225-00']]
    Annotations:
    [[u'siRNA Sequences', u'CGGAAGACCUGCCGUUACA;GGGCCGAACUCCUGGCAAA;GAUCAAAGAGGGCAACUAC;CAGAACAGACUGAAAGUAC']]
    Annotations:
    [[u'Cell Line', u'HeLa'], [u'shRNA', u'non-silencing shRNA'], [u'Channels', u'Hoescht: nuclei;Anti-Ser10 PhosphoHistone H3: mitotic nuclei;Anti-alpha-tubulin: microtubules;RFP: whole cell']]



```python

```
