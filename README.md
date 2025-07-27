# node-jwt-api-server
node js api server using express mongodb and jwt token for auth check

## templates
/api/templates list les quizs qui sont dans le dossier /templates

```json
{
    "title": "le nom du quiz affiché",
    "description": "description du quiz",
    "icon": "icon que le frontend peut utiliser",
    "id": "le meme que le nom de fichier sans .json",
    "name": "le meme que le nom de fichier sans .json",
    "type": "type de quiz: actuellement quiz|eval",
    "quizItems":[
        //questions
    ]
}
```


## TODOs
- unit tests
- logging with winston
- validate data received ? with express-validator
- use swagger for API doc
- check error codes
- missing params on cors
- use helmet.js ?
