## System Implementation

### Stack architecture and system design

Backend : According to the characteristics of our website, we do not need to interact with the database too much, and for easier deployment, we use the Mongodb Atlas as the database.

Middle Tier : We use the minimal and flexible Express Node.js web application framework, and build APIs based on that.

Front End : Our project focuses on the front-end part. The front-end is composed of three parts, the display part (showing the solar system in a 3D scene dynamically), the quiz part (providing 10 multiple-choice questions and scoring), and the end part (providing a return after the quiz is finished)

![architecture](./architecture.jpg)





### Front End - Angular Details of implementation



#### Comonents

##### Presentaion

The presentation part represents the planets' rotation and revolution in a 3D environment, user can hold down the mouse and move to get a 360-degree view of the solar system, and in the bottom of page, there are 9 buttons represents the planets whick can be clicked to make a short description of planets appear.

We have implemented the following functions：

![截屏2021-04-26 10.28.58](/Users/jon/Desktop/截屏2021-04-26 10.28.58.png)



##### Quiz Game

The other part is  the quiz which give 10 questions to test the users knowledge about solar system and give a score after the quiz, then user can choose to play the quiz again or return presentation part.



##### End





### Back End





### Middle Tier



### 



### Deployment details