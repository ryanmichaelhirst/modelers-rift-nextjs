import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall01_Root: THREE.Bone
    Recall02_Root: THREE.Bone
    Recall03_Root: THREE.Bone
    Recall04_Root: THREE.Bone
    Recall05_Root: THREE.Bone
    Recall06_Root: THREE.Bone
    Recall_Feather1: THREE.Bone
    Recall_Feather2: THREE.Bone
    Recall_Feather3: THREE.Bone
    Recall_Feather4: THREE.Bone
    Recall_Feather5: THREE.Bone
    Recall_Feather6: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall_Bird: THREE.MeshBasicMaterial
    Recall_Feather: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Laugh'
  | 'Dance_Base'
  | 'Dance_Transition'
  | 'Recall_Winddown'
  | 'Recall'
  | 'run_flap1.pie_c_10_24'
  | 'run_glide.pie_c_10_24'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall01_Root} />
        <primitive object={nodes.Recall02_Root} />
        <primitive object={nodes.Recall03_Root} />
        <primitive object={nodes.Recall04_Root} />
        <primitive object={nodes.Recall05_Root} />
        <primitive object={nodes.Recall06_Root} />
        <primitive object={nodes.Recall_Feather1} />
        <primitive object={nodes.Recall_Feather2} />
        <primitive object={nodes.Recall_Feather3} />
        <primitive object={nodes.Recall_Feather4} />
        <primitive object={nodes.Recall_Feather5} />
        <primitive object={nodes.Recall_Feather6} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Recall_Bird}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Recall_Feather}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
