# How to run this application: 
- You will need node installed in your machine. 
- Now clone this repo and open a terminal in your favourite IDE.
- Run `npm i` from the terminal. This will install the required third party libraries. 
- Now run this command from terminal `nodemon index.js`
- By default, this app will be listening at `http://localhost:3003`

# Use this application:
- This is a backend only app.
- Hit this URL `http://localhost:3003/pdf`
- In the body, add a key named `pdf` and attach a the pdf file to be extracted.
- In the response, you will get the output json file. 
- A sample input pdf is there in this repo named `sample.pdf`. The file is located in the root directory.
