## General instructions

The raw data of all studies published in IDR can be downloaded using the
[Aspera protocol](https://asperasoft.com/technology/transport/fasp/). The
Aspera server is available using the following details:

- server: `fasp.ebi.ac.uk`
- port: `33001`

Each published study has an associated passwordless username matching the IDR
accession number e.g. `idr0001`.

## Desktop client

Download and install the [Aspera desktop client](https://downloads.asperasoft.com/en/downloads/2).

You must also download and configure the [Aspera public key `asperaweb_id_dsa.openssh`](img/aspera/asperaweb_id_dsa.openssh) to connect to the server.

Click on `Connections` to open the connection manager and add the following:

- Host: `fasp.ebi.ac.uk`
- User: `idrNNNN` where `NNNN` is the IDR study identifier, e.g. `idr0047`
- Authentication: `Public Key`
- `Manage Keys` → `Import a key from the filesystem` → select `asperaweb_id_dsa.openssh` (this only needs to be done if you haven't previously imported this key)
- Select `asperaweb_id_dsa.openssh`
- `Test Connection`

You should now be able to connect to the Aspera server and see the raw data for your chosen IDR study.

<img src="img/aspera/aspera-desktop-connection-manager.png" alt="Aspera Desktop connection manager" width="50%" />
<img src="img/aspera/aspera-desktop-ssh-keys.png" alt="Aspera Desktop SSH keys" width="25%" />


## Command-line instructions

The Aspera command line client can be downloaded from the "CLIENT SOFTWARE" section of [Aspera downloads site](https://downloads.asperasoft.com/). You must also download and configure the [Aspera public key `asperaweb_id_dsa.openssh`](img/aspera/asperaweb_id_dsa.openssh) to connect to the server. The following command
will download all the raw data associated with the `idr0008` submission:

    $ ascp -TQ -l40m -P 33001 -i "path/to/asperaweb_id_dsa.openssh" idr0008@fasp.ebi.ac.uk:. /tmp/data/idr0008/

Refer to the [Aspera documentation](https://downloads.asperasoft.com/documentation/)
for more details about the command-line options.

## Docker instructions

For convenience, a
[Docker image](https://hub.docker.com/r/imagedata/download)
is available with the IDR download options. You can use it as follows:

    $ docker run -ti --rm -v /tmp/data/idr0008:/data imagedata/download idr0008 . /data

## Partial download

The two examples above will download the entire content of a submission. The 
size of each study varies from a few GB to several tens of TB.

Sometimes it is desirable to download only a subset of the submission e.g. only one plate from a screen.

First you need to find the relative path to be downloaded. The easiest way is
to use the TSV files available for all IDR studies in the 
[curated metadata repository](https://github.com/IDR/idr-metadata). For example,

- [idr0008-screenA-plates.tsv](https://github.com/IDR/idr0008-rohn-actinome/blob/master/screenA/idr0008-screenA-plates.tsv)
    contains the paths of all the plates in `screenA` for the `idr0008` study,
- [idr0040-experimentA-filePaths.tsv](https://github.com/IDR/idr0040-aymoz-singlecell/blob/master/experimentA/idr0040-experimentA-filePaths.tsv)
    contains the paths of all the datasets in `experimentA` for the `idr0040`
    study.

After removing the leading
`/uod/idr/filesets/<idrNNN>-<author>-<description>/`, you can then download a 
subfolder using the same commands as above:

    $ ascp -TQ -l40m -P 33001 -i "path/to/asperaweb_id_dsa.openssh" idr0040@fasp.ebi.ac.uk:20180215/3105/Pos0 /tmp/data/idr0040_partial

or

    $ docker run -ti --rm -v /tmp/data/idr0040_partial:/data imagedata/download idr0040 20180215/3105/Pos0 /data
