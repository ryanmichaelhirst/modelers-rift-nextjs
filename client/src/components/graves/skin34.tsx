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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Ctsm_BlackBoard: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Ruler: THREE.Bone
    AirPlane3: THREE.Bone
    AirPlane2: THREE.Bone
    AirPlane1: THREE.Bone
    Mug: THREE.Bone
    Toast: THREE.Bone
    Book1: THREE.Bone
    Book2: THREE.Bone
    Book3: THREE.Bone
  }
  materials: {
    Graves_Skin25_Mat: THREE.MeshBasicMaterial
    Graves_Skin25_Weapon_Mat: THREE.MeshBasicMaterial
    Graves_Skin25_RecallAirPlanes_Mat: THREE.MeshBasicMaterial
    Graves_Skin25_RecallRuler_Mat: THREE.MeshBasicMaterial
    Graves_Skin25_RecallBoard_Mat: THREE.MeshBasicMaterial
    Graves_Mug_Mat: THREE.MeshBasicMaterial
    Graves_Books_Mat: THREE.MeshBasicMaterial
    Graves_Skin25_Bullet_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'graves_attack1'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'graves_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'graves_skin25_reload'
  | 'graves_reload_slow'
  | 'Spell4_Back'
  | 'Recall'
  | 'graves_skin25_homeguard'
  | 'Run_Homeguard_IN'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Ctsm_BlackBoard} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Ruler} />
        <primitive object={nodes.AirPlane3} />
        <primitive object={nodes.AirPlane2} />
        <primitive object={nodes.AirPlane1} />
        <primitive object={nodes.Mug} />
        <primitive object={nodes.Toast} />
        <primitive object={nodes.Book1} />
        <primitive object={nodes.Book2} />
        <primitive object={nodes.Book3} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Graves_Skin25_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Graves_Skin25_Weapon_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Graves_Skin25_RecallAirPlanes_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Graves_Skin25_RecallRuler_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Graves_Skin25_RecallBoard_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Graves_Mug_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Graves_Books_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Graves_Skin25_Bullet_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
