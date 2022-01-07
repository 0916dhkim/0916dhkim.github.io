#!/bin/bash
# Reference: https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]];
then
  # Ignore.
  echo "Ignoring gh-pages branch."
  exit 0;
else
  echo "Proceeding build."
  exit 1;
fi
