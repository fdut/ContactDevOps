#!/bin/sh

# Licensed Materials - Property of IBM
# 5725-I43 (C) Copyright IBM Corp. 2001, 2014. All Rights Reserved.
# US Government Users Restricted Rights - Use, duplication or
# disclosure restricted by GSA ADP Schedule Contract with IBM Corp.

# Check whether either JAVA_HOME is set or "java" is found in $PATH.
# If JAVA_HOME is set, use that version
if test -n "$JAVA_HOME"; then
  JAVA_EXE="$JAVA_HOME/bin/java"
  #echo "JAVA_HOME is set, using java executable $JAVA_EXE" 1>&2
else
  found_java=`which java`
  if test -z "$found_java"; then
    echo "Error: java not found in PATH, and JAVA_HOME not set." 1>&2
    echo "       Please add a JDK's or JRE's bin directory to your PATH environment" 1>&2
    echo "       variable, then retry starting $0" 1>&2
    exit 1
  fi
  JAVA_EXE=java
fi

# Verify the Java version.
case `"$JAVA_EXE" -version 2>&1 | sed -e '1q' | sed -e 's,^[^0-9]*,,' -e '/^$/d'` in
  1.1* | 1.2* | 1.3* | 1.4* | 1.5*)
    echo "Java 6 or newer is required. Trying to continue nevertheless..." 1>&2
    ;;
esac

# Now run it.
exec "$JAVA_EXE" -cp 'applicationcenterdeploytool.jar:json4j.jar' com.ibm.appcenter.Upload "$@"
