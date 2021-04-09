/* tslint:disable */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import * as THREE from 'three';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {

  part = 'presentation part';

  constructor() {
    /**
     * 创建场景对象
     */
    var scene = new THREE.Scene();
    var texLoader = new THREE.TextureLoader();
    // 创建太阳系行星和轨迹
    let Data = data();
    var sun = createSphereMesh(Data.sun.R, Data.sun.URL);
    scene.add(sun);

    var div = createTag(Data.sun.name);
    sun.tag = div;

    var planetGroup = new THREE.Group();
    scene.add(planetGroup);
    Data.planet.forEach(function(obj) {
      var planet;
      if (obj.ring) {//判断是否是环行星
        planet = createringPlanetMesh(obj.sphere.R, obj.sphere.URL, obj.ring.r, obj.ring.R, obj.ring.URL)
      } else {
        planet = createSphereMesh(obj.R, obj.URL);
      }

      // planet.name = ; //设置行星属性名
      var div = createTag(obj.name); //创建行星的标签
      planet.tag = div; //mesh自定义一个属性tag，指向html元素，方便render函数中设置坐标

      // 行星模型对象自定义公转半径属性
      planet.revolutionR = obj.revolutionR;
      // 自定义行星开始角度值，行星在圆周上随机分布
      planet.angle = 2 * Math.PI * Math.random();
      planetGroup.add(planet);
      // 通过公转半径创建圆弧线
      var line = circle(obj.revolutionR);
      scene.add(line);
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
    camera.position.set(700, 700, 700); //设置相机位置
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
        obj.angle += 0.005 / obj.revolutionR * 400;
        // 行星公转过程位置设置
        obj.position.set(obj.revolutionR * Math.sin(obj.angle), 0, obj.revolutionR * Math.cos(obj.angle));
        setTagPositionY(obj);
      })
      requestAnimationFrame(render);
      console.log(camera.position);
    }
    render();
    var controls = new OrbitControls(camera,renderer.domElement); //创建控件对象

    function createMesh(geometry, URL) { // R半径,图片URL路径
                                         // Lambert
      var texLoader = new THREE.TextureLoader();
      var material = new THREE.MeshBasicMaterial({
        map: texLoader.load(URL),
        side: THREE.DoubleSide,//双面显示
        transparent:true,//开启透明
      }); //材质对象
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象
      return mesh;
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
      var points = arc.getPoints(50); //返回一个vector2对象作为元素组成的数组
      var geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(points);
      var material = new THREE.LineBasicMaterial({
        color: 0xdcdcdc
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
          name: '太阳',
          R: 10 * K, // 天体半径
          URL: 'assets/planets/sun.jpg', // 天体纹理路径
        },
        // 普通行星
        planet: [{

          name: '水星',
          R: 2.5 * K,
          URL: 'assets/planets/水星.jpg',
          revolutionR: 20 * K, //公转半径
        }, {

          name: '金星',
          R: 3 * K,
          URL: 'assets/planets/金星.jpg',
          revolutionR: 30 * K, //公转半径
        }, {

          name: '地球',
          R: 3.2 * K,
          URL: 'assets/planets/地球.jpg',
          revolutionR: 40 * K, //公转半径
        }, {

          name: '火星',
          R: 2.5 * K,
          URL: 'assets/planets/火星.jpg',
          revolutionR: 50 * K, //公转半径
        }, {

          name: '木星',
          R: 5 * K,
          URL: 'assets/planets/木星.jpg',
          revolutionR: 60 * K, //公转半径
        }, {

          name: '土星',
          sphere: {
            R: 3.5 * K, //半径
            URL: 'assets/planets/土星.jpg',
          },
          ring: {
            r: 4 * K, //内径
            R: 6 * K, //外径
            URL: 'assets/planets/土星环.png',
          },
          revolutionR: 70 * K,
        }, {

          name: '天王星',
          sphere: {
            R: 3.5 * K, //半径
            URL: 'assets/planets/天王星.jpg',
          },
          ring: {
            r: 4 * K, //内径
            R: 6 * K, //外径
            URL: 'assets/planets/天王星环.png',
          },
          revolutionR: 80 * K,
        }, {

          name: '海王星',
          R: 4 * K,
          URL: 'assets/planets/海王星.jpg',
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
      return div
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

  }
}
