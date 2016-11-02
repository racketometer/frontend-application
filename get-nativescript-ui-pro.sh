#!/bin/bash
if [ "$BITBUCKET_N_USER" = "" ];
then
  echo "ERROR: Can't get nativescript-ui-pro package. BitBucket user not set";
  exit;
fi

curl --trace /dev/null -s -O -u $BITBUCKET_N_USER https://bitbucket.org/Crevil/rom-nativescript-ui/raw/a351ba17e41cfb655f7eb36306949b5d8604a12d/nativescript-ui-pro.tgz
