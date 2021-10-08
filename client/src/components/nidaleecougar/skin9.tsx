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
    mesh_0_6: THREE.SkinnedMesh
    Spiderling1_Root: THREE.Bone
    Spiderling2_Root: THREE.Bone
    Spiderling3_Root: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    Spiderling1_MAT: THREE.MeshBasicMaterial
    Spiderling2_MAT: THREE.MeshBasicMaterial
    Spiderling3_MAT: THREE.MeshBasicMaterial
    Nidalee_Cougar_SuperGalaxy_MAT2: THREE.MeshBasicMaterial
    Drill: THREE.MeshBasicMaterial
    Claws: THREE.MeshBasicMaterial
    Horn: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'nidaleecougar_idle1'
  | 'nidaleecougar_idle2'
  | 'nidaleecougar_joke'
  | 'nidaleecougar_laugh'
  | 'Run'
  | 'Run2'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'nidaleecougar_taunt'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'nidaleecougar_dance_loop'
  | 'nidaleecougar_idle_enter'
  | 'nidaleecougar_spell2'
  | 'Turn_L'
  | 'Turn_L_180'
  | 'Turn_R'
  | 'Turn_R_180'
  | 'Turn_0'
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
        <primitive object={nodes.Spiderling1_Root} />
        <primitive object={nodes.Spiderling2_Root} />
        <primitive object={nodes.Spiderling3_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Spiderling1_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Spiderling2_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Spiderling3_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Nidalee_Cougar_SuperGalaxy_MAT2}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Drill}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Claws}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Horn}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
