/* tslint:disable */
import {Component} from '@angular/core';
// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import * as THREE from 'three';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  bgm = new Audio('assets/bgm.mp3');
  part = 'presentation part';
  chosenPlanet: string = '';


  constructor() {
    /**
     * 创建场景对象
     */
    this.bgm.load();
    this.bgm.play();
    var scene = new THREE.Scene();
    var texLoader = new THREE.TextureLoader();

    var intersectsArr: any[] = []; //保存所有需要射线拾取的星体对象

    // 创建太阳系行星和轨迹
    let Data = data();
    var sun = createSphereMesh(Data.sun.R, Data.sun.URL);
    scene.add(sun);
    intersectsArr.push(sun);
    sun.tag = createTag(Data.sun.name);

    var planetGroup = new THREE.Group();
    scene.add(planetGroup);
    Data.planet.forEach(function(obj) {
      var planet;
      if (obj.ring) {//判断是否是环行星
        planet = createringPlanetMesh(obj.sphere.R, obj.sphere.URL, obj.ring.r, obj.ring.R, obj.ring.URL)
        // planet.children[0].name = obj.name;
        // planet.children[1].name = obj.name;
      } else {
        planet = createSphereMesh(obj.R, obj.URL);
      }

      planet.name = obj.name;
      //创建行星的标签
      planet.tag = createTag(obj.name); //mesh自定义一个属性tag，指向html元素，方便render函数中设置坐标

      // 行星模型对象自定义公转半径属性
      planet.revolutionR = obj.revolutionR;
      // 自定义行星开始角度值，行星在圆周上随机分布
      planet.angle = 2 * Math.PI * Math.random();
      planetGroup.add(planet);
      // 通过公转半径创建圆弧线
      var line = circle(obj.revolutionR);
      scene.add(line);
      intersectsArr.push(planet);
    })
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    //可以根据最外围的海王星公转半径100 * 5设置改参数
    var s = 360;//s参数影响相机渲染的上下左右范围
    //创建相机对象
    // 注意相机参数6远裁界面可以包含全部星体在内
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
    // 据最外围的海王星公转半径100 * 5设置相机位置
    // 相机如果位于行星轨迹内部，场景中部分星体会被剪裁
    camera.position.set(700, 400, 700); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 光源设置
     */
      //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x101010, 1); // 设置背景颜色
    document.body.appendChild(renderer.domElement); // body元素中插入canvas对象


    // 创建 div 对象放置 星球信息图片
    var choosePlanet: { getWorldPosition: (arg0: any) => void; } | null = null;

    var div = document.createElement("div");
    div.style.position = 'absolute';
    div.style.display = 'block';
    document.body.appendChild(div);

    var img = document.createElement("img");
    // 创建的图片元素插入到div元素中
    div.appendChild(img);
    img.src = '';

    //Load background texture
    const loader = new THREE.TextureLoader();
    loader.load('assets/universe.jpeg' , function(texture)
    {
      scene.background = texture;
    });


    function render() {
      // 太阳自转
      sun.rotation.y += 0.01;
      setTagPositionY(sun);
      renderer.render(scene, camera);
      planetGroup.children.forEach(function(obj) {
        obj.rotation.y += 0.01;// 行星自转
        // 半径越大，转动速度越慢
        obj.angle += 0.001 / obj.revolutionR * 400;
        // 行星公转过程位置设置
        obj.position.set(obj.revolutionR * Math.sin(obj.angle), 0, obj.revolutionR * Math.cos(obj.angle));
        setTagPositionY(obj);
      })
      requestAnimationFrame(render);
      // console.log(camera.position);


      if (img.src != '' ) {
        console.log("img:" + img.src);
        // img.src = 'assets/tags/' + this.chosenPlanet + '.png';
        var worldVector = new THREE.Vector3();
        // 获取选中Mesh的世界坐标
        // choosePlanet.getWorldPosition(worldVector);
        var standardVector = worldVector.project(camera); //世界坐标转标准设备坐标
        var a = window.innerWidth / 2;
        var b = window.innerHeight / 2;
        var x = Math.round(standardVector.x * a + a);  //标准设备坐标转屏幕坐标
        var y = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标

        div.style.left = x + 'px';
        div.style.top = y - 280 + 'px';
      }
    }
    render();
    var controls = new OrbitControls(camera,renderer.domElement); //创建控件对象

    function createMesh(geometry, URL) { // R半径,图片URL路径
      var texLoader = new THREE.TextureLoader();
      var material = new THREE.MeshBasicMaterial({
        map: texLoader.load(URL),
        side: THREE.DoubleSide,//双面显示
        transparent:true,//开启透明
      }); //材质对象
       //网格模型对象
      return new THREE.Mesh(geometry, material);
    }
// 球体Mesh  参数：半径R  图片文理
    function createSphereMesh(R, URL) { // R半径,图片URL路径
      var geometry = new THREE.SphereGeometry(R, 100, 100); //创建一个球体几何对象
      return createMesh(geometry, URL);
    }
// 圆环Mesh  参数：半径R  图片文理
    function createRingMesh(r, R, URL) { // R半径,图片URL路径
      var geometry = new THREE.RingGeometry(r, R, 32);//圆环几何体
      // var geometry = new THREE.CircleGeometry(R, 30);//圆几何体
      return createMesh(geometry, URL);
    }
// 环星球Mesh
    function createringPlanetMesh(sphere_R, sphere_URL, ring_r, ring_R, ring_URL) {
      let group = new THREE.Group();
      let spere = createSphereMesh(sphere_R, sphere_URL);
      let ring = createRingMesh(ring_r, ring_R, ring_URL);
      ring.rotateX(Math.PI/2);//调整星环姿态
      group.add(spere, ring);
      return group;
    }

// 公转轨迹圆弧线
    function circle(r) {
      var arc = new THREE.ArcCurve(0, 0, r, 0, 2 * Math.PI, true); // 圆心  半径  起始角度
      var points = arc.getPoints(100); //返回一个vector2对象作为元素组成的数组
      var geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(points);
      var material = new THREE.LineBasicMaterial({
        color: 0x708090
      });
      var line = new THREE.LineLoop(geometry, material);
      line.rotateX(Math.PI / 2);
      return line;
    }

    function data() {
      // 所有星体参数均非真实数据

      //  设置一个基准值K，所有星体的半径和公转半径均是改参数的倍数
      // 所有参数都与K关联，改变K可以很方便改变所有值
      var K = 5;
      return {
        // 太阳
        sun: {
          name: 'Sun',
          R: 10 * K, // 天体半径
          URL: 'assets/planets/sun.jpg', // 天体纹理路径
        },
        // 普通行星
        planet: [{

          name: 'Mercury',
          R: 2.5 * K,
          URL: 'assets/planets/Mercury.jpg',
          revolutionR: 20 * K, //公转半径
        }, {

          name: 'Venus',
          R: 3 * K,
          URL: 'assets/planets/Venus.jpg',
          revolutionR: 30 * K, //公转半径
        }, {

          name: 'Earth',
          R: 3.2 * K,
          URL: 'assets/planets/Earth.jpg',
          revolutionR: 40 * K, //公转半径
        }, {

          name: 'Mars',
          R: 2.5 * K,
          URL: 'assets/planets/Mars.jpg',
          revolutionR: 50 * K, //公转半径
        }, {

          name: 'Jupiter',
          R: 5 * K,
          URL: 'assets/planets/Jupiter.jpg',
          revolutionR: 60 * K, //公转半径
        }, {

          name: 'Saturn',
          sphere: {
            R: 3.5 * K, //半径
            URL: 'assets/planets/Saturn.jpg',
          },
          ring: {
            r: 4 * K, //内径
            R: 6 * K, //外径
            URL: 'assets/planets/SaturnRing.png',
          },
          revolutionR: 70 * K,
        }, {

          name: 'Uranus',
          sphere: {
            R: 3.5 * K, //半径
            URL: 'assets/planets/Uranus.jpg',
          },
          ring: {
            r: 4 * K, //内径
            R: 6 * K, //外径
            URL: 'assets/planets/UranusRing.png',
          },
          revolutionR: 80 * K,
        }, {

          name: 'Neptune',
          R: 4 * K,
          URL: 'assets/planets/Neptune.jpg',
          revolutionR: 100 * K, //公转半径
        }, ],
        // 环行星
        ringPlanet: [],
        // 月球
        moon: {
          R: K,
          URL: 'tu.png',
          revolutionR: 10 * K,
        },
      };
    }

    // 星体标签 创建
    function createTag(str) { //str表示星体名称
      var div = document.createElement('div');
      document.body.appendChild(div);
      div.style.position = 'absolute';
      div.style.display = 'block';
      div.innerText = str; //星体名称
      div.style.padding = '6px 10px';
      div.style.color = '#fff';
      div.style.fontSize = '14px';
      div.style.backgroundColor = 'rgba(25,25,25,0.4)'; // 0.4 透明度
      div.style.borderRadius = '5px'
      return div;
    }

    // 计算星体在canvas画布上的屏幕坐标
    function setTagPositionY(obj) { //obj表示星体对象
      var worldVector = new THREE.Vector3();
      // 获取 three 中行星的世界坐标
      obj.getWorldPosition(worldVector);
      // 世界坐标 转 标准设备坐标
      var standardVector = worldVector.project(camera); //世界坐标转标准设备坐标
      var a = window.innerWidth / 2;
      var b = window.innerHeight / 2;
      // 标准设备坐标 转 屏幕坐标：计算HTML标签纵横坐标
      var x = Math.round(standardVector.x * a + a); // 标准设备坐标转屏幕坐标
      var y = Math.round(-standardVector.y * b + b)  + 40; // 标准设备坐标转屏幕坐标
      // 设置标签纵横坐标适当偏移一定距离
      obj.tag.style.left = x  + 'px';
      obj.tag.style.top = y  + 'px';
    }

    function chooseButton(planetName: string): void{
      console.log("点了" + planetName);
      img.src = 'assets/tags/' + planetName + '.png';
    }


    function choose(event) {
      img.src = '';
      // getName();
      var Sx = event.clientX;
      var Sy = event.clientY;
      console.log(Sx, Sy);
      // //屏幕坐标转标准设备坐标
      // var x = (Sx / window.innerWidth) * 2 - 1;
      // var y = -(Sy / window.innerHeight) * 2 + 1;
      if (Sy > 680 ){
        if(Sx > 220 && Sx < 270){
          img.src = 'assets/tags/太阳.png'
        }
        if(Sx > 320 && Sx < 370){
          img.src = 'assets/tags/水星.png'
        }
        if(Sx > 420 && Sx < 470){
          img.src = 'assets/tags/金星.png'
        }
        if(Sx > 520 && Sx < 570){
          img.src = 'assets/tags/地球.png'
        }
        if(Sx > 620 && Sx < 670){
          img.src = 'assets/tags/火星.png'
        }
      }


      // var raycaster = new THREE.Raycaster();
      // raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      // // 环行星是group包含两个mesh子对象，intersectObjects方法第二个参数设置为true，可以检测子对象
      // var intersects = raycaster.intersectObjects(intersectsArr, true);
      // if (intersects.length > 0) {
      //   // 环行星好像无法选中
      //   console.log("射线投射器返回的对象", intersects);
      //   console.log(intersects[0].object.name);
      //   img.src = 'assets/tags/' + intersects[0].object.name + '.png';
      //   console.log(img.src);
      //   choosePlanet = intersects[0].object;
      // }else{
      //   console.log('没东西');
      // }
    }

     addEventListener('click', choose); // 监听窗口鼠标单击事件
  }
}
