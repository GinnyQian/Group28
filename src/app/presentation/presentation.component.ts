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
    // const texture = new THREE.TextureLoader().load('assets/universe.jpg');
    const scene = new THREE.Scene();
    const texLoader = new THREE.TextureLoader();
      // // 如果渲染区域像素范围比较小，纹理贴图的像素值 也可以降低
    const geometry = new THREE.SphereGeometry(30, 25, 25);
      // MeshLambertMaterial  MeshPhongMaterial
    const material = new THREE.MeshBasicMaterial({
        // color: 0x0000ff,
        map: texLoader.load('assets/planets/diffuse.png'),
    });
    const earth = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
    scene.add(earth);
    earth.position.x = 150;
    const geometrySun = new THREE.SphereGeometry(30, 25, 25);
    const materialSun = new THREE.MeshBasicMaterial({
      map: texLoader.load('assets/planets/sun.jpg'),
    });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);
    // sun.position.x = 150;
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(200);
    scene.add(axesHelper);
    // 网格平面
    const gridHelper = new THREE.GridHelper(300, 30);
    scene.add( gridHelper );
    /**
     * 光源设置
     */
      // 平行光1
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(400, 200, 300);
    scene.add(directionalLight);
    // 平行光2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight2.position.set(-400, -200, -300);
    scene.add(directionalLight2);
    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // draw the orbit line
    function circle (a, b) {
      // use ArcCurve to create a curve
      const arc = new THREE.EllipseCurve(0, 0, a, b, 0, 2 * Math.PI, true);
      // 获取点数越多，圆弧越光滑
      const points = arc.getPoints(100); // 返回一个vector2对象作为元素组成的数组
      // console.log('points', points);
      const curve = new THREE.BufferGeometry();
      // setFromPoints方法的本质：遍历points把vector2转变化vector3
      curve.setFromPoints(points);
      const curveMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
      });
      // THREE.Line
      const line = new THREE.LineLoop(curve, curveMaterial); // 起始点闭合
      // 圆弧线默认在XOY平面上，绕x轴旋转到XOZ平面上
      line.rotateX(Math.PI / 2);
      scene.add(line);
    }
    /**
     * 相机设置
     */
    const width = window.innerWidth; // 窗口宽度
    const height = window.innerHeight; // 窗口高度
    const k = width / height; // 窗口宽高比
    const s = 250; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
    camera.position.set(200, 300, 200); // 设置相机位置
    /**
     * 创建渲染器对象
     */
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 开启锯齿
      alpha: true,
    });
    renderer.setSize(width, height); // 设置渲染区域尺寸
    // renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    document.body.appendChild(renderer.domElement); // body元素中插入canvas对象

    // 渲染函数
    const R = 130;
    const a = 130;
    const b = 200;
    var angle = 0;
    function render() {
      renderer.render(scene, camera); // 执行渲染操作
      earth.rotateY(0.003); // 每次绕y轴旋转0.01弧度
      sun.rotateY(0.01);
      angle += 0.01;
      const x = a * Math.sin(angle);
      const z = b * Math.cos(angle);
      earth.position.set(x, 0, z);
      requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
    }
    circle(130, 200);
    render();
    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    const controls = new OrbitControls(camera, renderer.domElement);
  }
}
