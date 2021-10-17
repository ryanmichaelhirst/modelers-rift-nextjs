import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bone: THREE.Bone
    Kicker_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Hydrant: THREE.Bone
  }
  materials: {
    nasus_cerberus_weapon2: THREE.MeshBasicMaterial
    nasus_kicker: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'nasus_skin05_spell1'
  | 'Spell3_Upper'
  | 'Taunt_Base'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'nasus_skin05_spell2'
  | 'Channel_Base'
  | 'Channel_Leadin'
  | 'Channel_Wndup'
  | 'Run_Base'
  | 'Crit'
  | 'Run_In'
  | 'Idle_In'
  | 'Spell1_Upper'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Death'
  | 'nasus_skin05_respawn'
  | 'nasus_skin05_winddown'
  | 'Run_Fast'
  | 'Spell3_Base'
  | 'Skin05_Dance'
  | 'nasus_skin05_laugh'
  | 'nasus_skin05_joke'
  | 'Skin05_Taunt'
  | 'nasus_skin05_run2'
  | 'Idle2_Base'
  | 'Spell1'
  | 'nasus_skin05_idle1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bone} />
        <primitive object={nodes.Kicker_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Hydrant} />
      </group>
      <group position={[-120.62, -27.74, -219.48]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.nasus_cerberus_weapon2}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.nasus_kicker}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
