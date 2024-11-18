// Cube.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Cube() {
  const meshRef = useRef();  // mesh에 접근하기 위한 ref 설정

  // useFrame 훅을 사용해 매 프레임마다 호출
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;  // x축으로 회전
      meshRef.current.rotation.y += 0.01;  // y축으로 회전
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Cube;
