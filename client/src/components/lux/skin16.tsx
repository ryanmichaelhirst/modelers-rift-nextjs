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
    mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    WeaponBottom_World: THREE.Bone
    WeaponTop_World: THREE.Bone
    Weapon_World: THREE.Bone
    Platform: THREE.Bone
    Book: THREE.Bone
    Bread: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_BUFFBONE_CSTM_BEAM: THREE.Bone
  }
  materials: {
    Lux_Skin15_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Recall_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Book_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Bread_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_DummyStick_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_DummyHair_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2'
  | 'Idle4'
  | 'lux_skin16_spell2'
  | 'lux_skin16_spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Recall'
  | 'Run_Homeguard'
  | 'Spell4_ToRun'
  | 'Spell1_Upper'
  | 'lux_skin16_spell1'
  | 'Spell3_Upper'
  | 'Run_Homeguard_IN'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.WeaponBottom_World} />
        <primitive object={nodes.WeaponTop_World} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Platform} />
        <primitive object={nodes.Book} />
        <primitive object={nodes.Bread} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_BUFFBONE_CSTM_BEAM} />
      </group>
      <group position={[-167.01, -4.22, -167.01]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Lux_Skin15_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Lux_Skin15_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Lux_Skin15_Book_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Lux_Skin15_Bread_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Lux_Skin15_DummyStick_MAT}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Lux_Skin15_DummyHair_MAT}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}
