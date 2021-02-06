# bewgle-assessment
Code for bewgle assesment

#Description of assesment

Used Packages and framework
  - dotenv
  - mongoose
  - express

Clone the repository and run npm install to install all the dependencies used in the assesment.

Start the server
  - npm start
  
Created seperate module for endpoints and imported to index.js file.

#Tools used
  - Postman (for hitting the apis)
  - Mongo Compass (for storing the data and performing the queries on them)
  
#Routes

  1. /process
      - returns data in format. 
      {
            date: //ISO formatted date time when the request was received,
            method: //HTTP method used for making the request,
            headers: //HTTP headers in the request,
            path: //request path (will start with /process),
            query: //the parsed query string as key-values, if any
            body: //request body, if any
            duration: //time taken to process the request
            }
          
       - Create a record in mongoDB in DB- bewgle, collection - datas
       - Sends response after a random delay of between 15 to 30 seconds
       
  2. /stats
      - returns total number of request made, request type and average time took for the response
      - if want to search based on date then pass the startDate, endDate, startYear, endYear in the query params
  
