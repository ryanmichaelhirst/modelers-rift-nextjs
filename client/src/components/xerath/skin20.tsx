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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    L_Uparm: THREE.Bone
    L_Forearm: THREE.Bone
    R_Uparm: THREE.Bone
    R_Forearm: THREE.Bone
    L_Thigh: THREE.Bone
    L_Knee: THREE.Bone
    R_Thigh: THREE.Bone
    R_Knee: THREE.Bone
    Armor_Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Root_H: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hand: THREE.MeshBasicMaterial
    HumanBody: THREE.MeshBasicMaterial
    Sigil: THREE.MeshBasicMaterial
    Pattern: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Death'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Run'
  | 'Joke'
  | 'Spell2'
  | 'spell1.pie_c_11_10'
  | 'spell2_channel.pie_c_11_10'
  | 'Spell5start'
  | 'Spell5Loop'
  | 'spell5end.pie_c_11_10'
  | 'taunt.pie_c_11_10'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.L_Uparm} />
        <primitive object={nodes.L_Forearm} />
        <primitive object={nodes.R_Uparm} />
        <primitive object={nodes.R_Forearm} />
        <primitive object={nodes.L_Thigh} />
        <primitive object={nodes.L_Knee} />
        <primitive object={nodes.R_Thigh} />
        <primitive object={nodes.R_Knee} />
        <primitive object={nodes.Armor_Root} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Root_H} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Hand}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.HumanBody}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Sigil}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Pattern}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
