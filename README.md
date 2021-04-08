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
