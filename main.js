import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('container').appendChild( renderer.domElement )

const light = new THREE.DirectionalLight( 0xffffff, 2)
light.position.set(5, 10, 1)
light.castShadow = true
scene.add(light)


light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 0.1
light.shadow.camera.far = 500

const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000
})
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial)
sphere.castShadow = true
sphere.receiveShadow = false
scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32)
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x13181f

})
const plane = new THREE.Mesh( planeGeometry, planeMaterial)
plane.receiveShadow = true
scene.add(plane)


const helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper)


camera.position.z = 12
camera.position.y = 5

function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.y += 0.01
	sphere.rotation.x += 0.01



	renderer.render( scene, camera );
}
animate();
