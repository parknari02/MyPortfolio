// Bed.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import bedObj from '../assets/bed/Bed.fbx';

function Bed({ scene }) {
    useEffect(() => {
        // FBXLoader로 침대 모델 로드 및 배치
        const fbxLoader = new FBXLoader();
        let bed = null;

        fbxLoader.load(bedObj, (loadedBed) => {
            bed = loadedBed;
            bed.scale.set(0.2, 0.2, 0.2); // 모델 크기 조정
            bed.position.set(5, -44.2, 6.2); // 방 안의 적절한 위치에 침대 배치
            
            // 침대 회전 (예: Y축을 기준으로 90도 회전)
            bed.rotation.y = Math.PI * 1.23;

            bed.traverse((child) => {
                if (child.isMesh) {
                    // 회색 단색 재질 적용
                    child.material = new THREE.MeshStandardMaterial({ color: 0x808080 });
                }
            });

            scene.add(bed);
        }, undefined, (error) => {
            console.error('An error occurred while loading the bed:', error);
        });

        // 컴포넌트가 언마운트될 때 침대를 씬에서 제거
        return () => {
            if (bed) {
                scene.remove(bed);
                bed.traverse((child) => {
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

export default Bed;
