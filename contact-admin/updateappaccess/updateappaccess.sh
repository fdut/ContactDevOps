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
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

echo USERNAME   = "${USERNAME}"
echo PASSWORD   = "${PASSWORD}"
echo SERVER URL = "${SERVER_URL}"

curl -X PUT -d @updateappaccess.json --user ${USERNAME}:${PASSWORD} -H "Content-Type:application/json" ${SERVER_URL}/mfpadmin/management-apis/2.0/runtimes/mfp/applications/com.mfp.sample.contactapp/android/0.0.1/config?async=false&locale=fr_FR

