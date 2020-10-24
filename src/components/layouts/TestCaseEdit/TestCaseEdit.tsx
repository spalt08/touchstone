import { CodeEditor, InlineTextInput, RelativePerformanceIndicator } from 'components/ui'
import React from 'react'
import styles from './TestCaseEdit.module.scss'

export type Props = {
  title?: string
  inputName?: string
  defaultCode?: string
  resultText?: string
  opsec?: number
  opsecMax?: number
  register?: () => (ref: HTMLTextAreaElement) => void
}

export default function TestCaseEdit({ title, defaultCode, inputName, resultText, opsec, opsecMax, register }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <InlineTextInput defaultValue={title} className={styles.title} />
        <div className={styles.operations}>{resultText}</div>
        {opsec && opsecMax && (
          <RelativePerformanceIndicator className={styles.relativeResults} max={opsecMax} value={opsec} />
        )}
      </div>
      <CodeEditor
        name={inputName}
        defaultValue={defaultCode}
        register={register}
        placeholder='Write your code here...'
      />
    </div>
  )
}
