# 📝 Psycheas - Test your soft skills

A paradox packed in a conundrum, veiled in mystery and immersed in the intrigue. It's a thrilling journey that tests your wits and transports you to a world of investigators and crime scenes.  
But be cautious since there are clues mixed up with dead ends.  
It tests your problem-solving, creative, and time-management abilities to the test!

#### Main Language Used - **JavaScript**

### Tech Stack Used - 
- Next.js
- Tailwind CSS
- Node.js
- Express.js 
- Mongo DB
and several other packages

Links - 
* [Frontend Code](https://github.com/AmitSahoo45/psycheas-frontend)
* [Frontend Live Demo](https://psycheas-frontend.vercel.app/)
* [Backend Code](https://github.com/AmitSahoo45/psycheas-backend)

To Run the Frontend Code - 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Routes
* /login
* /whodunit/[slug]
* /admin/login
* /admin

The Soft skills that can be accessed by this puzzle:
* Problem solving
* Critical thinking
* Time Management
* deductive reasoning
* Attention to detail

## Feature Checklist

- &check; Anyone with an email address can create an Id and password to participate in the game
- &check; The puzzle must contain - Minimum 5 clues, Minimum 2 dead-ends, and Minimum 1 solution 
- &check; Earth (Orbit/Moon)
- &check; All the progress / user data (eg - time taken by each user for every step, solution accuracy, etc.) depending on your puzzle requirements should be stored for every user
- &check; On refreshing, from either browser or website, the puzzle should start from the same step or give the user an option to restart
- &check; A dashboard for the admin where the progress of all the users can be tracked & analyzed

## About the application

Psycheas is a type of problem-solving challenge where the goal is to determine who committed a crime or some other mysterious event.

The solver is given a set of clues that must be cobbled together in order to solve the mystery. However, he or she must be cautious **since hints are mixed together with dead ends**. The clues might come in the shape of witness accounts, tangible proof, or other sorts of information.

**These storylines have at least 5 clues, 2 dead ends and 1 solution(As per the requirement)**

The solver must carefully study each clue and apply logic and logical reasoning to eliminate probable suspects and restrict the list of viable solutions. This necessitates meticulous attention to detail as well as the capacity to critically evaluate each item of the information offered.

The user is given several options to choose the answer from. **These options are designed in such a manner that will legitimately confuse the solver to arrive at a particular solution.**
Additionally, there is a ***5-minute timer*** that runs throughout the period. This will test the time management skills of the user. This timer plays a significant role in the calculation of accuracy. If the user is unable to answer question within the period, then the option which the solver has initially chosen will be auto-submitted and the results will be shown. In case the **solver hasn't chosen any answer**, it will be **automatically marked as incorrect**. 

### Calculation of accuracy and percentile

- Accuracy - The time and correct is taken from the frontend side and accuracy is calculated on the basis of that. For correct answer, a credit of 0.5 is multiplied with time. 0.1 incase it's wrong. Additional 50 points are awarded if it is correct.

- Percentile - If the user attempts **it correctly for the first time**, it gets 100 percentile else 0 incase it is incorrect. It is basically calculated on the basics of previous attempts and how many times was he correct. 

## **Ways to solve this problem**
Largely depends upon the storyline and various softskills of the solver such as problem-solving, critical thinking, deductive reasoning, and attention to detail.

