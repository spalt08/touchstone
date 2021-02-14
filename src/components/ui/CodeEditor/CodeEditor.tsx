import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import styles from './CodeEditor.module.scss'

export type Props = {
  onBlur?: (data: string) => unknown
  className?: string
  defaultValue?: string
}

// Default theme
monaco.editor.defineTheme('default', {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#f8f9fc',
    'editorLineNumber.foreground': '#7F8194',
    'editor.lineHighlightBorder': '#00000000',
  },
})

monaco.editor.setTheme('default')

export default function CodeEditor({ defaultValue, onBlur, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const handler = monaco.editor.create(ref.current, {
      value: defaultValue,
      language: 'typescript',
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      wrappingStrategy: 'advanced',
      overviewRulerLanes: 0,
    })

    // handle content changes on blur to reduce the rendering overload
    if (onBlur) {
      handler.onDidBlurEditorText(() => onBlur(handler.getValue()))
    }

    function dynamicallyUpdateHeight() {
      if (ref.current) {
        ref.current.style.height = `${handler.getContentHeight()}px`
      }

      handler.layout()
    }

    handler.onDidChangeModelContent(dynamicallyUpdateHeight)
    dynamicallyUpdateHeight()

    return () => handler.dispose()
  }, [ref])

  return (
    <div className={clsx(styles.container, className)}>
      <div ref={ref} />
      {/* <textarea onBlur={(event) => onBlur && onBlur(event.target.value)} value={defaultValue}></textarea> */}
    </div>
  )
}
