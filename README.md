# IDR website

[![Build Status](https://travis-ci.org/IDR/idr.openmicroscopy.org.svg?branch=master)](https://travis-ci.org/IDR/idr.openmicroscopy.org)

This repository contains the source code for the IDR Website hosted at
https://idr.openmicroscopy.org.

## Versioning

This website has multiple version strings.
- The repository itself uses a [CalVer scheme `YYYY.0M.0D`](https://calver.org/#youtube-dl).
- The version displayed on the webpages should be the [IDR deployment release](https://github.com/IDR/deployment/), *not* the website release.
  This is independent of the website release and is not known until deployment time.
  The IDR version is set to `devel` in this repository, and should be overridden during deployment by creating a file `VERSION` containing the version string.


## Contributing

Please read our [contributing guidelines](/CONTRIBUTING.md) for ways to offer
feedback and contribute.

## License

All content is released under 
[Creative Commmons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
