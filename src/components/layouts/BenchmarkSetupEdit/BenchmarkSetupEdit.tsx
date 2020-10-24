import clsx from 'clsx'
import { Button, CodeEditor } from 'components/ui'
import React from 'react'
import styles from './BenchmarkSetupEdit.module.scss'

export type Props = {
  className?: string
  javaScriptCode?: string
  register?: () => (ref: HTMLTextAreaElement) => void
}

export default function BenchmarkSetupEdit({ className, javaScriptCode, register }: Props) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <h3 className={styles.title}>Setup Code</h3>
        <Button icon='Play'>Run Tests</Button>
      </div>
      <CodeEditor
        name='setupCode'
        register={register}
        defaultValue={javaScriptCode}
        placeholder='Insert your setup code here'
      />
    </div>
  )
}
