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
- Programming Languages: JavaScript (React for frontend, Express for backend)
- Stylistic Conventions: Airbnb JavaScript Style Guide
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
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  List View |  5  |  0: didn't implement anything <br> +1: always display today's image at top of page <br> +2: render images as a list <br> +1: display bigger image as clicking <br> +1: display images with information provided |
|  Query & Sort |  3  |  0: Didn't implement anything <br> +0.5: query for start date <br> +0.5: query for end date <br> +0.5: query for number of images displayed <br> +0.5: rendering notification of errors <br> +1: sort by date in both order |
| Gallery View |  5  |  0: didn't implement anything <br> +2: render images as a gallery  <br> +1: have load more button <br> +1: display the full image as clicking <br> +1: display the image with information provided as well as clicking |
| Genre select |  3  |  0: didn't implement anything <br> +1: implemented camera type selection <br> +1: implemented rover selection <br> +1: correctly display different camera types for differnt rovers chosen|
|  Manual test plan for List View  |  10  |  0: Didn't implement tests <br> for every 2 manual test, gain 1 point
|  Manual test plan for Gallery View |  10  |  0: Didn't implement tests <br> for every 2 manual test, gain 1 point


### Week 2
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  API for user |  4  |  0: didn't implement anything <br> +1: implemented GET API <br> +1: implemented POST API <br> +1: implemented DELETE API <br> +1: implemented PUT API |
|  API for authencation |  2  |  0: didn't implement anything <br> +1: implemented GET API <br> +1: implemented POST API
|  API for collection |  4  |  0: didn't implement anything <br> +1: implemented GET API <br> +1: implemented POST API <br> +1: implemented DELETE API <br> +1: implemented PUT API |
|  API for notes |  4  |  0: didn't implement anything <br> +1: implemented GET API <br> +1: implemented POST API <br> +1: implemented DELETE API <br> +1: implemented PUT API |
|  Unit Test for user |  10  |  0: Didn't implement tests <br> for every 2 unit tests, gain 1 point |
|  Unit Test for collection |  10  |  0: Didn't implement tests <br> for every 2 unit tests, gain 1 point |

### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
| Sign up page |  3.5  |  0: didn't implement anything <br> +1.5: correctly making post request <br> +2: render notification of errors and success |
|  Login page |  3.5  |  0: Didn't implement anything <br> +1: correctly check the login information <br> +1.5: render notification of errors and success <br> +1: redirect to main page |
|  Profile page |  5  |  0: Didn't implement anything <br> +1.5: successfully and neatly display user information <br> +1.5: correctly update user information <br> +2: can successfully delete the user then logout |
|  Collection page |  4  |  0: Didn't implement anything <br> +2: display as a list view <br> +1: successfully add data <br> +1: successfully delete data |
|  Manual test plan |  20  |  0: Didn't implement tests <br> for every 2 manual tests, gain 1 point |

### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Notes render |  5  |  0: Didn't implement anything <br> +2: successfully render notes as clicking the image <br> +1: successfully add notes <br> +1: successfully delete notes <br> +1: successfully update notes |
|  Message API |  5  |  0: Didn't implement anything <br> +1: implemented GET API <br> +1: implemented POST API <br> +1: implemented DELETE API |
|  Message Page |  3  |  0: Didn't implement anything <br> +1: correctly render messages recieved <br> +1: correctly delete messages <br> +1: implemented notification alert <br> +2: sent automatic notification alert to email|
|  More Attractive Webpage |  3  |  0: Didn't implement anything <br> for every 2 feature updates, gain 1 point |
|  Unit Test for API |  5  |  0: Didn't implement tests  <br> for every 2 unit tests, gain 1 point |
|  Manual test plan for webpage |  10  |  0: Didn't implement tests  <br> for every 2 unit tests, gain 1 point |
