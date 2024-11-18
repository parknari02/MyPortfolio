// Chair.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import chairObj from '../assets/chair/Chair.fbx';
import chairTextureImg from '../assets/chair/texture/Chair.png'; // 텍스처 이미지 경로

function Chair({ scene }) {
    useEffect(() => {
        // 텍스처 로드
        const loader = new THREE.TextureLoader();
        const chairTexture = loader.load(chairTextureImg);

        // FBXLoader로 의자 모델 로드 및 배치
        const fbxLoader = new FBXLoader();
        let chair = null;

        fbxLoader.load(chairObj, (loadedChair) => {
            chair = loadedChair;
            chair.scale.set(0.015, 0.015, 0.015); // 모델 크기 조정
            chair.position.set(-5.5, -5, -5.8); // 책상 앞에 의자 배치

            // 특정 부분에만 텍스처 적용 (예: 의자 시트 부분)
            chair.traverse((child) => {
                if (child.isMesh) {
                    if (child.name.includes('Cube') || child.name.includes('Chair')) {
                        // 의자 시트 또는 등받이 부분에만 텍스처 적용
                        child.material = new THREE.MeshStandardMaterial({ map: chairTexture });
                    } 
                }
            });

            scene.add(chair);
        }, undefined, (error) => {
            console.error('An error occurred while loading the chair:', error);
        });

        // 컴포넌트가 언마운트될 때 의자를 씬에서 제거
        return () => {
            if (chair) {
                scene.remove(chair);
                chair.traverse((child) => {
                    if (child.isMesh) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((material) => {
                                if (material.map) material.map.dispose();
                                if (material.normalMap) material.normalMap.dispose();
                                material.dispose();
                            });
                        } else {
                            if (child.material.map) child.material.map.dispose();
                            if (child.material.normalMap) child.material.normalMap.dispose();
                            child.material.dispose();
                        }
                        child.geometry.dispose();
                    }
                });
            }
        };
    }, [scene]);

    return null;
}

export default Chair;
