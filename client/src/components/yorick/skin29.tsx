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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    Root: THREE.Bone
    CapeUpper_L1_Ground: THREE.Bone
    CapeUpper_M1_Ground: THREE.Bone
    CapeUpper_R1_Ground: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Recall_Bass: THREE.Bone
    Recall_fire1: THREE.Bone
    Recall_fire2: THREE.Bone
    Recall_fire3: THREE.Bone
    Recall_fire4: THREE.Bone
    Recall_fire5: THREE.Bone
    Recall_Hat: THREE.Bone
    Recall_Sound: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Yorick_cape: THREE.MeshBasicMaterial
    Yorick_cape01: THREE.MeshBasicMaterial
    Package01: THREE.MeshBasicMaterial
    Package: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Bass: THREE.MeshBasicMaterial
    Hat: THREE.MeshBasicMaterial
    Sound: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'DanceLoop'
  | 'Death'
  | 'Idle1'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Idle'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'IdleIn'
  | 'Spell2_Run'
  | 'Spell1_Cast_Run'
  | 'yorick_spell1_cast'
  | 'Recall'
  | 'DanceIn'
  | 'yorick_run_hg'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.CapeUpper_L1_Ground} />
        <primitive object={nodes.CapeUpper_M1_Ground} />
        <primitive object={nodes.CapeUpper_R1_Ground} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Recall_Bass} />
        <primitive object={nodes.Recall_fire1} />
        <primitive object={nodes.Recall_fire2} />
        <primitive object={nodes.Recall_fire3} />
        <primitive object={nodes.Recall_fire4} />
        <primitive object={nodes.Recall_fire5} />
        <primitive object={nodes.Recall_Hat} />
        <primitive object={nodes.Recall_Sound} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Yorick_cape}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Yorick_cape01}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Package01}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Package} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Bass} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.Hat} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Sound} skeleton={nodes.mesh_0_8.skeleton} />
    </group>
  )
}
