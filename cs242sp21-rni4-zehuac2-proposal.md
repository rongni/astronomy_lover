# A Webpage called Astronomy Lovers
Peiyi Chen (peiyic2), Rongxin Ni (rni4) | Moderator: Jeffrey Taylor-Chang (jjt4) Zehua Chen (zehuac2)


This is a Astronomy Lover app about a project for CS242

## Abstract
### Project Purpose
Users are able to create their own accounts to save their personl information like email, avatar, description and so on. After successfully login in, User can easily looking for some interesting beautiful astronomy pictures as well as some photos collected by Mars rovers. They can also collect the pictures they like into their collection page. 

### Project Motivation
Currently, there's few web apps built for astronomy lovers, it is hard for astronomy amateurs to find some interesting pictures to learn about the universe they love. We want to build an easy-to-use web app for astronomy amateurs to browsing interesting astronomy pictures.

## Technical Specification
- Platform: Webpage app (React)
- Programming Languages: Will try use TypeScript. JavaScript as an alternative (React for frontend, Express for backend)
- Stylistic Conventions:  TypeScript(JavaScript) Style Guide
- SDK: Facebook SDK for React
- IDE: Visual Studio Code
- Tools/Interfaces: Webpage
- Target Audience: Broad-range audience, especially astronomy lovers

## Functional Specification
### Features
- Create user account with personal information
- List view for APOD (Astronomy Picture of the Day) API, with sort and search functionalities
- Gallery view for mars-photos (Mars Rover Photos) API, with genrne selections for Rover Cameras
- Detail view for clicking the item
- User sign up and login page, with a personal main and picture collection page per user
- Important message notification and message page

### Scope of the project
- Limitations:
    - Only uses images provided in APOD and mars-photos APIs provided by NASA
    - Can only compare different types of rover cameras in gallery view
- Assumptions:
    - Assume the information provided by those three APIs are all we can obtain

## Brief Timeline
- Week 1: Create a List view, gallery view 
- Week 2: Create backend for user and collection database
- Week 3: Create frontend for user and collection database
- Week 4: Add important message page and make the web more attractive

## Rubrics
### Week 1
### Peiyi Chen
https://docs.google.com/spreadsheets/d/1rJYXb9Dy5TpzmgcAWwOFfoqln_ctiStIwKdr5sXhVAw/edit#gid=1203283929

| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  List View |  10  |  0: didn't implement anything <br> +2: always display today's image at top of page <br> +4: render images as a list <br> +2: display bigger image as clicking <br> +2: display images with information provided |
|  Query & Sort |  5  |  0: Didn't implement anything <br> +1: query for start date <br> +1: query for end date <br> +1: query for number of images displayed <br> +2: sort by date in both order |
|  Manual test plan  |  10  |  0: Didn't implement tests <br> for every 1 manual test, gain 1 point
### Rongxin Ni
https://docs.google.com/spreadsheets/d/1aPjQPcUGWVanlv78PQ3dYw6q6mCK--CDJWql9XQrUtU/edit#gid=1203283929

| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
| Gallery View |  11  |  0: didn't implement anything <br> +4: render images as a gallery  <br> +2: have load more button <br> +3: display the full image as clicking <br> +2: display the image with information provided as well as clicking |
| Genre select |  4  |  0: didn't implement anything <br> +1: implemented camera type selection <br> +1: implemented rover selection <br> +2:  implemented earth date  selection|
|  Manual test plan |  10  |  0: Didn't implement tests <br> for every 1 manual test, gain 1 point

### Week 2
### Peiyi Chen
https://docs.google.com/spreadsheets/d/1CmGbaTjVyHL07xwFFEt9D-jAbjZ6cs62HNC6hGLEbM4/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  API for user |  9  |  0: didn't implement anything <br> +2: implemented GET API <br> +3: implemented POST API <br> +2: implemented DELETE API <br> +2: implemented PUT API |
|  API for authencation |  6  |  0: didn't implement anything <br> +2: implemented GET API <br> +4: implemented POST API |
|  Unit Test |  10  |  0: Didn't implement tests <br> for every 1 unit tests, gain 1 point |
### Rongxin Ni
https://docs.google.com/spreadsheets/d/1T4FeneBTeJMi1Wts1RYTxMHdsdlKvJHjdyiOcOyV5Ys/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  API for collection |  7  |  0: didn't implement anything <br> +2: implemented GET API <br> +2: implemented POST API <br> +1: implemented DELETE API <br> +2: implemented PUT API |
|  API for notes |  8  |  0: didn't implement anything <br> +2: implemented GET API <br> +2: implemented POST API <br> +2: implemented DELETE API <br> +2: implemented PUT API |
|  Unit Test |  10  |  0: Didn't implement tests <br> for every 1 unit tests, gain 1 point |
### Week 3
### Peiyi Chen 
https://docs.google.com/spreadsheets/d/1M0h34eg15wNS_BmeK3Po6szTo3QOSjlseaJkBu_8KBU/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
| Sign up page |  8  |  0: didn't implement anything <br> +3: correctly making post request <br> +1: check password format <br> +4: render notification of errors and success |
|  Login page |  7  |  0: Didn't implement anything <br> +2: correctly check the login information <br> +3: render notification of errors and success <br> +2: redirect to main page |
|  Manual test plan |  10  |  0: Didn't implement tests <br> for every 1 manual tests, gain 1 point |
### Rongxin Ni
https://docs.google.com/spreadsheets/d/1utiqs-8wUbLCuGeWNS0cYy-kRKYI44ctM_tth7E_3iY/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Profile page |  8  |  0: Didn't implement anything <br> +3: successfully and neatly display user information <br> +3: correctly update user information <br> +2: can successfully delete the user then logout |
|  Collection page |  7  |  0: Didn't implement anything <br> +2: display as a list view <br> +3: successfully add data <br> +2: successfully delete data |
|  Manual test plan |  10  |  0: Didn't implement tests <br> for every 1 manual tests, gain 1 point |
### Week 4
### Peiyi Chen
https://docs.google.com/spreadsheets/d/1f05OsGqw4MYJsMgao5kRHMQdOcmL0Uq5YCpiAPIgjLE/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Notes render |  9  |  0: Didn't implement anything <br> +3: successfully render notes as clicking the image <br> +2: successfully add notes <br> +2: successfully delete notes <br> +2: successfully update notes |
|  More Attractive Webpage |  6  |  0: Didn't implement anything <br> for every 1 feature updates, gain 2 point |
|  Manual test plan for webpage |  10  |  0: Didn't implement tests  <br> for every 1 unit tests, gain 1 point |
### Rongxin Ni 
https://docs.google.com/spreadsheets/d/1icHquxlWH3wfYjcVl-ndNTqt9XMEkl3PsdR3itomvJg/edit#gid=1203283929
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
| Navgation includes Login and Logout |  4  | 0: Didn't connect login to other page  <br> +2: show myprofile and mylibrary if user login in  <br> +2:  hide myprofile and mylibrary if user not login 
| About us page |  5  | 0: Didn't implement anything <br>  +2: display website  introduction <br>  +2: show contact infomation and github link <br>  +1: add link to NASA official webiste  
|  More Attractive Webpage |  6  |  0: Didn't implement anything <br> for every 1 feature updates, gain 2 point |
|  Manual test plan for webpage |  10  |  0: Didn't implement tests  <br> for every 1 unit tests, gain 1 point |

