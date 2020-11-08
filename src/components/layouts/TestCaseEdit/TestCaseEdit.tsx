import { TrashCan } from 'components/icons'
import { CodeEditor, InlineTextInput, RelativePerformanceIndicator, RunningIndicator } from 'components/ui'
import Checkbox from 'components/ui/Checkbox/Checkbox'
import React from 'react'
import styles from './TestCaseEdit.module.scss'

export type Props = {
  title?: string
  inputName?: string
  defaultCode?: string
  resultText?: string
  opsec?: number
  opsecMax?: number
  isRunning?: boolean
  register?: () => (ref: HTMLTextAreaElement) => void
  onDelete?: () => unknown
}

export default function TestCaseEdit({
  title,
  defaultCode,
  inputName,
  resultText,
  opsec,
  isRunning,
  opsecMax,
  onDelete,
  register,
}: Props) {
  const text = isRunning ? '' : resultText || 'Not tested yet'
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <InlineTextInput defaultValue={title} className={styles.title} />
        <Checkbox label='Deferred' />
        <div className={styles.operations}>{text}</div>
        {opsec && opsecMax && (
          <RelativePerformanceIndicator className={styles.relativeResults} max={opsecMax} value={opsec} />
        )}
        {isRunning && <RunningIndicator />}
      </div>
      <CodeEditor
        name={inputName}
        defaultValue={defaultCode}
        register={register}
        placeholder='Write your code here...'
      />
      <div className={styles.deleteIcon} onClick={onDelete}>
        <TrashCan className={styles.deleteIconFill} />
      </div>
    </div>
  )
}
