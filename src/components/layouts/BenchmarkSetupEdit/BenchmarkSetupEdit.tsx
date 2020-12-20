import clsx from 'clsx'
import { Button, CodeEditor, ButtonGroup, TextInput } from 'components/ui'
import React, { useCallback, useState } from 'react'
import styles from './BenchmarkSetupEdit.module.scss'

export type Props = {
  className?: string
  javaScriptCode?: string
  onJavaScriptCodeUpdated?: (code: string) => unknown
  onTestRunClick?: () => unknown
}

const platforms = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'HTML', value: 'html' },
]

export default function BenchmarkSetupEdit({
  className,
  javaScriptCode,
  onJavaScriptCodeUpdated,
  onTestRunClick,
}: Props) {
  const [hidden, setHidden] = useState(false)

  const toggleHidden = useCallback(() => {
    setHidden((state) => !state)
  }, [setHidden])

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Setup Code
          <span className={styles.subTitle}>Configure your enviroment</span>
        </h3>
        <Button
          variant='text'
          icon={hidden ? 'CirclePlus' : 'CircleMinus'}
          className={styles.hideSetupButton}
          onClick={toggleHidden}
        >
          {hidden ? 'Show setup settings' : 'Hide setup settings'}
        </Button>
        <Button icon='Play' type='submit' onClick={onTestRunClick}>
          Run Tests
        </Button>
      </div>
      <div className={clsx(styles.full, { [styles.hidden]: hidden })}>
        <div className={styles.settings}>
          <ButtonGroup
            name='platform'
            values={platforms.map(({ value }) => value)}
            displayValues={platforms.map(({ name }) => name)}
          />
          <TextInput
            icon='Search'
            placeholder='Paste a link to required script or search for NPM package...'
            className={styles.searchDeps}
          />
        </div>
        <CodeEditor defaultValue={javaScriptCode} onBlur={onJavaScriptCodeUpdated} />
      </div>
    </div>
  )
}
