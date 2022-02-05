import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    Manatee_Root: THREE.Bone
    Prop02: THREE.Bone
    Ball: THREE.Bone
  }
  materials: {
    Crown: THREE.MeshBasicMaterial
    Manatee: THREE.MeshBasicMaterial
    Props03: THREE.MeshBasicMaterial
    FaceShapes01: THREE.MeshBasicMaterial
    FaceShapes05: THREE.MeshBasicMaterial
    Ball: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt_Base'
  | 'petdowsie_celebrate.littlelegends_11_12'
  | 'Idle_In'
  | 'urf_joke.littlelegends_11_12'
  | 'urf_interact.littlelegends_11_12'
  | 'urf_recall.littlelegends_11_12'
  | 'urfowsie_idle.littlelegends_11_12'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'urf_run.littlelegends_11_12'
  | 'urf_cast.littlelegends_11_12'
  | 'urf_castloop.littlelegends_11_12'
  | 'urf_damge_hurt.littlelegends_11_12'
  | 'Death_Base'
  | 'urf_greeting.littlelegends_11_12'
  | 'urf_dive_in.littlelegends_11_12'
  | 'urf_dive_out.littlelegends_11_12'
  | 'Idle_To_Run'
  | 'urf_laugh.littlelegends_11_12'
  | 'petdowsie_runhaste_to_idle.littlelegends_11_12'
  | 'petdowsie_gatling_spinning.littlelegends_11_12'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Manatee_Root} />
        <primitive object={nodes.Prop02} />
        <primitive object={nodes.Ball} />
      </group>
      <group position={[-369.21, -52.9, -107.53]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Crown}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Manatee}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Props03}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.FaceShapes01}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.FaceShapes05}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Ball}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
