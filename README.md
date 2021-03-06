# Image Resize / Upload Google Cloud
> Image resize and upload back to google cloud bucket using Google Cloud functions.

Developed to work with Google Cloud Functions.

## API

Send POST request to your Google Cloud functions HTTP endpoint with these parameters

* file_location -Remote location of file you want to resize.

* width - Resize the above image to width.

* height - Resize the above image to height.

Returns JSON:

```resized: true,
   thumbnail: {{Google Cloud signed URL}}
```

## curl example
curl -X "POST" "{{YOUR_GOOGLE_CLOUDFUNCTIONURL}}/imageResize" \
     -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
     --data-urlencode "file_location={{IMAGE_URL_YOU_WANT_TO_RESIZE}}" \
     --data-urlencode "width=100" \
     --data-urlencode "height=100"


## Development setup

Clone the repository on your machine and run 

```
npm install
```
## Deployment to Google Cloud Function

* [Install Google Cloud SDK] (https://cloud.google.com/sdk/install)

* gcloud auth login

* 
```
gcloud config set project {{PROJECT_NAME}}
```
 
* 
```
gcloud beta functions deploy imageResize --trigger-http
```

## Release History

* 0.1.0
    * Work in progress

## Meta

Sunil Shenoy – [@ssunil](https://twitter.com/ssunil)

Distributed under the MIT license. See ``MIT-LICENSE`` for more information.


## Contributing

1. Fork it (<https://github.com/sunilshenoy/image-resize-googlecloud>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request