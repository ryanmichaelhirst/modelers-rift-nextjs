import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Prop: THREE.Bone
    PropChildren_0: THREE.Bone
    PropChildren_1: THREE.Bone
    PropChildren_2: THREE.Bone
    PropChildren_3: THREE.Bone
    PropChildren_4: THREE.Bone
    PropChildren_5: THREE.Bone
    PropChildren_6: THREE.Bone
    PropChildren_7: THREE.Bone
    PropChildren_8: THREE.Bone
    PropChildren_9: THREE.Bone
    PropChildren_10: THREE.Bone
    PropChildren_11: THREE.Bone
    PropChildren_12: THREE.Bone
    PropChildren_13: THREE.Bone
    PropChildren_14: THREE.Bone
    PropChildren_15: THREE.Bone
    PropChildren_16: THREE.Bone
    PropChildren_17: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    Prop: THREE.MeshBasicMaterial
    Eyes: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Laugh'
  | 'glion_idle_in_variant'
  | 'RunBase'
  | 'Spell1'
  | 'Taunt'
  | 'Celebrate'
  | 'glion_idle_in'
  | 'Joke'
  | 'glion_laugh'
  | 'Idle1'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'glion_into_run'
  | 'Death'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'RunFlight'
  | 'Interact'
  | 'Cast_Cycle'
  | 'Cast_Animation'
  | 'Into_Cast'
  | 'glion_hurt'
  | 'Spray'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'glion_laugh_out'
  | 'Cast_Turn'
  | 'Cast_Damage'
  | 'glion_joke'
  | 'glion_taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Prop} />
        <primitive object={nodes.PropChildren_0} />
        <primitive object={nodes.PropChildren_1} />
        <primitive object={nodes.PropChildren_2} />
        <primitive object={nodes.PropChildren_3} />
        <primitive object={nodes.PropChildren_4} />
        <primitive object={nodes.PropChildren_5} />
        <primitive object={nodes.PropChildren_6} />
        <primitive object={nodes.PropChildren_7} />
        <primitive object={nodes.PropChildren_8} />
        <primitive object={nodes.PropChildren_9} />
        <primitive object={nodes.PropChildren_10} />
        <primitive object={nodes.PropChildren_11} />
        <primitive object={nodes.PropChildren_12} />
        <primitive object={nodes.PropChildren_13} />
        <primitive object={nodes.PropChildren_14} />
        <primitive object={nodes.PropChildren_15} />
        <primitive object={nodes.PropChildren_16} />
        <primitive object={nodes.PropChildren_17} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <group position={[-50.84, 0, -69.36]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Prop}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Eyes}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
