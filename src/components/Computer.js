import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import computerObj from '../assets/computer/computer.fbx';
import texture1 from '../assets/computer/textures/Lowpoly_Laptop_1.jpg';
import texture2 from '../assets/computer/textures/Lowpoly_Laptop_2.jpg';
import normalMap1 from '../assets/computer/textures/Lowpoly_Laptop_Nor_1.jpg';
import normalMap2 from '../assets/computer/textures/Lowpoly_Laptop_Nor_2.jpg';

function Computer({ scene }) {
    const navigate = useNavigate();

    // 클릭 이벤트 핸들러를 컴포넌트 내부에 정의
    const handleMouseClick = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // 마우스 좌표를 정규화(-1 ~ 1)로 변환
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, scene.userData.camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            console.log('Computer clicked!');
            navigate('/laptop'); // /laptop 페이지로 이동
        }
    };

    useEffect(() => {
        const loader = new THREE.TextureLoader();

        const textureMap1 = loader.load(texture1);
        const textureMap2 = loader.load(texture2);
        const normal1 = loader.load(normalMap1);
        const normal2 = loader.load(normalMap2);

        const fbxLoader = new FBXLoader();
        let computer = null;

        fbxLoader.load(
            computerObj,
            (loadedComputer) => {
                computer = loadedComputer;
                computer.scale.set(0.01, 0.01, 0.01); // 모델 크기 조정
                computer.position.set(-9, -0.9, -6); // 책상 위에 배치
                computer.rotation.y = Math.PI; // 약간 회전

                computer.traverse((child) => {
                    if (child.isMesh) {
                        const materials = [
                            new THREE.MeshStandardMaterial({
                                map: textureMap2,
                                normalMap: normal2, // 키보드 텍스처
                            }),
                            new THREE.MeshStandardMaterial({
                                map: textureMap1,
                                normalMap: normal1, // 화면 텍스처
                            }),
                        ];
                        child.material = materials;
                    }
                });

                scene.add(computer);
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the computer:', error);
            }
        );

        // 클릭 이벤트 리스너 등록
        window.addEventListener('click', handleMouseClick);

        return () => {
            // 이벤트 리스너 정리
            window.removeEventListener('click', handleMouseClick);

            if (computer) {
                scene.remove(computer);
                computer.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        if (Array.isArray(child.material)) {
                            child.material.forEach((mat) => {
                                if (mat.map) mat.map.dispose();
                                if (mat.normalMap) mat.normalMap.dispose();
                                mat.dispose();
                            });
                        } else {
                            if (child.material.map) child.material.map.dispose();
                            if (child.material.normalMap) child.material.normalMap.dispose();
                            child.material.dispose();
                        }
                    }
                });
            }
        };
    }, [scene, navigate]);

    return null;
}

export default Computer;

