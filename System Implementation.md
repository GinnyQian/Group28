## System Implementation

### Stack architecture and system design

Backend : According to the characteristics of our website, we do not need to interact with the database too much, and for easier deployment, we use the Mongodb Atlas as the database.

Middle Tier : We use the minimal and flexible Express Node.js web application framework, and build APIs based on that.

Front End : Our project focuses on the front-end part. The front-end is composed of three parts, the display part (showing the solar system in a 3D scene dynamically), the quiz part (providing 10 multiple-choice questions and scoring), and the end part (providing a return after the quiz is finished)

![architecture](./pictures/architecture.jpg)





### Front End - Angular Details of implementation



#### Comonents

##### Presentaion

The presentation part represents the planets' rotation and revolution in a 3D environment, user can hold down the mouse and move to get a 360-degree view of the solar system, and in the bottom of page, there are 9 buttons represents the planets whick can be clicked to make a short description of planets appear.

The overall layout of this part is shown in the figure below

![wholepre](./pictures/wholepre.png)

We have implemented the following functions：

**Dynamic display of 3D model of solar system** 

In the presentation part, we mainly used the famous three. js library which is a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL. The implementation of this part can be divided into the following parts:

1. Creating the scene

   To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.

   First is the scene and the camera : 

   ```javascript
   var scene = new THREE.Scene();
   var width = window.innerWidth; // get window width and height
   var height = window.innerHeight; 
   var k = width / height; // set the ratio
   var s = 360;// up, down, left, and right range of camera rendering
   // create camera object
   var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
   camera.position.set(700, 400, 700); // set camera position
   camera.lookAt(scene.position); // set camera direction
   ```

   Then create the renderer and insert to dim as a element

   ```javascript
   var renderer = new THREE.WebGLRenderer({
     antialias: true
   });
   renderer.setSize(width, height);
   renderer.setClearColor(0x101010, 1); // set background
   document.body.appendChild(renderer.domElement); // insert to dom
   ```

2. 星球数据设置

3. Add planets object to scene星球导入到场景

   In this part, we need to create planets and add them to scene, because wo have 10  planets to implement so we write a functin to simplify that:

   ```javascript
   function createSphereMesh(R, URL) { // planet radius and URL of its picture
     // create sphere geometry
   	var geometry = new THREE.SphereGeometry(R, 100, 100); 
     var texLoader = new THREE.TextureLoader();
     // use a picutre to create the material
     var material = new THREE.MeshBasicMaterial({  
       map: texLoader.load(URL),
       side: THREE.DoubleSide,// make we can see it from any perspective
       transparent:true,
     }); 
     return new THREE.Mesh(geometry, material); // create the planet object
   }
   
   ```

   

4. 星球的自转和公转

5. 轨迹线显示

   





##### Quiz Game

The other part is  the quiz which give 10 questions to test the users knowledge about solar system and give a score after the quiz, then user can choose to play the quiz again or return presentation part.



##### End





### Back End





### Middle Tier



### 



### Deployment details