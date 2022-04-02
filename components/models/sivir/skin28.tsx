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
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Snap_Weapon: THREE.Bone
    Ora4: THREE.Bone
    Ora3: THREE.Bone
    Ora2: THREE.Bone
    Ora1: THREE.Bone
    Prop: THREE.Bone
  }
  materials: {
    Boby: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Ora: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Dance'
  | 'Idle1_Base'
  | 'sivir_idle1'
  | 'Run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'sivir_recall_winddown.pie_c_10_21'
  | 'sivir_idlein_run2'
  | 'Spell1_Catch'
  | 'sivir_respawn'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Taunt_Base'
  | 'sivir_laugh'
  | 'sivir_joke'
  | 'sivir_idlein_attack'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Spell1'
  | 'sivir_taunt'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Snap_Weapon} />
        <primitive object={nodes.Ora4} />
        <primitive object={nodes.Ora3} />
        <primitive object={nodes.Ora2} />
        <primitive object={nodes.Ora1} />
        <primitive object={nodes.Prop} />
      </group>
      <group position={[-60.91, -20.21, -94.99]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Boby}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Ora}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
