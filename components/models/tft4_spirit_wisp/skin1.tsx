import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    SpiritWisp_Root: THREE.Bone
  }
  materials: {
    SpiritWisp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'spiritwisp_idle01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitidle01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungeidle01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlewin01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungelose01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungewin01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitlose01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitwin01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idle02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idle03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idle04.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idle05.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlelose01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlelose02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlelose03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlewin02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlewin03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlewin04.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungewin02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungelose02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungelose03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungeidle02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_loungeidle03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitidle02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitidle03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitlose02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_sitwin02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlevictory01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlevictory02.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idlevictory03.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idledefeat01.tft_arenaskin_spiritblossom'
  | 'spiritwisp_idledefeat02.tft_arenaskin_spiritblossom'
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
        <primitive object={nodes.SpiritWisp_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SpiritWisp}
        skeleton={nodes.mesh_0.skeleton}
        position={[-17.2, 0.01, -18.26]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
