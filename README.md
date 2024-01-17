# Task Board

**A simple web application for notes. Analogue Trello, Kanban, Google Keep, etc...**

Latest build hosted on github-pages: https://constoner.github.io/task_board/

_(**DISCLAIMER**: The application does not yet have authorization and no encryption. Please do not post any confidential or illegal information there)_

## About

> The project for studying **React** and some related technologies.
> This project is based on the [course](https://bezugly.ru/react-redux-2020) of **Dmitry Bezugly** (thank you very much).

A simple web application for notes. Analogue Trello, Kanban, Google Keep, etc...
You can create/delete boards, create/delete task lists in these boards, add, edit, remove and mark tasks.

The application supports desktop, tablet and mobile viewports. All of design (except for the slider, for which I used Swiper JS) made of MUI components. As a backend I used Google Firebase.

## Stack

- React 18.2.0
- ReactHooks: useState, useEffect, useRef, useContext, customHooks
- Prop-types 15.8.1
- Router5 8.0.1
- Redux 5.0.1
- MUI Material 5.13.4
- Firebase 9.22.2
- Swiper 9.4.1

## Usage

- install project `npm i`
- start local host `npm run start`
- create a build version `npm run build` (look at `/build` folder)
