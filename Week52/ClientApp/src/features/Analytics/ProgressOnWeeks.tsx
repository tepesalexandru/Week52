import React, { ReactElement } from 'react'
import { WeekProgress } from '../../shared/Interfaces'

interface Props {
    progressOnWeeks: WeekProgress[]
}

export default function ProgressOnWeeks(props: Props): ReactElement {


    const renderProgressOnWeeks = () => {
        return props.progressOnWeeks.map((progress: WeekProgress) => {
            return <div>
                {progress.weekNumber} {"=>"} {progress.progress}
            </div>
        })
    }

    return (
        <div>
            {renderProgressOnWeeks()}
        </div>
    )
}
