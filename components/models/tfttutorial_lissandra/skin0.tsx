import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Ice1: THREE.Bone
    Ice2: THREE.Bone
    Ice3: THREE.Bone
    Ice4: THREE.Bone
    Ice5: THREE.Bone
    Ice6: THREE.Bone
    Ice7: THREE.Bone
    Ice8: THREE.Bone
    Ice9: THREE.Bone
    Ice10: THREE.Bone
    Ice11: THREE.Bone
    Ice12: THREE.Bone
    Ice13: THREE.Bone
    Ice14: THREE.Bone
    Ice15: THREE.Bone
    Ice16: THREE.Bone
    Ice17: THREE.Bone
    Ice18: THREE.Bone
    Ice19: THREE.Bone
    Ice20: THREE.Bone
    Ice21: THREE.Bone
    Ice22: THREE.Bone
    Ice23: THREE.Bone
    Ice24: THREE.Bone
    Ice25: THREE.Bone
    Ice26: THREE.Bone
    Ice27: THREE.Bone
    Ice28: THREE.Bone
    Ice29: THREE.Bone
    Ice30: THREE.Bone
    Q_Spike: THREE.Bone
  }
  materials: {
    Lissandra_Model_Lissandra1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Idle1'
  | 'Celebration'
  | 'Spell4_Self'
  | 'Spell4'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Ice1} />
        <primitive object={nodes.Ice2} />
        <primitive object={nodes.Ice3} />
        <primitive object={nodes.Ice4} />
        <primitive object={nodes.Ice5} />
        <primitive object={nodes.Ice6} />
        <primitive object={nodes.Ice7} />
        <primitive object={nodes.Ice8} />
        <primitive object={nodes.Ice9} />
        <primitive object={nodes.Ice10} />
        <primitive object={nodes.Ice11} />
        <primitive object={nodes.Ice12} />
        <primitive object={nodes.Ice13} />
        <primitive object={nodes.Ice14} />
        <primitive object={nodes.Ice15} />
        <primitive object={nodes.Ice16} />
        <primitive object={nodes.Ice17} />
        <primitive object={nodes.Ice18} />
        <primitive object={nodes.Ice19} />
        <primitive object={nodes.Ice20} />
        <primitive object={nodes.Ice21} />
        <primitive object={nodes.Ice22} />
        <primitive object={nodes.Ice23} />
        <primitive object={nodes.Ice24} />
        <primitive object={nodes.Ice25} />
        <primitive object={nodes.Ice26} />
        <primitive object={nodes.Ice27} />
        <primitive object={nodes.Ice28} />
        <primitive object={nodes.Ice29} />
        <primitive object={nodes.Ice30} />
        <primitive object={nodes.Q_Spike} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Lissandra_Model_Lissandra1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-60.75, -66.93, -214.26]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
