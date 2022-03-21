import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    R_Snap_Bomb2World: THREE.Bone
    L_Snap_Bomb2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Bomb1: THREE.Bone
    Bomb2: THREE.Bone
    Bomb3: THREE.Bone
    Bomb4: THREE.Bone
    Brick1: THREE.Bone
    Brick2: THREE.Bone
    Brick3: THREE.Bone
    Brick4: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Ziggs_Skin06_MAT: THREE.MeshBasicMaterial
    Ziggs_Skin06_L_Bomb_Mat: THREE.MeshBasicMaterial
    Ziggs_Skin06_Bomb_Mat: THREE.MeshBasicMaterial
    Recall_Props_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Joke'
  | 'Laugh'
  | 'ziggs_idle1'
  | 'ziggs_idle2'
  | 'ziggs_idle3'
  | 'ziggs_idle4'
  | 'Recall'
  | 'Satcheljump'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
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
        <primitive object={nodes.R_Snap_Bomb2World} />
        <primitive object={nodes.L_Snap_Bomb2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Bomb1} />
        <primitive object={nodes.Bomb2} />
        <primitive object={nodes.Bomb3} />
        <primitive object={nodes.Bomb4} />
        <primitive object={nodes.Brick1} />
        <primitive object={nodes.Brick2} />
        <primitive object={nodes.Brick3} />
        <primitive object={nodes.Brick4} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-48.27, -0.56, -70.6]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Ziggs_Skin06_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Ziggs_Skin06_L_Bomb_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Ziggs_Skin06_Bomb_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Props_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
