import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Ctsm_BlackBoard: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Ruler: THREE.Bone
    AirPlane3: THREE.Bone
    AirPlane2: THREE.Bone
    AirPlane1: THREE.Bone
    Mug: THREE.Bone
    Toast: THREE.Bone
    Book1: THREE.Bone
    Book2: THREE.Bone
    Book3: THREE.Bone
  }
  materials: {
    Graves_Skin25_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Crit' | 'Death' | 'Run' | 'Idle1' | 'Celebration' | 'Attack2' | 'Spell2'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Ctsm_BlackBoard} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Ruler} />
        <primitive object={nodes.AirPlane3} />
        <primitive object={nodes.AirPlane2} />
        <primitive object={nodes.AirPlane1} />
        <primitive object={nodes.Mug} />
        <primitive object={nodes.Toast} />
        <primitive object={nodes.Book1} />
        <primitive object={nodes.Book2} />
        <primitive object={nodes.Book3} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Graves_Skin25_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-99.95, -11.8, -62.94]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
