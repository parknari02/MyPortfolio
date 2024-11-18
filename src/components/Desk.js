// Desk.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import deskobj from '../assets/desk/desk.FBX';
import deskTextureImg from '../assets/desk/texture/Dark-Wood-Texture-520x339.jpg';

function Desk({ scene }) {
    useEffect(() => {
        // 텍스처 로드
        const loader = new THREE.TextureLoader();
        const deskTexture = loader.load(deskTextureImg);

        // FBXLoader로 책상 모델 로드 및 텍스처 적용
        const fbxLoader = new FBXLoader();
        let desk = null;

        fbxLoader.load(deskobj, (loadedDesk) => {
            desk = loadedDesk;
            desk.scale.set(0.13, 0.13, 0.13); // 모델 크기 조정
            desk.position.set(-7.5, -5, -4.5); // 방 안에 책상 배치

            // 책상의 모든 메시에 텍스처 적용
            desk.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ map: deskTexture });
                }
            });

            scene.add(desk);
        }, undefined, (error) => {
            console.error('An error occurred while loading the desk:', error);
        });

        // 컴포넌트가 언마운트될 때 책상을 씬에서 제거
        return () => {
            if (desk) {
                scene.remove(desk);
                desk.traverse((child) => {
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

export default Desk;
