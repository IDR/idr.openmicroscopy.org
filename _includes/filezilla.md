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

### Desktop client step-by-step

Download and install the [FileZilla client](https://filezilla-project.org/download.php).

Start the FileZilla application. In the “Host” dialog (top-left corner) paste `ftp.ebi.ac.uk/pub/databases/IDR/` and click the `Quickconnect` button.

Click OK in the next window.

<img src="img/filezilla/filezilla-dialog.png" alt="FileZilla Warning dialog" width="50%" />

The left-hand pane is showing your local machine folders. Select the folder into which you want to download the data.

<img src="img/filezilla/filezilla-desktop.png" alt="FileZilla Desktop" width="100%" />

In the right-hand pane, browse the IDR studies to be downloaded. Check the sizes of the folders using the README files. Click onto a folder and expand it. Right-click on the desired folder or file and click `Download` in the context menu.

<img src="img/filezilla/filezilla-download.png" alt="FileZilla Desktop" width="50%" />
