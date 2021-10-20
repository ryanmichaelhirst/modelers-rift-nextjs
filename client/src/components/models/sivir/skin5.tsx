import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    pasted__pasted__Pax_sivir: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Dance'
  | 'Idle1_Base'
  | 'sivir_base_idle'
  | 'Run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'sivir_base_idlein_run'
  | 'sivir_base_idlein_run2'
  | 'Spell1_Catch'
  | 'Recall'
  | 'sivir_base_respawn'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Taunt_Base'
  | 'sivir_base_laugh'
  | 'sivir_base_joke'
  | 'sivir_base_idlein_attack'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Spell1'
  | 'sivir_base_taunt'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.pasted__pasted__Pax_sivir}
        skeleton={nodes.mesh_0.skeleton}
        position={[-61.08, -0.7, -91.16]}
        scale={0.01}
      />
    </group>
  )
}
