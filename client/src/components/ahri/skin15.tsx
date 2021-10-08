import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    weapon: THREE.Bone
    buffbone_glb_channel_loc: THREE.Bone
    buffbone_glb_ground_loc: THREE.Bone
    c_buffbone_glb_center_loc: THREE.Bone
    c_buffbone_glb_layout_loc: THREE.Bone
    c_buffbone_glb_overhead_loc: THREE.Bone
    L_TailD1_Grnd: THREE.Bone
    L_TailC1_Grnd: THREE.Bone
    L_TailB1_Grnd: THREE.Bone
    L_TailA1_Grnd: THREE.Bone
    C_Tail1_Grnd: THREE.Bone
    R_TailA1_Grnd: THREE.Bone
    R_TailB1_Grnd: THREE.Bone
    R_TailC1_Grnd: THREE.Bone
    R_TailD1_Grnd: THREE.Bone
  }
  materials: {
    Ahri_Skin15_Body: THREE.MeshBasicMaterial
    Ahri_Skin15_Tail_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
  | 'Recall_Extended'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.buffbone_glb_channel_loc} />
        <primitive object={nodes.buffbone_glb_ground_loc} />
        <primitive object={nodes.c_buffbone_glb_center_loc} />
        <primitive object={nodes.c_buffbone_glb_layout_loc} />
        <primitive object={nodes.c_buffbone_glb_overhead_loc} />
        <primitive object={nodes.L_TailD1_Grnd} />
        <primitive object={nodes.L_TailC1_Grnd} />
        <primitive object={nodes.L_TailB1_Grnd} />
        <primitive object={nodes.L_TailA1_Grnd} />
        <primitive object={nodes.C_Tail1_Grnd} />
        <primitive object={nodes.R_TailA1_Grnd} />
        <primitive object={nodes.R_TailB1_Grnd} />
        <primitive object={nodes.R_TailC1_Grnd} />
        <primitive object={nodes.R_TailD1_Grnd} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ahri_Skin15_Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ahri_Skin15_Tail_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
