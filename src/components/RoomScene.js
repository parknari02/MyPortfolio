import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import wallTextureImg from '../assets/wall/wall.jpg';
import floorTextureImg from '../assets/wood_floor_worn_2k.blend/textures/wood_floor_worn_diff_2k.jpg';
import Desk from './Desk';
import Chair from './Chair';
import Wardrobe from './Wardrobe';
import Bed from './Bed';
import Computer from './Computer';

function RoomScene() {
    const mountRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());

    useEffect(() => {
        const scene = sceneRef.current;
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.userData.camera = camera; // 카메라를 scene.userData에 저장
    
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // mountRef가 유효한지 확인 후 렌더러 추가
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }
    
        // OrbitControls 설정
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = 5;
        controls.maxDistance = 100;
        controls.target.set(0, 0, 0);
    
        // 텍스처 로드
        const loader = new THREE.TextureLoader();
        const wallTexture = loader.load(wallTextureImg);
        const floorTexture = loader.load(floorTextureImg);
    
        // 방 설정 (크기 조정 및 텍스처 적용)
        const roomGeometry = new THREE.BoxGeometry(20, 10, 20); // 방 크기를 키움
        const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
            side: THREE.BackSide,
        });
        const room = new THREE.Mesh(roomGeometry, wallMaterial);
        scene.add(room);
    
        // 바닥 설정 (방 크기에 맞게 두께감 추가, 텍스처 적용)
        const floorGeometry = new THREE.BoxGeometry(20, 0.2, 20); // 바닥 크기 조정
        const floorMaterial = new THREE.MeshStandardMaterial({
            map: floorTexture,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -5.0; // 바닥을 방 크기에 맞게 아래로 배치
        scene.add(floor);
    
        // 조명 추가
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 5, 0);
        scene.add(pointLight);
    
        // 카메라 초기 위치 설정
        camera.position.set(20, 15, 20);
        camera.lookAt(0, 0, 0);
    
        // 애니메이션 함수
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    
        // 윈도우 리사이즈 대응
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);

            // mountRef.current가 유효한지 확인 후 정리
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{ width: '100%', height: '100vh' }}>
            <Desk scene={sceneRef.current} />
            <Computer scene={sceneRef.current} />
            <Chair scene={sceneRef.current} /> {/* Chair 컴포넌트 추가 */}
            <Wardrobe scene={sceneRef.current} /> {/* Wardrobe 컴포넌트 추가 */}
            <Bed scene={sceneRef.current} />
        </div>
    );
}

export default RoomScene;
