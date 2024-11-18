// Wardrobe.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import wardrobeObj from '../assets/wardrobe/Wardrobe.fbx';
import wardrobeTextureImg from '../assets/wardrobe/texture/wardrobe_texture.jpg'; // 텍스처 이미지 경로

function Wardrobe({ scene }) {
    useEffect(() => {
        // 텍스처 로드
        const loader = new THREE.TextureLoader();
        const wardrobeTexture = loader.load(wardrobeTextureImg);

        // FBXLoader로 옷장 모델 로드 및 배치
        const fbxLoader = new FBXLoader();
        let wardrobe = null;

        fbxLoader.load(wardrobeObj, (loadedWardrobe) => {
            wardrobe = loadedWardrobe;
            wardrobe.scale.set(0.03, 0.03, 0.03); // 모델 크기 조정
            wardrobe.position.set(-8, -5, 7.3); // 방 안의 적절한 위치에 옷장 배치
            
            // 옷장을 Y축으로 회전 (90도 회전)
            wardrobe.rotation.y = Math.PI / 2;

            // 옷장의 모든 메시에 텍스처 적용
            wardrobe.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ map: wardrobeTexture });
                }
            });

            scene.add(wardrobe);
        }, undefined, (error) => {
            console.error('An error occurred while loading the wardrobe:', error);
        });

        // 컴포넌트가 언마운트될 때 옷장을 씬에서 제거
        return () => {
            if (wardrobe) {
                scene.remove(wardrobe);
                wardrobe.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        if (child.material.map) child.material.map.dispose();
                        child.material.dispose();
                    }
                });
            }
        };
    }, [scene]);

    return null;
}

export default Wardrobe;
