#!/bin/bash
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -u|--username)
    USERNAME="$2"
    shift # past argument
    ;;
    -p|--password)
    PASSWORD="$2"
    shift # past argument
    ;;
    -s|--server)
    SERVER_URL="$2"
    shift # past argument
    ;;
     -f|--file)
    FILE="$2"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

echo USERNAME   = "${USERNAME}"
echo PASSWORD   = "${PASSWORD}"
echo SERVER URL = "${SERVER_URL}"
echo FILE = "${FILE}"

./acdeploytool.sh -s ${SERVER_URL} -c applicationcenter -u ${USERNAME} -p ${PASSWORD} -f ${FILE}
