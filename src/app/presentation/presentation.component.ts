import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {

  part = 'presentation part';

  constructor() {
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
      // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    var texLoader = new THREE.TextureLoader();
    // 如果渲染区域像素范围比较小，纹理贴图的像素值 也可以降低
    var geometry = new THREE.SphereGeometry(30, 25, 25);
    // MeshLambertMaterial  MeshPhongMaterial
    var material = new THREE.MeshBasicMaterial({
      // color: 0x0000ff,
      // 设置颜色贴图
       map: texLoader.load('assets/地球.jpg'),
    });
    var mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh

    // var mesh = new GLTFLoader('assets/3dModel/Mars.glb');
    // var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    // var material = new THREE.MeshBasicMaterial( { color: 0xeeff10 } );
    // var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh); // 网格模型添加到场景中

    /**
     * 光源设置
     */
      // 平行光1
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(400, 200, 300);
    scene.add(directionalLight);
    // 平行光2
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight2.position.set(-400, -200, -300);
    scene.add(directionalLight2);
    // 环境光
    var ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    /**
     * 相机设置
     */
    var width = window.innerWidth; // 窗口宽度
    var height = window.innerHeight; // 窗口高度
    var k = width / height; // 窗口宽高比
    var s = 150; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); // 设置相机位置
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer({
      antialias: true, // 开启锯齿
    });
    renderer.setSize(width, height); // 设置渲染区域尺寸
    // renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    document.body.appendChild(renderer.domElement); // body元素中插入canvas对象

    // 渲染函数
    function render() {
      renderer.render(scene, camera); // 执行渲染操作
      mesh.rotateY(0.003); // 每次绕y轴旋转0.01弧度
      requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
    }

    render();
    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    var controls = new OrbitControls(camera, renderer.domElement);
  }
}

// tslint:disable-next-line:no-unused-expression
// ngOnInit();: void {
// }
