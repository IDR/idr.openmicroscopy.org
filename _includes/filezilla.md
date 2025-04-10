## General instructions

The raw data of all studies published in IDR can be downloaded using [Globus](https://www.globus.org/) or anonymous File Transfer Protocol (FTP).

You can download both whole studies as well as parts/single images.

We recommend using the Globus.

## Globus

Download and install [Globus connect personal](https://www.globus.org/globus-connect-personal).

You might have to create an account, or you can use other login providers like ORCiD.

Go to "Web: Transfer files" to get to the Web UI.

<img src="img/filezilla/globus_1.png" alt="Globus Web UI" />

Then in the File Manager / Collections search for "EMBL-EBI Public Data".

<img src="img/filezilla/globus_2.png" alt="Globus Collection search" width="50%" />

In there you should be able to navigate through the same directory structure like on the FTP server /pub/databases/IDR/ to get to the IDR submission you want to download. 

<img src="img/filezilla/globus_3.png" alt="Globus IDR collection" width="50%" />

## FTP

The ftp host is available using the following details:

- host: `ftp.ebi.ac.uk`

### CLI client step by step

Connect to the FTP server:

    $ ftp ftp.ebi.ac.uk

The FTP server being anonymous only, use `ftp` or `anonymous` (with no password) to log in.
Make sure that passive mode is on:

    ftp> passive

Change the directory:

    ftp> cd /pub/databases/IDR/

You may list all the studies in the IDR:

    ftp> ls

Or a single one, e.g.:

    ftp> ls idr0044-*

Change the mode to `binary`

    ftp> binary

Use the `get` command to download a specific file.

    ftp> get "path-to-file-in-ftp-server" "path-to-local-file"

### Desktop client step-by-step

Download and install the [FileZilla client](https://filezilla-project.org/download.php).

Start the FileZilla application. In the “Host” dialog (top-left corner) paste `ftp.ebi.ac.uk/pub/databases/IDR/` and click the `Quickconnect` button.

Click OK in the next window.

<img src="img/filezilla/filezilla-dialog.png" alt="FileZilla Warning dialog" width="50%" />

The left-hand pane is showing your local machine folders. Select the folder into which you want to download the data.

<img src="img/filezilla/filezilla-desktop.png" alt="FileZilla Desktop" width="100%" />

In the right-hand pane, browse the IDR studies to be downloaded. Check the sizes of the folders using the README files. Click onto a folder and expand it. Right-click on the desired folder or file and click `Download` in the context menu.

<img src="img/filezilla/filezilla-download.png" alt="FileZilla Desktop" width="50%" />

## How to find the path for a specific Image/Plate

If you want to download a specific Image/Plate:

1. Navigate to the particular image in OMERO.web, e.g. https://idr.openmicroscopy.org/webclient/?show=image-14788705

2. Click on the "file paths" icon in top-right corner and copy the path.

3. Construct the path to use using following example:

<img src="img/filezilla/file-paths.png" alt="File paths" width="50%" />

The example shows that the file for this image ([15301_week8_PAS](https://idr.openmicroscopy.org/webclient/?show=image-14788705)) can be found at `idr0148-schumacher-kidneytem/20220927-Globus/0000-assay_1-light_microscopy/15301_week8_PAS.tiff`.

Note: You usually can't find a path to a single image from a Plate - the path example above will list paths to ALL the images and files from that Plate, even if only one image/well is selected. The download of one image from a Plate is possible, but it can be difficult to ascertain the precise position of the downloaded image in the PLate after download. There are cases (e.g. idr0056, Flex files) where a file corresponds to a particular whole well. You can always use the path to download the whole Plate, but be mindful of the sizes of files you are trying to download.
