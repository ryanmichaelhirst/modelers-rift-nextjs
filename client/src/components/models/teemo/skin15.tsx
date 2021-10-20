import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Rope_Space: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Teemo_Recall_Rope1: THREE.MeshBasicMaterial
    Teemo_Base: THREE.MeshBasicMaterial
    Teemo_Joke: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Crit'
  | 'teemo_skin08_laugh'
  | 'Spell1'
  | 'teemo_skin08_spell4'
  | 'Spell3'
  | 'Spell4'
  | 'teemo_skin08_taunt'
  | 'Death'
  | 'Recall'
  | 'Run'
  | 'Attack1'
  | 'Idle_Active'
  | 'teemo_skin08_passive1'
  | 'teemo_skin08_passive_in'
  | 'Idle_In'
  | 'Run_Haste'
  | 'teemo_skin08_passive2'
  | 'Passive_2_Run'
  | 'Run_Fast'
  | 'Recall_Winddown'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Channel'
  | 'teemo_skin08_joke'
  | 'Channel_Wndup'
  | 'Respawn'
  | 'teemo_skin08_passive3'
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
        <primitive object={nodes.Rope_Space} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <group position={[-45.29, -7.66, -60.84]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Teemo_Recall_Rope1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Teemo_Base}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Teemo_Joke}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
