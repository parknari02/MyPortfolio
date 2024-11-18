import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import skyTextureImage from '../assets/sky_texture.jpg';

function Sky() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // 하늘 배경 텍스처 설정
        const loader = new THREE.TextureLoader();
        loader.load(skyTextureImage, (texture) => {
            scene.background = texture;
        });

        // 안개 효과
        scene.fog = new THREE.Fog(0x87CEEB, 10, 50);

        // 태양광
        const sunlight = new THREE.DirectionalLight(0xffee88, 1.5);
        sunlight.position.set(5, 10, 5);
        scene.add(sunlight);

        // 구름 텍스처를 사용한 구름 생성
        const cloudTexture = loader.load('/assets/sky_texture.jpg'); // 구름 텍스처 경로
        function createCloud() {
            const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, transparent: true, opacity: 0.8 });
            const cloud = new THREE.Sprite(cloudMaterial);
            cloud.scale.set(5, 5, 1); // 구름 크기 조정
            cloud.position.set(
                Math.random() * 20 - 10,
                Math.random() * 5 + 5,
                Math.random() * 10 - 5
            );
            scene.add(cloud);
            return cloud;
        }

        // 구름 여러 개 생성 및 저장
        const clouds = Array.from({ length: 10 }, createCloud);

        // 애니메이션 함수
        const animate = () => {
            requestAnimationFrame(animate);

            // 구름 이동 효과
            clouds.forEach((cloud) => {
                cloud.position.x -= 0.01;
                if (cloud.position.x < -10) {
                    cloud.position.x = 10;
                }
            });

            renderer.render(scene, camera);
        };

        // 카메라 초기 위치 설정
        camera.position.z = 5;

        // 윈도우 리사이즈 대응
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // 애니메이션 시작
        animate();

        // 컴포넌트가 언마운트될 때 정리
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}

export default Sky;
