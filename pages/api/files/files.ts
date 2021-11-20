// GET /api/files
// PUT/POST /api/files
// DELETE /api/files


// each user has a unique perspective on the file system
/*
  jacob/ (only jacob can see this)
    subdir/  (only jacob can see this)
      file.txt  (only jacob can see this)
  nile/ (only nile can see this)
    sharedproject/   (jacob can see this)
    private/        (jacob can't see this)
      file.txt  (only nile can see this)
    public/       (everyone can see this)


GET /api/files/ 
user: nile

body: {
  "path": "nile/"
}

=====
response.body
>> {
  "files": [
    {
      "name": "sharedproject",
      "type": "directory",
      "size": 0,
      "lastModified": "2019-01-01T00:00:00.000Z",
      "path": "nile/sharedproject/"
    },
    {
      "name": "private",
      "type": "directory",
      "size": 0,
      "lastModified": "2019-01-01T00:00:00.000Z",
      "path": "nile/private/"
    },
    {
      "name": "public",
      "type": "directory",
}

======================
GET /api/files/ 
user: jacob

body: {
  "path": "/"
}

=====
response.body
>> {
  "files": [
    // todo jacob's perspective

    {
      "name": "sharedproject",
      "type": "directory",
      "size": 0,
      "lastModified": "2019-01-01T00:00:00.000Z",
      "path": "nile/sharedproject/"
    },
    {
      "name": "private",
      "type": "directory",
      "size": 0,
      "lastModified": "2019-01-01T00:00:00.000Z",
      "path": "nile/private/"
    },
    {
      "name": "public",
      "type": "directory",
  ]
}


====
send a get request to /api/files/?path=/

{
  "files": [
    "jacob": [

    ]
    "n"
}

! user
